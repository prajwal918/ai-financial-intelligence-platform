import streamlit as st
import s3fs
import json
import pandas as pd
import time
import plotly.express as px
from datetime import datetime

# --- 1. PAGE CONFIGURATION ---
st.set_page_config(
    page_title="AI Financial Data Lake",
    page_icon="💹",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# --- 2. CUSTOM CSS (The Bloomberg Look) ---
st.markdown("""
<style>
    /* Import Google Font */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    /* Dark Background */
    .stApp { 
        background: linear-gradient(135deg, #0a0a0f 0%, #121218 50%, #0d0d12 100%);
        color: #FAFAFA; 
        font-family: 'Inter', sans-serif;
    }
    
    /* Hide Streamlit branding */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    /* Card Container */
    .css-card { 
        background: linear-gradient(145deg, #1a1a24 0%, #12121a 100%);
        border: 1px solid rgba(255,255,255,0.08); 
        border-radius: 16px; 
        padding: 24px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }
    
    /* News Feed Styling */
    .news-item { 
        background: linear-gradient(135deg, #141420 0%, #0f0f18 100%);
        border-left: 4px solid #00d4aa; 
        padding: 16px 18px; 
        margin-bottom: 12px; 
        border-radius: 8px; 
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    }
    .news-item:hover {
        transform: translateX(4px);
        box-shadow: 0 6px 20px rgba(0,212,170,0.15);
    }
    .news-negative { 
        border-left-color: #ff4757; 
    }
    .news-negative:hover {
        box-shadow: 0 6px 20px rgba(255,71,87,0.15);
    }
    .news-neutral { 
        border-left-color: #a0a0b0; 
    }
    
    /* Metrics */
    div[data-testid="stMetricValue"] { 
        font-size: 28px; 
        color: #ffffff; 
        font-weight: 700;
        text-shadow: 0 0 20px rgba(0,212,170,0.3);
    }
    div[data-testid="stMetricDelta"] {
        font-size: 14px;
    }
    
    /* Section Headers */
    h1 {
        background: linear-gradient(90deg, #00d4aa, #00a8ff, #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 700 !important;
        letter-spacing: -0.5px;
    }
    h2, h3 {
        color: #e0e0e8 !important;
        font-weight: 600 !important;
    }
    
    /* Divider */
    hr {
        border: none;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(0,212,170,0.3), transparent);
        margin: 24px 0;
    }
    
    /* Subheader styling */
    .stSubheader {
        color: #a0a0b0 !important;
    }
    
    /* DataFrame styling */
    .stDataFrame {
        border-radius: 12px;
        overflow: hidden;
    }
    
    /* Scrollbar */
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-track {
        background: #0a0a0f;
    }
    ::-webkit-scrollbar-thumb {
        background: #2a2a3a;
        border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #3a3a4a;
    }
</style>
""", unsafe_allow_html=True)

# --- 3. DATA CONNECTION ---
fs = s3fs.S3FileSystem(key='admin', secret='password', client_kwargs={'endpoint_url': 'http://minio:9000'})

def load_data():
    try:
        # Load News
        news_files = sorted(fs.glob("s3://stock-market1/news_data/*.json"), key=lambda x: fs.info(x)['LastModified'], reverse=True)[:60]
        news_data = []
        for f in news_files:
            try:
                with fs.open(f, 'r') as file:
                    news_data.append(json.load(file))
            except: pass
        df_news = pd.DataFrame(news_data)
        
        # Load Forex
        forex_files = sorted(fs.glob("s3://stock-market1/forex_data/*.json"), key=lambda x: fs.info(x)['LastModified'], reverse=True)[:20]
        forex_data = []
        for f in forex_files:
            try:
                with fs.open(f, 'r') as file:
                    forex_data.append(json.load(file))
            except: pass
        df_forex = pd.DataFrame(forex_data)
        
        return df_news, df_forex
    except:
        return pd.DataFrame(), pd.DataFrame()

# --- 4. MAIN LAYOUT ---
# Top Header Bar
st.markdown("""
<div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0 20px 0;">
    <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 12px; height: 12px; background: #00d4aa; border-radius: 50%; animation: pulse 2s infinite;"></div>
        <span style="color: #606070; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Live Data Feed</span>
    </div>
</div>
<style>
@keyframes pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(0,212,170,0.7); }
    50% { opacity: 0.7; box-shadow: 0 0 0 8px rgba(0,212,170,0); }
}
</style>
""", unsafe_allow_html=True)

c1, c2, c3 = st.columns([6, 2, 2])
with c1: 
    st.title("🤖 AI Financial Data Lake")
    st.caption("Real-time market intelligence powered by Gemini 2.5")
with c2: 
    st.metric("🗽 New York", datetime.now().strftime("%H:%M:%S"), "OPEN")
with c3: 
    st.metric("🇬🇧 London", datetime.utcnow().strftime("%H:%M:%S"), "OPEN")
st.divider()

placeholder = st.empty()

# Function to generate unique IDs for charts (FIXES THE DUPLICATE ERROR)
def get_key(prefix):
    return f"{prefix}_{int(time.time() * 1000)}"

while True:
    with placeholder.container():
        df_news, df_forex = load_data()
        
        if not df_news.empty and 'sentiment' in df_news.columns:
            
            # --- CRITICAL FIXES START HERE ---
            
            # 1. FIX "TypeError": Ensure 'currencies' is always a list
            def clean_currency(x):
                if isinstance(x, list): return x
                if isinstance(x, str): return [x]
                return ['USD'] # Default to USD if data is missing/broken
            
            df_news['currencies'] = df_news['currencies'].apply(clean_currency)
            
            # 2. Fix missing sentiment scores
            df_news['sentiment'] = df_news['sentiment'].fillna(0.0)
            
            # ---------------------------------

            # Calculate Scores
            df_exploded = df_news.explode('currencies')
            currency_sentiment = df_exploded.groupby('currencies')['sentiment'].mean()

            # --- TOP ROW ---
            col_news, col_chart, col_scores = st.columns([2, 4, 2])
            
            # 1. NEWS FEED (Left)
            with col_news:
                st.markdown("### 📰 Live News Feed")
                for index, row in df_news[:6].iterrows():
                    score = row.get('sentiment', 0)
                    mood = "news-item"
                    if score < -0.1: mood = "news-item news-negative"
                    elif -0.1 <= score <= 0.1: mood = "news-item news-neutral"
                    
                    currencies = row['currencies'] if isinstance(row['currencies'], list) else [row['currencies']]
                    curr_display = ', '.join(currencies[:3])
                    score_color = "#00d4aa" if score > 0 else "#ff4757" if score < 0 else "#a0a0b0"
                    link = row.get('link', '')
                    source = row.get('source', 'News')
                    
                    # Make clickable if link exists
                    if link:
                        st.markdown(f"""
                        <a href="{link}" target="_blank" style="text-decoration: none;">
                        <div class="{mood}" style="cursor: pointer;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                <div>
                                    <span style="background: linear-gradient(135deg, #1e1e2e, #2a2a3a); padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; color: #00d4aa;">{curr_display}</span>
                                    <span style="background: linear-gradient(135deg, #2a2a3a, #1e1e2e); padding: 4px 8px; border-radius: 20px; font-size: 10px; color: #808090; margin-left: 6px;">{source}</span>
                                </div>
                                <span style="font-size: 11px; color: {score_color}; font-weight: 600;">{score:+.2f}</span>
                            </div>
                            <div style="color: #e0e0e8; font-size: 13px; line-height: 1.4;">{row['title'][:85]}...</div>
                        </div>
                        </a>
                        """, unsafe_allow_html=True)
                    else:
                        st.markdown(f"""
                        <div class="{mood}">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                <div>
                                    <span style="background: linear-gradient(135deg, #1e1e2e, #2a2a3a); padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; color: #00d4aa;">{curr_display}</span>
                                    <span style="background: linear-gradient(135deg, #2a2a3a, #1e1e2e); padding: 4px 8px; border-radius: 20px; font-size: 10px; color: #808090; margin-left: 6px;">{source}</span>
                                </div>
                                <span style="font-size: 11px; color: {score_color}; font-weight: 600;">{score:+.2f}</span>
                            </div>
                            <div style="color: #e0e0e8; font-size: 13px; line-height: 1.4;">{row['title'][:85]}...</div>
                        </div>
                        """, unsafe_allow_html=True)

            # 2. CHART (Center)
            with col_chart:
                st.markdown("### 🌊 Sentiment Wave")
                if not df_news.empty:
                    chart_df = df_news.sort_values('timestamp')
                    fig = px.area(chart_df, x='timestamp', y='sentiment', 
                                  template="plotly_dark", 
                                  color_discrete_sequence=['#00d4aa'])
                    fig.update_layout(
                        height=420,
                        paper_bgcolor='rgba(0,0,0,0)',
                        plot_bgcolor='rgba(0,0,0,0)',
                        margin=dict(l=0, r=0, t=20, b=0),
                        xaxis=dict(
                            showgrid=False,
                            showline=False,
                            zeroline=False,
                            color='#606070'
                        ),
                        yaxis=dict(
                            showgrid=True,
                            gridcolor='rgba(255,255,255,0.05)',
                            showline=False,
                            zeroline=True,
                            zerolinecolor='rgba(255,255,255,0.1)',
                            color='#606070'
                        ),
                        font=dict(family="Inter", color="#a0a0b0")
                    )
                    fig.update_traces(
                        fill='tozeroy',
                        fillcolor='rgba(0,212,170,0.1)',
                        line=dict(width=2, color='#00d4aa')
                    )
                    
                    # FIX: Added unique key to stop 'DuplicateElementId' error
                    st.plotly_chart(fig, use_container_width=True, key=get_key("chart"))

            # 3. IMPACT SCORES (Right)
            with col_scores:
                st.markdown("### 📊 AI Impact Scores")
                # Loop through major currencies and assets
                for curr in ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'BTC', 'ETH', 'GOLD', 'OIL']:
                    score = currency_sentiment.get(curr, 0)
                    if score == 0 and curr not in currency_sentiment.index:
                        continue  # Skip assets with no data
                    
                    if score > 0.05: 
                        color = "#00d4aa"
                        arrow = "▲"
                        bg = "rgba(0,212,170,0.08)"
                    elif score < -0.05: 
                        color = "#ff4757"
                        arrow = "▼"
                        bg = "rgba(255,71,87,0.08)"
                    else: 
                        color = "#a0a0b0"
                        arrow = "●"
                        bg = "rgba(160,160,176,0.05)"
                        
                    st.markdown(f"""
                    <div style="background: {bg}; padding: 14px 16px; border-radius: 10px; margin-bottom: 8px; border-left: 4px solid {color}; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 600; font-size: 15px; color: #e0e0e8;">{curr}</span>
                        <span style="color: {color}; font-weight: 700; font-size: 14px;">{arrow} {score:+.3f}</span>
                    </div>
                    """, unsafe_allow_html=True)

            st.divider()

            # --- BOTTOM ROW ---
            b1, b2 = st.columns(2)
            
            with b1:
                st.markdown("### 🚨 Trade Signals")
                # Filter for non-zero movers
                active_movers = currency_sentiment[currency_sentiment != 0]
                if not active_movers.empty:
                    top_mover = active_movers.abs().idxmax()
                    top_score = active_movers[top_mover]
                    signal = "BUY" if top_score > 0 else "SELL"
                    color = "#00d4aa" if top_score > 0 else "#ff4757"
                    icon = "🟢" if top_score > 0 else "🔴"
                    
                    st.markdown(f"""
                    <div style="background: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)); border: 2px solid {color}; padding: 28px; border-radius: 16px; text-align: center; box-shadow: 0 0 40px {color}33;">
                        <div style="font-size: 14px; color: #808090; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">Top Signal</div>
                        <div style="font-size: 36px; font-weight: 700; color: {color}; margin-bottom: 8px;">{icon} {signal} {top_mover}</div>
                        <div style="font-size: 14px; color: #a0a0b0;">Confidence: <span style="color: {color}; font-weight: 600;">{abs(top_score)*100:.1f}%</span></div>
                    </div>
                    """, unsafe_allow_html=True)
                else:
                    st.markdown("""
                    <div style="background: rgba(160,160,176,0.05); border: 1px solid rgba(160,160,176,0.2); padding: 28px; border-radius: 16px; text-align: center;">
                        <div style="font-size: 28px; margin-bottom: 8px;">😴</div>
                        <div style="color: #a0a0b0;">Market is Quiet</div>
                    </div>
                    """, unsafe_allow_html=True)

            with b2:
                st.markdown("### 📅 Economic Calendar")
                if not df_forex.empty:
                    st.dataframe(
                        df_forex[['currency', 'event']].head(5), 
                        hide_index=True, 
                        use_container_width=True,
                        column_config={
                            "currency": st.column_config.TextColumn("Currency", width="small"),
                            "event": st.column_config.TextColumn("Event", width="large")
                        }
                    )
                else:
                    st.markdown("""
                    <div style="background: rgba(160,160,176,0.05); padding: 20px; border-radius: 12px; text-align: center; color: #808090;">
                        No upcoming events
                    </div>
                    """, unsafe_allow_html=True)

        else:
            st.markdown("""
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 400px; text-align: center;">
                <div style="width: 60px; height: 60px; border: 3px solid #1a1a2e; border-top: 3px solid #00d4aa; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 24px;"></div>
                <div style="font-size: 18px; color: #e0e0e8; margin-bottom: 8px;">Connecting to Gemini 2.5 Brain...</div>
                <div style="font-size: 14px; color: #606070;">Initializing AI sentiment analysis</div>
            </div>
            <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            </style>
            """, unsafe_allow_html=True)

    time.sleep(2)