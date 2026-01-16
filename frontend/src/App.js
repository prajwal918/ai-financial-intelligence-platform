import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import SentimentDashboard from './components/SentimentDashboard';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';
import DataStructureDemo from './components/DataStructureDemo';
import PortfolioManager from './components/PortfolioManager';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: '📊 Live Dashboard', icon: '📊' },
    { id: 'portfolio', label: '💼 Portfolio Manager', icon: '💼' },
    { id: 'algorithms', label: '🧮 Algorithms', icon: '🧮' },
    { id: 'datastructures', label: '🌳 Data Structures', icon: '🌳' }
  ];

  return (
    <div className="App">
      <header className="app-header">
        <motion.div 
          className="logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>🤖 AI Financial Intelligence Platform</h1>
          <p>Real-time Sentiment Analysis with Advanced CS Concepts</p>
        </motion.div>
      </header>

      <nav className="tab-navigation">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </motion.button>
        ))}
      </nav>

      <main className="app-content">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && <SentimentDashboard />}
          {activeTab === 'portfolio' && <PortfolioManager />}
          {activeTab === 'algorithms' && <AlgorithmVisualizer />}
          {activeTab === 'datastructures' && <DataStructureDemo />}
        </motion.div>
      </main>

      <footer className="app-footer">
        <p>🎓 Final Year Project 2026 | Built with React, Python, Kafka, MinIO, Docker & Gemini AI</p>
        <p>✅ Data Structures | ✅ OOP | ✅ ADA Algorithms | ✅ Real-time AI</p>
      </footer>
    </div>
  );
}

export default App;
