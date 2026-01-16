import time
import json
import feedparser
import requests
import s3fs
import google.generativeai as genai 
from bs4 import BeautifulSoup
from kafka import KafkaProducer, KafkaConsumer
from multiprocessing import Process

# --- 1. CONFIGURATION ---
KAFKA_SERVER = ['broker:29092']
MINIO_SERVER = {'endpoint_url': 'http://minio:9000'}

# 🔑 API KEY
GEMINI_KEY = "AIzaSyCEK0VLIRI7mFxkP9c323FUHzijgvHoEeI"
genai.configure(api_key=GEMINI_KEY)

# --- THE UPGRADE: Using the model you actually have ---
model = genai.GenerativeModel('gemini-2.5-flash')

# --- 2. WORKER: GEMINI 2.5 AI ANALYST ---
def run_news():
    print("🧠 [AI Analyst] Starting...", flush=True)
    time.sleep(10) # Give Kafka time to wake up
    
    # Multiple news feeds for different assets
    NEWS_FEEDS = {
        'CNBC': "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664",
        'Reuters': "https://feeds.reuters.com/reuters/businessNews",
        'Bloomberg': "https://feeds.bloomberg.com/markets/news.rss",
        'FX': "https://www.forexlive.com/feed/news",
        'Crypto': "https://cointelegraph.com/rss"
    }
    
    try:
        producer = KafkaProducer(bootstrap_servers=KAFKA_SERVER, value_serializer=lambda x: json.dumps(x).encode('utf-8'))
        print("🧠 [AI Analyst] Connected! Scanning global markets...", flush=True)
        
        while True:
            try:
                all_headlines = []
                
                # Collect headlines from multiple sources
                for source, url in NEWS_FEEDS.items():
                    try:
                        feed = feedparser.parse(url)
                        for entry in feed.entries[:2]:
                            all_headlines.append({'title': entry.title, 'source': source, 'link': entry.get('link', '')})
                    except:
                        pass
                
                # Analyze headlines
                for item in all_headlines[:8]:  # Limit to 8 per cycle for rate limits
                    headline = item['title']
                    source = item['source']
                    link = item['link']
                    try:
                        # PROFESSIONAL PROMPT - Multi-asset analysis
                        prompt = f"""
                        Act as a Senior Financial Analyst. Analyze this headline: '{headline}'
                        
                        1. Identify ALL affected assets from: USD, EUR, GBP, JPY, AUD, CAD, CHF, BTC, ETH, OIL, GOLD, SPX
                        2. Determine the sentiment (POSITIVE, NEGATIVE, NEUTRAL).
                        3. Assign a sentiment score (-1.0 to 1.0).
                        
                        Return JSON ONLY: {{"assets": ["USD", "EUR"], "sentiment": "NEUTRAL", "score": 0.0}}
                        """
                        
                        response = model.generate_content(prompt)
                        clean_text = response.text.replace('```json', '').replace('```', '').strip()
                        result = json.loads(clean_text)
                        
                        assets = result.get('assets', ['USD'])
                        if isinstance(assets, str):
                            assets = [assets]
                        decision = result.get('sentiment', 'NEUTRAL')
                        score = float(result.get('score', 0.0))

                        data = {
                            'type': 'news',
                            'title': headline,
                            'source': source,
                            'link': link,
                            'sentiment': score, 
                            'mood': decision,
                            'currencies': assets,
                            'timestamp': time.time()
                        }
                        
                        producer.send('stock_data', value=data)
                        print(f"🧠 Gemini 2.5: {', '.join(assets)} is {decision} ({score})", flush=True)
                        
                    except Exception as e:
                        print(f"⚠️ AI Error: {e}", flush=True)
                        
                    time.sleep(4) # Safety buffer for API limits
            except Exception as e: print(f"Feed Error: {e}", flush=True)
            time.sleep(45) # Run every 45 seconds
    except Exception as e: print(f"News Worker Crash: {e}", flush=True)

# --- 3. WORKER: FOREX CALENDAR SCRAPER ---
def run_forex():
    print("💱 [Forex Scraper] Starting...", flush=True)
    time.sleep(10)
    try:
        producer = KafkaProducer(bootstrap_servers=KAFKA_SERVER, value_serializer=lambda x: json.dumps(x).encode('utf-8'))
        print("💱 [Forex Scraper] Connected to Kafka!", flush=True)
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        
        while True:
            try:
                # Scrape Economic Calendar
                print("💱 [Forex Scraper] Fetching calendar...", flush=True)
                response = requests.get("https://www.forexfactory.com/calendar", headers=headers, timeout=30)
                print(f"💱 [Forex Scraper] Response: {response.status_code}", flush=True)
                soup = BeautifulSoup(response.content, 'html.parser')
                
                rows = soup.find_all("tr", class_="calendar__row")
                print(f"💱 [Forex Scraper] Found {len(rows)} rows", flush=True)
                for row in rows[:5]: # Capture top 5 upcoming events
                    currency_td = row.find("td", class_="calendar__currency")
                    event_td = row.find("td", class_="calendar__event")
                    
                    if currency_td and event_td:
                        currency = currency_td.text.strip()
                        event = event_td.text.strip()
                        
                        if currency and event:
                            data = {
                                'type': 'forex', 
                                'currency': currency, 
                                'event': event, 
                                'timestamp': time.time()
                            }
                            producer.send('stock_data', value=data)
                            print(f"💱 [Forex] {currency}: {event}", flush=True)
                            time.sleep(0.1)
            except Exception as e:
                print(f"💱 [Forex Scraper] Error: {e}", flush=True)
            time.sleep(300) # Refresh every 5 minutes
    except Exception as e:
        print(f"💱 [Forex Scraper] Crash: {e}", flush=True)

# --- 4. WORKER: DATA LAKE STORAGE ---
def run_consumer():
    print("💾 [Data Lake] Starting...", flush=True)
    time.sleep(15)
    try:
        consumer = KafkaConsumer('stock_data', bootstrap_servers=KAFKA_SERVER, auto_offset_reset='latest', value_deserializer=lambda x: json.loads(x.decode('utf-8')))
        s3 = s3fs.S3FileSystem(key='admin', secret='password', client_kwargs=MINIO_SERVER)
        print("💾 [Data Lake] Connected!", flush=True)
        
        for count, message in enumerate(consumer):
            data = message.value
            
            # Sort into folders
            folder = "news_data" if data.get('type') == 'news' else "forex_data"
            
            # Save to 'stock-market1' bucket
            filename = f"s3://stock-market1/{folder}/data_{int(time.time())}_{count}.json"
            
            try:
                with s3.open(filename, 'w') as f: json.dump(data, f)
            except: pass
    except Exception as e: print(f"Storage Error: {e}", flush=True)

# --- 5. SYSTEM LAUNCHER ---
if __name__ == '__main__':
    print("🚀 Launching Enterprise Financial System...", flush=True)
    
    # Run workers in parallel
    p1 = Process(target=run_news)
    p2 = Process(target=run_forex)
    p3 = Process(target=run_consumer)
    
    p1.start()
    p2.start()
    p3.start()
    
    try:
        p1.join()
        p2.join()
        p3.join()
    except KeyboardInterrupt:
        print("🛑 System Shutting Down...")
        p1.terminate()
        p2.terminate()
        p3.terminate()