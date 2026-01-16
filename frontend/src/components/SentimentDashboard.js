import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './SentimentDashboard.css';
import { demoNewsData, demoForexEvents } from '../demoData';

function SentimentDashboard() {
  const [sentimentData, setSentimentData] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [impactScores, setImpactScores] = useState({});
  const [topSignal, setTopSignal] = useState(null);
  const [forexEvents, setForexEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingDemoData, setUsingDemoData] = useState(false);

  useEffect(() => {
    // Fetch data immediately and then every 5 seconds
    fetchAllData();
    const interval = setInterval(fetchAllData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAllData = async () => {
    try {
      // Fetch news data from your backend API
      const newsResponse = await axios.get('http://localhost:8000/api/news');
      const newsData = newsResponse.data || [];
      
      if (newsData.length > 0) {
        // We have real data!
        setUsingDemoData(false);
        const cleanedNews = newsData.map(item => ({
          ...item,
          currencies: Array.isArray(item.currencies) ? item.currencies : 
                     typeof item.currencies === 'string' ? [item.currencies] : ['USD'],
          sentiment: item.sentiment || 0
        }));
        
        setNewsItems(cleanedNews);
        updateSentimentChart(cleanedNews);
        calculateImpactScores(cleanedNews);
        generateTopSignal(cleanedNews);
        setLoading(false);
      } else {
        // No data yet, use demo mode after 10 seconds
        setTimeout(() => {
          if (newsData.length === 0) {
            console.log('Using demo data - API quota may be exceeded');
            setUsingDemoData(true);
            setNewsItems(demoNewsData);
            updateSentimentChart(demoNewsData);
            calculateImpactScores(demoNewsData);
            generateTopSignal(demoNewsData);
            setForexEvents(demoForexEvents);
            setLoading(false);
          }
        }, 10000);
      }
      
      // Fetch forex calendar data
      try {
        const forexResponse = await axios.get('http://localhost:8000/api/forex');
        const forexData = forexResponse.data || [];
        if (forexData.length > 0) {
          setForexEvents(forexData.slice(0, 5));
        } else if (usingDemoData) {
          setForexEvents(demoForexEvents);
        }
      } catch (error) {
        if (usingDemoData) {
          setForexEvents(demoForexEvents);
        }
      }
      
    } catch (error) {
      console.log('Fetching data from backend...', error.message);
      // After 10 seconds, switch to demo mode
      setTimeout(() => {
        setUsingDemoData(true);
        setNewsItems(demoNewsData);
        updateSentimentChart(demoNewsData);
        calculateImpactScores(demoNewsData);
        generateTopSignal(demoNewsData);
        setForexEvents(demoForexEvents);
        setLoading(false);
      }, 10000);
    }
  };

  const updateSentimentChart = (items) => {
    const chartData = items.slice(-30).map((item, idx) => ({
      time: new Date(item.timestamp * 1000).toLocaleTimeString(),
      sentiment: item.sentiment || 0
    }));
    setSentimentData(chartData);
  };

  const calculateImpactScores = (items) => {
    const scores = {};
    const counts = {};
    
    items.forEach(item => {
      const currencies = Array.isArray(item.currencies) ? item.currencies : [item.currencies || 'USD'];
      const sentiment = item.sentiment || 0;
      
      currencies.forEach(curr => {
        scores[curr] = (scores[curr] || 0) + sentiment;
        counts[curr] = (counts[curr] || 0) + 1;
      });
    });
    
    const avgScores = {};
    Object.keys(scores).forEach(curr => {
      avgScores[curr] = scores[curr] / counts[curr];
    });
    
    setImpactScores(avgScores);
  };

  const generateTopSignal = (items) => {
    const scores = {};
    const counts = {};
    
    items.forEach(item => {
      const currencies = Array.isArray(item.currencies) ? item.currencies : [item.currencies || 'USD'];
      const sentiment = item.sentiment || 0;
      
      currencies.forEach(curr => {
        scores[curr] = (scores[curr] || 0) + sentiment;
        counts[curr] = (counts[curr] || 0) + 1;
      });
    });
    
    let maxScore = 0;
    let maxCurr = null;
    
    Object.keys(scores).forEach(curr => {
      const avgScore = scores[curr] / counts[curr];
      if (Math.abs(avgScore) > Math.abs(maxScore)) {
        maxScore = avgScore;
        maxCurr = curr;
      }
    });
    
    if (maxCurr && Math.abs(maxScore) > 0.01) {
      setTopSignal({
        currency: maxCurr,
        score: maxScore,
        signal: maxScore > 0 ? 'BUY' : 'SELL',
        confidence: Math.abs(maxScore) * 100
      });
    }
  };

  const getSentimentColor = (score) => {
    if (score > 0.05) return '#00d4aa';
    if (score < -0.05) return '#ff4757';
    return '#a0a0b0';
  };

  const getSentimentLabel = (score) => {
    if (score > 0.05) return '📈 BULLISH';
    if (score < -0.05) return '📉 BEARISH';
    return '➡️ NEUTRAL';
  };

  const getArrow = (score) => {
    if (score > 0.05) return '▲';
    if (score < -0.05) return '▼';
    return '●';
  };

  const majorAssets = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'BTC', 'ETH', 'GOLD', 'OIL', 'SPX'];

  return (
    <div className="sentiment-dashboard">
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <div className="live-indicator">
            <div className="pulse-dot"></div>
            <span>{usingDemoData ? 'DEMO MODE (API Quota Reached)' : 'LIVE DATA FEED'}</span>
          </div>
          <h2>🤖 AI Financial Data Lake</h2>
          <p>Real-time market intelligence powered by Gemini 2.5 Flash</p>
          {usingDemoData && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#f59e0b' }}>
              ⚠️ Using demo data - Get new API key from https://aistudio.google.com/apikey
            </div>
          )}
        </div>
      </motion.div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Connecting to Gemini 2.5 Brain...</p>
          <span className="loading-sub">Initializing AI sentiment analysis</span>
          <span className="loading-sub">Fetching data from MinIO Data Lake...</span>
        </div>
      ) : newsItems.length === 0 ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Waiting for data...</p>
          <span className="loading-sub">Your backend is running. Waiting for news to be analyzed by Gemini AI.</span>
        </div>
      ) : (
        <>
          {/* TOP ROW: News + Chart + Impact Scores */}
          <div className="top-row">
            {/* LEFT: News Feed */}
            <div className="news-column">
              <h3>📰 Live News Feed</h3>
              <div className="news-scroll">
                {newsItems.slice(0, 8).map((item, idx) => {
                  const score = item.sentiment || 0;
                  const currencies = Array.isArray(item.currencies) ? item.currencies : [item.currencies || 'USD'];
                  const currDisplay = currencies.slice(0, 3).join(', ');
                  const scoreColor = getSentimentColor(score);
                  
                  return (
                    <motion.div
                      key={idx}
                      className={`news-card-live ${score < -0.1 ? 'negative' : score > 0.1 ? 'positive' : 'neutral'}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="news-header-live">
                        <span className="currency-badge">{currDisplay}</span>
                        <span className="source-badge">{item.source || 'News'}</span>
                        <span className="score-badge" style={{ color: scoreColor }}>
                          {score > 0 ? '+' : ''}{score.toFixed(2)}
                        </span>
                      </div>
                      <div className="news-title">
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer">
                            {item.title?.substring(0, 100)}...
                          </a>
                        ) : (
                          item.title?.substring(0, 100) + '...'
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* CENTER: Sentiment Wave Chart */}
            <div className="chart-column">
              <h3>🌊 Sentiment Wave</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={sentimentData}>
                  <defs>
                    <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" stroke="#606070" tick={{ fill: '#606070', fontSize: 11 }} />
                  <YAxis stroke="#606070" tick={{ fill: '#606070', fontSize: 11 }} domain={[-1, 1]} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(20, 20, 32, 0.95)', 
                      border: '1px solid rgba(0, 212, 170, 0.3)',
                      borderRadius: '8px',
                      color: '#e0e0e8'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sentiment" 
                    stroke="#00d4aa" 
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSentiment)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* RIGHT: AI Impact Scores */}
            <div className="scores-column">
              <h3>📊 AI Impact Scores</h3>
              <div className="scores-scroll">
                {majorAssets.map((asset) => {
                  const score = impactScores[asset] || 0;
                  if (score === 0 && !impactScores[asset]) return null;
                  
                  const color = getSentimentColor(score);
                  const arrow = getArrow(score);
                  
                  return (
                    <motion.div
                      key={asset}
                      className="impact-card"
                      style={{ borderLeftColor: color }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <span className="asset-name">{asset}</span>
                      <span className="asset-score" style={{ color }}>
                        {arrow} {score > 0 ? '+' : ''}{score.toFixed(3)}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: Trade Signals + Economic Calendar */}
          <div className="bottom-row">
            {/* LEFT: Trade Signal */}
            <div className="signal-card">
              <h3>🚨 Trade Signals</h3>
              {topSignal ? (
                <motion.div 
                  className="signal-box"
                  style={{ borderColor: topSignal.score > 0 ? '#00d4aa' : '#ff4757' }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="signal-label">TOP SIGNAL</div>
                  <div className="signal-action" style={{ color: topSignal.score > 0 ? '#00d4aa' : '#ff4757' }}>
                    {topSignal.score > 0 ? '🟢' : '🔴'} {topSignal.signal} {topSignal.currency}
                  </div>
                  <div className="signal-confidence">
                    Confidence: <span style={{ color: topSignal.score > 0 ? '#00d4aa' : '#ff4757' }}>
                      {topSignal.confidence.toFixed(1)}%
                    </span>
                  </div>
                </motion.div>
              ) : (
                <div className="signal-empty">
                  <div className="empty-icon">😴</div>
                  <div>Market is Quiet</div>
                </div>
              )}
            </div>

            {/* RIGHT: Economic Calendar */}
            <div className="calendar-card">
              <h3>📅 Economic Calendar</h3>
              {forexEvents.length > 0 ? (
                <div className="calendar-list">
                  {forexEvents.map((event, idx) => (
                    <motion.div
                      key={idx}
                      className="calendar-item"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="event-currency">{event.currency}</span>
                      <span className="event-name">{event.event}</span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="calendar-empty">
                  <div>No upcoming events</div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SentimentDashboard;
