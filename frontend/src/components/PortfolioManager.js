import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { quickSort } from '../algorithms/Algorithms';
import './PortfolioManager.css';

// ✅ OOP CONCEPTS: Classes with Inheritance and Polymorphism

// Base class - Asset
class Asset {
  constructor(symbol, quantity, buyPrice) {
    this.symbol = symbol;
    this.quantity = quantity;
    this.buyPrice = buyPrice;
    this.currentPrice = buyPrice;
    this.type = 'Asset';
  }

  getValue() {
    return this.quantity * this.currentPrice;
  }

  getProfit() {
    return (this.currentPrice - this.buyPrice) * this.quantity;
  }

  getProfitPercent() {
    return ((this.currentPrice - this.buyPrice) / this.buyPrice) * 100;
  }

  updatePrice(newPrice) {
    this.currentPrice = newPrice;
  }

  getInfo() {
    return `${this.type}: ${this.symbol}`;
  }
}

// Derived class - Stock (inherits from Asset)
class Stock extends Asset {
  constructor(symbol, quantity, buyPrice, sector) {
    super(symbol, quantity, buyPrice);
    this.sector = sector;
    this.type = 'Stock';
    this.dividendYield = 0;
  }

  setDividend(yield_) {
    this.dividendYield = yield_;
  }

  getDividendIncome() {
    return this.getValue() * (this.dividendYield / 100);
  }

  getInfo() {
    return `${this.type}: ${this.symbol} (${this.sector})`;
  }
}

// Derived class - Crypto (inherits from Asset)
class Crypto extends Asset {
  constructor(symbol, quantity, buyPrice, blockchain) {
    super(symbol, quantity, buyPrice);
    this.blockchain = blockchain;
    this.type = 'Crypto';
    this.volatilityIndex = 0;
  }

  setVolatility(index) {
    this.volatilityIndex = index;
  }

  getRiskLevel() {
    if (this.volatilityIndex > 80) return 'Very High Risk';
    if (this.volatilityIndex > 50) return 'High Risk';
    if (this.volatilityIndex > 30) return 'Medium Risk';
    return 'Low Risk';
  }

  getInfo() {
    return `${this.type}: ${this.symbol} on ${this.blockchain}`;
  }
}

// Portfolio Manager class (Composition)
class Portfolio {
  constructor(name) {
    this.name = name;
    this.assets = [];
    this.cash = 10000;
  }

  addAsset(asset) {
    const cost = asset.quantity * asset.buyPrice;
    if (this.cash >= cost) {
      this.assets.push(asset);
      this.cash -= cost;
      return { success: true, message: `Added ${asset.symbol}` };
    }
    return { success: false, message: 'Insufficient funds' };
  }

  removeAsset(symbol) {
    const index = this.assets.findIndex(a => a.symbol === symbol);
    if (index >= 0) {
      const asset = this.assets[index];
      this.cash += asset.getValue();
      this.assets.splice(index, 1);
      return { success: true, message: `Sold ${symbol}` };
    }
    return { success: false, message: 'Asset not found' };
  }

  getTotalValue() {
    return this.assets.reduce((sum, asset) => sum + asset.getValue(), 0) + this.cash;
  }

  getTotalProfit() {
    return this.assets.reduce((sum, asset) => sum + asset.getProfit(), 0);
  }

  getAssetsByType(type) {
    return this.assets.filter(asset => asset.type === type);
  }

  sortAssetsByProfit() {
    return quickSort(this.assets, 'getProfit').reverse();
  }
}

function PortfolioManager() {
  const [portfolio] = useState(new Portfolio('My Portfolio'));
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    type: 'Stock',
    symbol: '',
    quantity: '',
    price: '',
    extra: ''
  });
  const [message, setMessage] = useState(null);
  const [sortBy, setSortBy] = useState('symbol');

  const handleAdd = () => {
    let asset;
    const qty = parseFloat(formData.quantity);
    const price = parseFloat(formData.price);

    if (!formData.symbol || !qty || !price) {
      setMessage({ type: 'error', text: 'Please fill all fields' });
      return;
    }

    if (formData.type === 'Stock') {
      asset = new Stock(formData.symbol, qty, price, formData.extra || 'Tech');
      asset.setDividend(2.5);
    } else {
      asset = new Crypto(formData.symbol, qty, price, formData.extra || 'Ethereum');
      asset.setVolatility(Math.random() * 100);
    }

    // Simulate price fluctuation
    asset.updatePrice(price * (1 + (Math.random() - 0.5) * 0.1));

    const result = portfolio.addAsset(asset);
    setMessage({ type: result.success ? 'success' : 'error', text: result.message });
    
    if (result.success) {
      setAssets([...portfolio.assets]);
      setFormData({ ...formData, symbol: '', quantity: '', price: '', extra: '' });
    }
  };

  const handleRemove = (symbol) => {
    const result = portfolio.removeAsset(symbol);
    setMessage({ type: result.success ? 'success' : 'error', text: result.message });
    setAssets([...portfolio.assets]);
  };

  const handleSort = () => {
    let sorted;
    if (sortBy === 'profit') {
      sorted = portfolio.sortAssetsByProfit();
    } else {
      sorted = quickSort([...portfolio.assets], sortBy);
    }
    setAssets(sorted);
  };

  const getProfitColor = (profit) => {
    return profit >= 0 ? '#10b981' : '#ef4444';
  };

  return (
    <div className="portfolio-manager">
      <motion.div 
        className="manager-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>💼 OOP Portfolio Manager</h2>
        <p>Demonstrating Classes, Inheritance & Polymorphism</p>
      </motion.div>

      <div className="portfolio-stats">
        <div className="stat-card">
          <h3>Total Value</h3>
          <p className="stat-value">${portfolio.getTotalValue().toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Cash Available</h3>
          <p className="stat-value">${portfolio.cash.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Profit</h3>
          <p className="stat-value" style={{ color: getProfitColor(portfolio.getTotalProfit()) }}>
            ${portfolio.getTotalProfit().toFixed(2)}
          </p>
        </div>
        <div className="stat-card">
          <h3>Assets</h3>
          <p className="stat-value">{assets.length}</p>
        </div>
      </div>

      {message && (
        <motion.div 
          className={`message ${message.type}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {message.text}
        </motion.div>
      )}

      <div className="add-asset-form">
        <h3>➕ Add Asset</h3>
        <div className="form-grid">
          <select 
            value={formData.type} 
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="form-input"
          >
            <option value="Stock">Stock</option>
            <option value="Crypto">Crypto</option>
          </select>
          <input
            type="text"
            placeholder="Symbol (e.g., AAPL)"
            value={formData.symbol}
            onChange={(e) => setFormData({...formData, symbol: e.target.value})}
            className="form-input"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            className="form-input"
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="form-input"
          />
          <input
            type="text"
            placeholder={formData.type === 'Stock' ? 'Sector' : 'Blockchain'}
            value={formData.extra}
            onChange={(e) => setFormData({...formData, extra: e.target.value})}
            className="form-input"
          />
          <motion.button
            className="add-button"
            onClick={handleAdd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Asset
          </motion.button>
        </div>
      </div>

      <div className="sort-section">
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="symbol">Sort by Symbol</option>
          <option value="profit">Sort by Profit</option>
          <option value="currentPrice">Sort by Price</option>
        </select>
        <motion.button
          className="sort-button"
          onClick={handleSort}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 Apply Sort (QuickSort)
        </motion.button>
      </div>

      <div className="assets-grid">
        {assets.map((asset, idx) => (
          <motion.div
            key={idx}
            className="asset-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            style={{ borderLeft: `4px solid ${asset.type === 'Stock' ? '#667eea' : '#f59e0b'}` }}
          >
            <div className="asset-header">
              <h4>{asset.getInfo()}</h4>
              <span className={`type-badge ${asset.type.toLowerCase()}`}>
                {asset.type}
              </span>
            </div>
            <div className="asset-details">
              <div className="detail-row">
                <span>Quantity:</span>
                <strong>{asset.quantity}</strong>
              </div>
              <div className="detail-row">
                <span>Buy Price:</span>
                <strong>${asset.buyPrice.toFixed(2)}</strong>
              </div>
              <div className="detail-row">
                <span>Current Price:</span>
                <strong>${asset.currentPrice.toFixed(2)}</strong>
              </div>
              <div className="detail-row">
                <span>Value:</span>
                <strong>${asset.getValue().toFixed(2)}</strong>
              </div>
              <div className="detail-row">
                <span>Profit:</span>
                <strong style={{ color: getProfitColor(asset.getProfit()) }}>
                  ${asset.getProfit().toFixed(2)} ({asset.getProfitPercent().toFixed(2)}%)
                </strong>
              </div>
              {asset.type === 'Stock' && (
                <div className="detail-row">
                  <span>Dividend:</span>
                  <strong>${asset.getDividendIncome().toFixed(2)}/year</strong>
                </div>
              )}
              {asset.type === 'Crypto' && (
                <div className="detail-row">
                  <span>Risk:</span>
                  <strong>{asset.getRiskLevel()}</strong>
                </div>
              )}
            </div>
            <motion.button
              className="remove-button"
              onClick={() => handleRemove(asset.symbol)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🗑️ Sell
            </motion.button>
          </motion.div>
        ))}
      </div>

      <div className="oop-concepts">
        <h3>✅ OOP Concepts Demonstrated</h3>
        <div className="concept-cards">
          <div className="concept-card">
            <h4>Inheritance</h4>
            <p>Stock and Crypto classes inherit from base Asset class</p>
          </div>
          <div className="concept-card">
            <h4>Polymorphism</h4>
            <p>getInfo() method overridden in derived classes</p>
          </div>
          <div className="concept-card">
            <h4>Encapsulation</h4>
            <p>Data and methods bundled in classes with controlled access</p>
          </div>
          <div className="concept-card">
            <h4>Composition</h4>
            <p>Portfolio class composes multiple Asset objects</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioManager;
