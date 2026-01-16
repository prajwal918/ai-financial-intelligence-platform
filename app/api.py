from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import s3fs
import json
import statistics

# Initialize the API
app = FastAPI(title="💰 AI Financial Signal API", version="1.0")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to Data Lake (MinIO)
fs = s3fs.S3FileSystem(key='admin', secret='password', client_kwargs={'endpoint_url': 'http://minio:9000'})

def get_latest_news(limit=50):
    """Fetch the latest raw news files from MinIO"""
    try:
        files = fs.glob("s3://stock-market1/news_data/*.json")
        # Sort by newness and take the last N
        files = sorted(files, key=lambda x: fs.info(x)['LastModified'], reverse=True)[:limit]
        
        data = []
        for f in files:
            with fs.open(f, 'r') as file:
                data.append(json.load(file))
        return data
    except Exception as e:
        return []

@app.get("/")
def home():
    return {"status": "online", "message": "Welcome to the AI Trading API. Go to /docs for help."}

@app.get("/signals")
def get_all_signals():
    """Returns the Buy/Sell signal for ALL currencies"""
    raw_data = get_latest_news(limit=60)
    
    # Calculate scores per currency
    scores = {}
    counts = {}
    
    for item in raw_data:
        # Check if this news item has identified currencies
        currencies = item.get('currencies', ['USD']) # Default to USD if missing
        sentiment = item.get('sentiment', 0)
        
        for curr in currencies:
            scores[curr] = scores.get(curr, 0) + sentiment
            counts[curr] = counts.get(curr, 0) + 1
    
    # Format the response
    results = {}
    for curr in scores:
        avg_score = scores[curr] / counts[curr]
        
        if avg_score > 0.05: signal = "BUY 🟢"
        elif avg_score < -0.05: signal = "SELL 🔴"
        else: signal = "HOLD ⚪"
            
        results[curr] = {
            "signal": signal,
            "strength": round(avg_score, 4),
            "news_analyzed": counts[curr]
        }
        
    return results

@app.get("/news/{currency}")
def get_currency_news(currency: str):
    """Get specific headlines for a currency (e.g., EUR, USD, BTC)"""
    currency = currency.upper()
    raw_data = get_latest_news(limit=100)
    
    filtered_news = []
    for item in raw_data:
        if currency in item.get('currencies', []):
            filtered_news.append({
                "time": item.get('timestamp'),
                "headline": item.get('title'),
                "sentiment": item.get('mood')
            })
            
    if not filtered_news:
        raise HTTPException(status_code=404, detail=f"No recent news found for {currency}")
        
    return {"currency": currency, "headlines": filtered_news[:5]}

@app.get("/api/news")
def get_news_for_frontend():
    """Get formatted news data for React frontend"""
    raw_data = get_latest_news(limit=50)
    return raw_data

@app.get("/api/forex")
def get_forex_events():
    """Get forex calendar events for React frontend"""
    try:
        files = fs.glob("s3://stock-market1/forex_data/*.json")
        files = sorted(files, key=lambda x: fs.info(x)['LastModified'], reverse=True)[:20]
        
        data = []
        for f in files:
            with fs.open(f, 'r') as file:
                data.append(json.load(file))
        return data
    except:
        return []