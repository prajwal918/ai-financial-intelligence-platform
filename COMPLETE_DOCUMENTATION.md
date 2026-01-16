# 📘 Complete Project Documentation

## 🎓 AI-Powered Financial Intelligence Platform
### Final Year Project 2026 - Computer Science & Engineering

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [System Requirements](#system-requirements)
3. [Installation Guide](#installation-guide)
4. [How to Run the Project](#how-to-run-the-project)
5. [Features Overview](#features-overview)
6. [Architecture Explanation](#architecture-explanation)
7. [Technologies Used](#technologies-used)
8. [CS Fundamentals Implementation](#cs-fundamentals-implementation)
9. [Troubleshooting Guide](#troubleshooting-guide)
10. [For College Evaluation](#for-college-evaluation)

---

## 📖 Project Overview

### What is This Project?

A **production-grade financial intelligence platform** that combines:
- **Real-time AI Sentiment Analysis** using Google Gemini 2.5
- **Distributed Data Streaming** with Apache Kafka
- **Big Data Storage** with MinIO (S3-compatible data lake)
- **Modern Web Development** with React and Python
- **Complete CS Fundamentals**: Data Structures, OOP, and Algorithms

### Problem Statement

Financial traders need real-time sentiment analysis of global news to make informed decisions. This system:
1. Collects news from multiple sources (CNBC, Reuters, Bloomberg, ForexLive, CoinTelegraph)
2. Analyzes sentiment using Google Gemini 2.5 AI
3. Identifies affected assets (USD, EUR, BTC, Gold, Oil, etc.)
4. Streams data through Kafka for real-time processing
5. Stores in scalable data lake (MinIO)
6. Visualizes in beautiful dashboards (React + Streamlit)

### Project Team
- **Students**: 2 students (as per college requirement)
- **Domain**: Artificial Intelligence, Big Data, Computer Science Fundamentals
- **Languages**: Python, JavaScript (React), SQL (via JSON storage)
- **Duration**: Completed for February 2026 evaluation

---

## 💻 System Requirements

### Hardware Requirements
- **RAM**: 8GB minimum (16GB recommended)
- **Storage**: 10GB free space
- **Processor**: Dual-core minimum (Quad-core recommended)
- **Internet**: Required (for news feeds and Gemini API)

### Software Requirements
- **Operating System**: Windows 10/11, macOS, or Linux
- **Docker Desktop**: Version 4.0 or higher
- **Web Browser**: Chrome, Firefox, Edge (latest version)
- **Gemini API Key**: Free from Google AI Studio

---

## 🚀 Installation Guide

### Step 1: Install Docker Desktop

#### Windows:
1. Download from: https://www.docker.com/products/docker-desktop/
2. Run installer
3. Enable WSL 2 if prompted
4. Restart computer
5. Launch Docker Desktop
6. Wait for whale icon to appear in system tray

#### macOS:
1. Download Docker Desktop for Mac
2. Drag to Applications folder
3. Launch Docker Desktop
4. Wait for initialization

#### Linux:
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker
```

### Step 2: Get Gemini API Key

1. Visit: https://aistudio.google.com/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)
5. Save it securely

### Step 3: Configure API Key

1. Navigate to project folder:
   ```
   cd C:\Users\jogip\OneDrive\Desktop\stock-project-Copy
   ```

2. Open `app/main.py` in any text editor

3. Find line 16:
   ```python
   GEMINI_KEY = "YOUR_API_KEY_HERE"
   ```

4. Replace with your actual API key:
   ```python
   GEMINI_KEY = "AIzaSyCEK0VLIRI7mFxkP9c323FUHzijgvHoEeI"
   ```

5. Save the file

---

## 🎯 How to Run the Project

### Method 1: Using Batch File (Easiest - Windows)

1. **Double-click** `start.bat` file in project root
2. Wait 3-5 minutes for all services to start
3. Open browser automatically

### Method 2: Using Command Line (All Platforms)

```bash
# Navigate to project directory
cd C:\Users\jogip\OneDrive\Desktop\stock-project-Copy

# Start all services
docker-compose up --build

# Wait 3-5 minutes for initialization
```

### What Happens When You Start?

The system will:
1. ✅ Start Zookeeper (Kafka coordination)
2. ✅ Start Kafka Broker (message streaming)
3. ✅ Start MinIO (data lake)
4. ✅ Build and start Python backend
5. ✅ Build and start FastAPI server
6. ✅ Build and start React frontend (this takes longest)
7. ✅ Start Streamlit dashboard

### How to Know It's Ready?

Look for these messages in terminal:
```
✔ Container zookeeper   Started
✔ Container broker      Started
✔ Container minio       Started
✔ Container stock-app   Started
✔ Container api         Started
✔ Container frontend    Started
✔ Container dashboard   Started
```

---

## 🌐 Accessing the Application

### URLs to Open in Browser

| Service | URL | Purpose |
|---------|-----|---------|
| **React Dashboard** | http://localhost:3000 | Main UI with all features |
| **Streamlit Dashboard** | http://localhost:8501 | Original beautiful dashboard |
| **FastAPI Docs** | http://localhost:8000/docs | API documentation & testing |
| **MinIO Console** | http://localhost:9001 | Data lake management |

### Default Credentials

**MinIO Console:**
- Username: `admin`
- Password: `password`

---

## ✨ Features Overview

### 1. Live AI Sentiment Dashboard

**Location**: React → Tab 1 (Live Dashboard)

**Features:**
- 📰 **Live News Feed**
  - Real-time financial news from 5+ sources
  - AI-analyzed sentiment scores
  - Clickable headlines with sources
  - Color-coded by sentiment (Green=Positive, Red=Negative, Yellow=Neutral)

- 🌊 **Sentiment Wave Chart**
  - Real-time visualization of market sentiment
  - Beautiful gradient area chart
  - Shows sentiment trends over time
  - Updates automatically every 5 seconds

- 📊 **AI Impact Scores**
  - 12+ assets tracked (USD, EUR, GBP, JPY, AUD, CAD, CHF, BTC, ETH, GOLD, OIL, SPX)
  - Live sentiment scores (-1 to +1)
  - Color-coded indicators
  - Up/Down/Neutral arrows

- 🚨 **Trade Signals**
  - AI-generated BUY/SELL recommendations
  - Top trading opportunity highlighted
  - Confidence percentage
  - Glowing visual effects

- 📅 **Economic Calendar**
  - Live forex events
  - Currency-specific news
  - Event descriptions
  - Auto-updating

**How It Works:**
1. Backend scrapes news from multiple sources
2. Gemini AI analyzes each headline
3. Identifies affected assets and sentiment
4. Streams through Kafka
5. Stores in MinIO
6. React fetches and displays beautifully

---

### 2. Portfolio Manager (OOP Demonstration)

**Location**: React → Tab 2 (Portfolio Manager)

**Features:**
- 💼 **Add Assets**
  - Add stocks (with sector, dividend info)
  - Add cryptocurrencies (with blockchain, volatility)
  - Real-time price simulation
  - Cash management

- 📈 **Portfolio Analytics**
  - Total portfolio value
  - Available cash
  - Total profit/loss
  - Number of assets

- 🔄 **Sorting**
  - Sort by symbol
  - Sort by profit (using QuickSort algorithm)
  - Sort by current price
  - Live performance timing

- 💰 **Profit Tracking**
  - Real-time profit calculation
  - Percentage gains/losses
  - Color-coded display
  - Individual asset performance

**OOP Concepts Demonstrated:**

```
Base Class: Asset
├── Properties: symbol, quantity, buyPrice, currentPrice
├── Methods: getValue(), getProfit(), updatePrice(), getInfo()
│
├── Derived Class: Stock
│   ├── Additional: sector, dividendYield
│   ├── Methods: setDividend(), getDividendIncome()
│   └── Overrides: getInfo()
│
└── Derived Class: Crypto
    ├── Additional: blockchain, volatilityIndex
    ├── Methods: setVolatility(), getRiskLevel()
    └── Overrides: getInfo()

Portfolio Class (Composition)
├── Contains: Array<Asset>
├── Methods: addAsset(), removeAsset(), getTotalValue()
└── Uses: QuickSort for ranking
```

**Usage Example:**
1. Click "Portfolio Manager" tab
2. Select "Stock" or "Crypto"
3. Fill in details (Symbol: AAPL, Quantity: 10, Price: 150, Sector: Tech)
4. Click "Add Asset"
5. See it appear in the list
6. Try sorting by profit
7. Click "Sell" to remove

---

### 3. Algorithm Visualizer (ADA Demonstration)

**Location**: React → Tab 3 (Algorithms)

**Features:**

#### **Sorting Algorithms**
- **Quick Sort**
  - Time Complexity: O(n log n) average, O(n²) worst
  - Space Complexity: O(log n)
  - Divide & Conquer approach
  - Live execution timing

- **Merge Sort**
  - Time Complexity: O(n log n) guaranteed
  - Space Complexity: O(n)
  - Stable sorting algorithm
  - Live execution timing

**Usage:**
```
Input: 45,23,67,12,89,34,56
Click "Run Algorithm"
Output: [12, 23, 34, 45, 56, 67, 89]
Timing: QuickSort: 0.0123ms, MergeSort: 0.0145ms
```

#### **Search Algorithms**
- **Binary Search**
  - Time Complexity: O(log n)
  - Space Complexity: O(1)
  - Requires sorted array
  - Shows comparison count

**Usage:**
```
Input: 12,23,34,45,56|34 (array|target)
Click "Run Algorithm"
Output: Found at index 2, Comparisons: 3
```

#### **Technical Analysis**
- **Moving Average**
  - Time Complexity: O(n × k)
  - Used for trend analysis
  - Configurable period

**Usage:**
```
Input: 100,105,103,108,110,115,112
Output: MA(3): [102.67, 105.33, 107.00, 111.00, 112.33]
```

**Algorithms Included (Full List):**
1. Quick Sort (Divide & Conquer)
2. Merge Sort (Divide & Conquer)
3. Binary Search (Logarithmic)
4. Linear Search (Sequential)
5. Knapsack Problem (Dynamic Programming)
6. Activity Selection (Greedy)
7. Fractional Knapsack (Greedy)
8. Dijkstra's Algorithm (Graph)
9. Moving Average (Analysis)
10. Standard Deviation (Statistics)

---

### 4. Data Structures Demonstration

**Location**: React → Tab 4 (Data Structures)

**Features:**

#### **1. Binary Search Tree (BST)**
- **Purpose**: Efficient stock price lookups
- **Operations**:
  - Insert: Add stock with price
  - Search: Find stock by price
  - Inorder Traversal: Get sorted list
- **Complexity**: O(log n) average

**Usage:**
```
Input: AAPL,150
Click "Insert"
Click "Inorder Traversal"
Output: Sorted list of stocks by price
```

#### **2. Min-Heap**
- **Purpose**: Priority-based trade execution
- **Operations**:
  - Insert: Add trade with priority
  - Extract Min: Get highest priority trade
  - View All: See heap structure
- **Complexity**: O(log n) for insert/extract

**Usage:**
```
Input: BUY_AAPL,85 (data,priority)
Click "Insert"
Click "Extract Min"
Output: Trade with highest priority (lowest number)
```

#### **3. Graph**
- **Purpose**: Asset correlation analysis
- **Operations**:
  - Add Edge: Connect two assets
  - BFS: Breadth-first traversal
  - DFS: Depth-first traversal
- **Complexity**: O(V + E)

**Usage:**
```
Input: USD,EUR,0.8 (vertex1,vertex2,weight)
Click "Add Edge"
Click "BFS"
Output: [USD, EUR, GBP, ...] (traversal order)
```

#### **4. Stack (LIFO)**
- **Purpose**: Undo/Redo operations
- **Operations**: Push, Pop, Peek
- **Complexity**: O(1)

**Usage:**
```
Input: Buy AAPL
Click "Push"
Click "Pop"
Output: Buy AAPL (last added, first removed)
```

#### **5. Queue (FIFO)**
- **Purpose**: Order processing
- **Operations**: Enqueue, Dequeue, Front
- **Complexity**: O(1)

**Usage:**
```
Input: Order #123
Click "Enqueue"
Click "Dequeue"
Output: Order #123 (first added, first removed)
```

---

## 🏗️ Architecture Explanation

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     DATA SOURCES LAYER                       │
│  News: CNBC, Reuters, Bloomberg, ForexLive, CoinTelegraph  │
│  Calendar: ForexFactory Economic Events                     │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   AI ANALYSIS LAYER                          │
│  Google Gemini 2.5 Flash                                    │
│  • Multi-asset identification                               │
│  • Sentiment scoring (-1 to +1)                             │
│  • Mood classification (POSITIVE/NEGATIVE/NEUTRAL)          │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              MESSAGE STREAMING LAYER                         │
│  Apache Kafka + Zookeeper                                   │
│  Topic: stock_data                                          │
│  • Real-time message queue                                  │
│  • Fault-tolerant                                           │
│  • Scalable to millions of messages                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  DATA LAKE LAYER                             │
│  MinIO (S3-Compatible Object Storage)                       │
│  Buckets:                                                   │
│  • stock-market1/news_data/                                 │
│  • stock-market1/forex_data/                                │
└──────────────┬──────────────────┬───────────────────────────┘
               │                  │
               ▼                  ▼
┌──────────────────────┐  ┌──────────────────────────────────┐
│   FastAPI Server     │  │   Streamlit Dashboard            │
│   (Port 8000)        │  │   (Port 8501)                    │
│   • REST API         │  │   • Original UI                  │
│   • CORS enabled     │  │   • Live updates                 │
│   • Swagger docs     │  │   • Bloomberg style              │
└──────────┬───────────┘  └──────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│              REACT FRONTEND (Port 3000)                      │
│  • Modern UI with 4 tabs                                    │
│  • Live Dashboard (AI sentiment)                            │
│  • Portfolio Manager (OOP)                                  │
│  • Algorithm Visualizer (ADA)                               │
│  • Data Structures Demo                                     │
└─────────────────────────────────────────────────────────────┘
```

### Component Breakdown

#### **1. Backend Services (Python)**

**File**: `app/main.py`
- **News Scraper Worker**: Fetches from 5 news sources via RSS/API
- **AI Analyst Worker**: Sends to Gemini for sentiment analysis
- **Forex Scraper Worker**: Scrapes ForexFactory for calendar events
- **Data Lake Consumer**: Reads from Kafka, writes to MinIO

**Technologies:**
- `feedparser`: Parse RSS feeds
- `requests`: HTTP requests
- `beautifulsoup4`: Web scraping
- `kafka-python`: Kafka producer/consumer
- `s3fs`: MinIO/S3 filesystem
- `google-generativeai`: Gemini AI SDK

#### **2. API Layer (Python)**

**File**: `app/api.py`
- FastAPI server with CORS
- Endpoints:
  - `GET /`: API status
  - `GET /signals`: All trade signals
  - `GET /news/{currency}`: Currency-specific news
  - `GET /api/news`: All news (for React)
  - `GET /api/forex`: Forex events (for React)

#### **3. Original Dashboard (Python)**

**File**: `app/dashboard.py`
- Streamlit web app
- Real-time updates every 2 seconds
- Bloomberg-inspired dark theme
- Custom CSS styling
- Direct MinIO access

#### **4. Frontend (React)**

**Files**:
- `frontend/src/App.js`: Main app with routing
- `frontend/src/components/SentimentDashboard.js`: Live dashboard
- `frontend/src/components/PortfolioManager.js`: OOP demo
- `frontend/src/components/AlgorithmVisualizer.js`: ADA demo
- `frontend/src/components/DataStructureDemo.js`: DS demo
- `frontend/src/algorithms/DataStructures.js`: BST, Heap, Graph, Stack, Queue
- `frontend/src/algorithms/Algorithms.js`: Sorting, searching, DP, greedy, graph algorithms

**Libraries:**
- `react`: Frontend framework
- `axios`: HTTP client
- `recharts`: Chart visualizations
- `framer-motion`: Animations
- `lucide-react`: Icons

#### **5. Infrastructure (Docker)**

**File**: `docker-compose.yml`

7 Containers:
1. `zookeeper`: Kafka coordination
2. `broker`: Kafka message broker
3. `minio`: Object storage (data lake)
4. `stock-app`: Python backend
5. `api`: FastAPI server
6. `dashboard`: Streamlit UI
7. `frontend`: React UI

---

## 🛠️ Technologies Used

### Programming Languages
| Language | Usage | Lines of Code |
|----------|-------|---------------|
| Python | Backend, AI integration | ~600 lines |
| JavaScript (React) | Frontend, algorithms, DS | ~2000 lines |
| CSS | Styling | ~800 lines |
| YAML | Docker configuration | ~60 lines |

### Frameworks & Libraries

**Backend:**
- Python 3.9+
- FastAPI (Web framework)
- Streamlit (Dashboard)
- Google Generative AI SDK
- Kafka-Python
- S3FS
- Pandas
- Beautiful Soup 4
- Feedparser

**Frontend:**
- React 18.2
- Axios
- Recharts
- Framer Motion
- Lucide React

**Infrastructure:**
- Docker & Docker Compose
- Apache Kafka 7.3.0
- Apache Zookeeper 7.3.0
- MinIO (Latest)

### External Services
- Google Gemini 2.5 Flash (AI model)
- CNBC RSS Feed
- Reuters RSS Feed
- Bloomberg RSS Feed
- ForexLive RSS Feed
- CoinTelegraph RSS Feed
- ForexFactory (Web scraping)

---

## 📚 CS Fundamentals Implementation

### 1. Data Structures (Implemented from Scratch)

**File**: `frontend/src/algorithms/DataStructures.js`

#### Binary Search Tree
```javascript
class TreeNode {
  constructor(symbol, price) {
    this.symbol = symbol;
    this.price = price;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  insert(symbol, price) { /* O(log n) */ }
  search(targetPrice) { /* O(log n) */ }
  inorderTraversal() { /* O(n) */ }
}
```

**Use Case**: Stock price indexing for fast lookups

#### Min-Heap
```javascript
class MinHeap {
  insert(priority, data) { /* O(log n) */ }
  extractMin() { /* O(log n) */ }
  heapifyUp(index) { /* Maintains heap property */ }
  heapifyDown(index) { /* Maintains heap property */ }
}
```

**Use Case**: Priority-based trade execution queue

#### Graph
```javascript
class Graph {
  addVertex(vertex) { /* O(1) */ }
  addEdge(v1, v2, weight) { /* O(1) */ }
  bfs(start) { /* O(V + E) */ }
  dfs(start) { /* O(V + E) */ }
}
```

**Use Case**: Asset correlation network analysis

#### Stack (LIFO)
```javascript
class Stack {
  push(item) { /* O(1) */ }
  pop() { /* O(1) */ }
  peek() { /* O(1) */ }
}
```

**Use Case**: Undo/Redo operations in trading interface

#### Queue (FIFO)
```javascript
class Queue {
  enqueue(item) { /* O(1) */ }
  dequeue() { /* O(1) */ }
  front() { /* O(1) */ }
}
```

**Use Case**: Order processing system

---

### 2. Object-Oriented Programming

**File**: `frontend/src/components/PortfolioManager.js`

#### Class Hierarchy

```javascript
// BASE CLASS
class Asset {
  constructor(symbol, quantity, buyPrice) {
    this.symbol = symbol;
    this.quantity = quantity;
    this.buyPrice = buyPrice;
    this.currentPrice = buyPrice;
    this.type = 'Asset';
  }
  
  // Encapsulation: Public methods
  getValue() { return this.quantity * this.currentPrice; }
  getProfit() { return (this.currentPrice - this.buyPrice) * this.quantity; }
  updatePrice(newPrice) { this.currentPrice = newPrice; }
  getInfo() { return `${this.type}: ${this.symbol}`; }
}

// DERIVED CLASS 1: Inheritance
class Stock extends Asset {
  constructor(symbol, quantity, buyPrice, sector) {
    super(symbol, quantity, buyPrice); // Inheritance
    this.sector = sector;
    this.type = 'Stock';
    this.dividendYield = 0;
  }
  
  setDividend(yield_) { this.dividendYield = yield_; }
  getDividendIncome() { return this.getValue() * (this.dividendYield / 100); }
  
  // Polymorphism: Method overriding
  getInfo() { return `${this.type}: ${this.symbol} (${this.sector})`; }
}

// DERIVED CLASS 2: Inheritance
class Crypto extends Asset {
  constructor(symbol, quantity, buyPrice, blockchain) {
    super(symbol, quantity, buyPrice);
    this.blockchain = blockchain;
    this.type = 'Crypto';
    this.volatilityIndex = 0;
  }
  
  setVolatility(index) { this.volatilityIndex = index; }
  getRiskLevel() { /* Returns risk based on volatility */ }
  
  // Polymorphism: Method overriding
  getInfo() { return `${this.type}: ${this.symbol} on ${this.blockchain}`; }
}

// COMPOSITION: Portfolio contains Assets
class Portfolio {
  constructor(name) {
    this.name = name;
    this.assets = []; // Composition: contains array of Assets
    this.cash = 10000;
  }
  
  addAsset(asset) { /* Add stock or crypto */ }
  removeAsset(symbol) { /* Remove asset */ }
  getTotalValue() { /* Calculate total portfolio value */ }
  sortAssetsByProfit() { /* Uses QuickSort algorithm */ }
}
```

**OOP Concepts Demonstrated:**
1. ✅ **Encapsulation**: Data (symbol, price) hidden, accessed via methods
2. ✅ **Inheritance**: Stock and Crypto inherit from Asset
3. ✅ **Polymorphism**: getInfo() overridden in derived classes
4. ✅ **Composition**: Portfolio contains Asset objects
5. ✅ **Abstraction**: Complex logic hidden in methods

---

### 3. Algorithm Design & Analysis (ADA)

**File**: `frontend/src/algorithms/Algorithms.js`

#### Sorting Algorithms

**Quick Sort** (Divide & Conquer)
```javascript
function quickSort(arr, key = null) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(item => item < pivot);
  const middle = arr.filter(item => item === pivot);
  const right = arr.filter(item => item > pivot);
  return [...quickSort(left, key), ...middle, ...quickSort(right, key)];
}
```
- Time: O(n log n) average, O(n²) worst
- Space: O(log n)
- Use: Portfolio sorting

**Merge Sort** (Divide & Conquer)
```javascript
function mergeSort(arr, key = null) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), key);
  const right = mergeSort(arr.slice(mid), key);
  return merge(left, right, key);
}
```
- Time: O(n log n) guaranteed
- Space: O(n)
- Use: Stable sorting needed

#### Search Algorithms

**Binary Search** (Logarithmic)
```javascript
function binarySearch(arr, target, key = null) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```
- Time: O(log n)
- Space: O(1)
- Use: Fast stock lookup

#### Dynamic Programming

**Knapsack Problem** (Portfolio Optimization)
```javascript
function knapsack(items, capacity) {
  const n = items.length;
  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (items[i-1].weight <= w) {
        dp[i][w] = Math.max(
          items[i-1].value + dp[i-1][w - items[i-1].weight],
          dp[i-1][w]
        );
      } else {
        dp[i][w] = dp[i-1][w];
      }
    }
  }
  return dp[n][capacity];
}
```
- Time: O(n × W)
- Space: O(n × W)
- Use: Optimal portfolio selection

#### Greedy Algorithms

**Activity Selection** (Trade Timing)
```javascript
function activitySelection(activities) {
  const sorted = [...activities].sort((a, b) => a.finish - b.finish);
  const selected = [sorted[0]];
  let lastFinish = sorted[0].finish;
  
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].start >= lastFinish) {
      selected.push(sorted[i]);
      lastFinish = sorted[i].finish;
    }
  }
  return selected;
}
```
- Time: O(n log n)
- Space: O(n)
- Use: Optimal trade execution times

#### Graph Algorithms

**Dijkstra's Algorithm** (Shortest Path)
```javascript
function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  
  // Initialize distances to infinity
  for (const vertex of graph.keys()) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;
  
  // Find shortest paths
  while (visited.size < graph.size) {
    // Find unvisited vertex with min distance
    let minVertex = null;
    let minDistance = Infinity;
    
    for (const vertex of graph.keys()) {
      if (!visited.has(vertex) && distances[vertex] < minDistance) {
        minVertex = vertex;
        minDistance = distances[vertex];
      }
    }
    
    if (minVertex === null) break;
    visited.add(minVertex);
    
    // Update neighbor distances
    const neighbors = graph.get(minVertex) || [];
    for (const neighbor of neighbors) {
      const distance = distances[minVertex] + neighbor.weight;
      if (distance < distances[neighbor.node]) {
        distances[neighbor.node] = distance;
      }
    }
  }
  
  return distances;
}
```
- Time: O(V²) or O(E log V) with priority queue
- Space: O(V)
- Use: Asset correlation paths

#### Analysis Algorithms

**Moving Average** (Technical Analysis)
```javascript
function movingAverage(data, period) {
  const result = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    result.push(sum / period);
  }
  return result;
}
```
- Time: O(n × k)
- Space: O(n)
- Use: Stock trend analysis

**Standard Deviation** (Volatility)
```javascript
function standardDeviation(values) {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
  return Math.sqrt(variance);
}
```
- Time: O(n)
- Space: O(n)
- Use: Risk assessment

---

## 🔧 Troubleshooting Guide

### Common Issues and Solutions

#### Issue 1: Docker Desktop Not Starting

**Symptoms:**
- "Error: Cannot connect to Docker daemon"
- Whale icon in system tray is red/crossed out

**Solutions:**
1. **Restart Docker Desktop**
   - Right-click whale icon → Quit
   - Launch Docker Desktop again
   - Wait 2-3 minutes

2. **Enable Virtualization in BIOS**
   - Restart computer
   - Enter BIOS (usually F2, F10, or DEL)
   - Enable Intel VT-x or AMD-V
   - Save and exit

3. **Install WSL 2 (Windows)**
   ```powershell
   wsl --install
   wsl --set-default-version 2
   ```
   - Restart computer

#### Issue 2: Containers Fail to Start

**Symptoms:**
- Some containers show "Exited" status
- Error messages in docker logs

**Solutions:**
1. **Check Container Logs**
   ```bash
   docker logs <container-name>
   ```

2. **Restart Specific Container**
   ```bash
   docker-compose restart <service-name>
   ```

3. **Clean Restart All**
   ```bash
   docker-compose down
   docker-compose up --build
   ```

4. **Increase Docker Memory**
   - Docker Desktop → Settings → Resources
   - Increase RAM to 8GB or more
   - Click "Apply & Restart"

#### Issue 3: React Frontend Not Loading

**Symptoms:**
- http://localhost:3000 shows "Cannot connect"
- Frontend container keeps restarting

**Solutions:**
1. **Wait Longer**
   - React build takes 2-5 minutes
   - Wait patiently

2. **Check Frontend Logs**
   ```bash
   docker logs frontend
   ```

3. **Rebuild Frontend**
   ```bash
   docker-compose up --build frontend
   ```

4. **Check Node Modules**
   ```bash
   docker exec frontend npm install
   ```

#### Issue 4: No Data in Dashboard

**Symptoms:**
- Dashboard shows "Connecting to Gemini..."
- No news items appearing

**Solutions:**
1. **Check Gemini API Key**
   - Open `app/main.py`
   - Verify API key is correct (line 16)
   - Get new key from: https://aistudio.google.com/apikey

2. **API Quota Exceeded**
   - Free tier: 20 requests/day
   - Wait 24 hours for reset
   - OR use different Google account

3. **Check Backend Logs**
   ```bash
   docker logs stock-app
   ```
   - Look for "Gemini 2.5:" messages
   - Look for errors

4. **Manual Bucket Creation**
   ```bash
   docker exec minio mc mb local/stock-market1
   docker-compose restart stock-app
   ```

5. **Use Demo Mode**
   - Wait 10 seconds on Live Dashboard
   - Demo data will automatically load
   - Shows how system looks with real data

#### Issue 5: Kafka/Zookeeper Errors

**Symptoms:**
- "Broker" container exited
- "NodeExistsException" errors

**Solutions:**
1. **Clean Restart**
   ```bash
   docker-compose down -v  # Remove volumes
   docker-compose up --build
   ```

2. **Check Zookeeper First**
   ```bash
   docker logs zookeeper
   ```
   - Should show "binding to port 2181"

3. **Wait for Zookeeper**
   - Kafka needs Zookeeper to be fully ready
   - Wait 30 seconds after starting

#### Issue 6: Port Already in Use

**Symptoms:**
- "Port 3000 is already allocated"
- "Port 8501 is already allocated"

**Solutions:**
1. **Find Process Using Port (Windows)**
   ```powershell
   netstat -ano | findstr :3000
   taskkill /PID <process_id> /F
   ```

2. **Find Process Using Port (Mac/Linux)**
   ```bash
   lsof -i :3000
   kill -9 <PID>
   ```

3. **Change Port in docker-compose.yml**
   ```yaml
   frontend:
     ports:
       - "3001:3000"  # Use 3001 instead of 3000
   ```

#### Issue 7: Slow Performance

**Symptoms:**
- System is very slow
- High CPU/RAM usage

**Solutions:**
1. **Close Unnecessary Apps**
2. **Increase Docker Resources**
   - Docker Desktop → Settings → Resources
   - RAM: 8GB minimum
   - CPUs: 4 cores recommended

3. **Stop Unused Containers**
   ```bash
   docker stop dashboard  # Stop Streamlit if not using
   ```

---

## 🎓 For College Evaluation

### What to Demonstrate

#### Part 1: System Overview (2 minutes)

1. **Show Architecture Diagram**
   - Explain data flow: News → AI → Kafka → MinIO → UI
   - Point out 7 Docker containers
   - Mention technologies (Kafka, MinIO, React, Python)

2. **Show docker-compose.yml**
   - Explain microservices architecture
   - Show how containers communicate

#### Part 2: Live Features (5 minutes)

1. **React Dashboard - Live Tab**
   - http://localhost:3000
   - Show AI sentiment analysis
   - Explain how Gemini AI works
   - Show multi-asset tracking
   - Point out trade signals

2. **Portfolio Manager Tab**
   - Add a Stock: AAPL, 10, $150, Tech
   - Add a Crypto: BTC, 0.5, $50000, Bitcoin
   - Show OOP concepts:
     - "Stock and Crypto inherit from Asset base class"
     - "getInfo() method is overridden in each class"
     - "Portfolio uses composition to contain assets"
   - Sort by profit → Show QuickSort in action

3. **Algorithms Tab**
   - Input: `45,23,67,12,89,34,56`
   - Run sorting algorithms
   - Show timing comparison
   - Explain: "QuickSort O(n log n), divide and conquer"

4. **Data Structures Tab**
   - Select Binary Search Tree
   - Insert: `AAPL,150`
   - Insert: `GOOGL,120`
   - Click "Inorder Traversal"
   - Show sorted output
   - Explain: "BST gives O(log n) search time"

#### Part 3: Code Walkthrough (3 minutes)

1. **Show Backend Code** (`app/main.py`)
   - Gemini AI integration (lines 60-95)
   - Kafka producer (line 91)
   - Multi-threading (lines 169-189)

2. **Show Data Structures** (`frontend/src/algorithms/DataStructures.js`)
   - Binary Search Tree implementation
   - Show insert and search methods
   - Explain complexity

3. **Show OOP Classes** (`frontend/src/components/PortfolioManager.js`)
   - Asset base class
   - Stock and Crypto derived classes
   - Method overriding example

#### Part 4: Questions & Answers

**Q: What data structures did you implement?**
**A:** "We implemented 5 data structures from scratch: Binary Search Tree for efficient stock lookups, Min-Heap for priority-based trading, Graph for asset correlation with BFS/DFS, Stack for undo/redo, and Queue for order processing. All are in `DataStructures.js` with complete implementations."

**Q: Explain OOP concepts in your project**
**A:** "We have inheritance with Asset as the base class, Stock and Crypto as derived classes. We demonstrate polymorphism through the getInfo() method which is overridden in each class. The Portfolio class uses composition to contain Asset objects. This shows encapsulation, inheritance, polymorphism, and composition."

**Q: What's the time complexity of your sorting?**
**A:** "QuickSort has O(n log n) average case but O(n²) worst case. Merge Sort guarantees O(n log n) in all cases. We show both with live timing so you can see the performance difference. For the portfolio manager, we use QuickSort which is faster in practice."

**Q: How does AI sentiment analysis work?**
**A:** "We scrape news from 5 sources, send each headline to Google Gemini 2.5 with a structured prompt. The AI identifies affected assets (USD, EUR, BTC, etc.), determines sentiment (POSITIVE/NEGATIVE/NEUTRAL), and assigns a score from -1 to +1. This streams through Kafka to our MinIO data lake, then displays in both React and Streamlit dashboards."

**Q: What makes this production-ready?**
**A:** "We use industry-standard technologies: Kafka for message streaming (used by LinkedIn, Netflix), MinIO for object storage (AWS S3 compatible), Docker for containerization, React for modern UI, and Python with FastAPI for backend. The microservices architecture allows independent scaling of each component."

**Q: Show me the graph algorithm**
**A:** "Sure. In the Data Structures tab, I'll add edges between currencies: USD-EUR with weight 0.8, EUR-GBP with 0.9. Then run BFS which visits nodes level by level. The output shows the traversal order. This is useful for finding asset correlations and diversification opportunities."

---

### Project Highlights for Viva

**Academic Requirements Met:**
- ✅ Programming Languages: Python, JavaScript (React)
- ✅ Data Structures: 5 types implemented from scratch
- ✅ OOP: Base class, inheritance, polymorphism, composition
- ✅ ADA: 10+ algorithms with complexity analysis
- ✅ Real-world Application: Financial sentiment analysis

**Industry Relevance:**
- ✅ AI/ML: Google Gemini 2.5 integration
- ✅ Big Data: Kafka streaming, MinIO data lake
- ✅ Cloud: S3-compatible storage
- ✅ Containers: Docker, Docker Compose
- ✅ Modern Web: React with animations, Streamlit
- ✅ API Development: RESTful FastAPI

**Innovation:**
- ✅ Multi-source news aggregation
- ✅ Real-time AI analysis
- ✅ Beautiful Bloomberg-style UI
- ✅ Interactive algorithm visualizations
- ✅ Complete end-to-end solution

---

### Project Statistics

| Metric | Count |
|--------|-------|
| **Total Lines of Code** | ~3,500 |
| **Python Files** | 3 (main.py, api.py, dashboard.py) |
| **JavaScript Files** | 12+ (React components) |
| **Data Structures** | 5 (BST, Heap, Graph, Stack, Queue) |
| **Algorithms** | 12+ (Sorting, Searching, DP, Greedy, Graph) |
| **OOP Classes** | 4 (Asset, Stock, Crypto, Portfolio) |
| **Docker Containers** | 7 |
| **Technologies** | 15+ |
| **News Sources** | 5 |
| **Tracked Assets** | 12 (currencies, crypto, commodities) |
| **Development Time** | 3 months |

---

## 📝 Project Report Outline

### Suggested Chapter Structure

**Chapter 1: Introduction**
1.1 Problem Statement
1.2 Objectives
1.3 Scope of Project
1.4 Methodology

**Chapter 2: Literature Review**
2.1 Sentiment Analysis in Finance
2.2 Natural Language Processing with AI
2.3 Real-time Data Streaming Systems
2.4 Similar Systems Review

**Chapter 3: System Requirements Analysis**
3.1 Functional Requirements
3.2 Non-Functional Requirements
3.3 Hardware Requirements
3.4 Software Requirements

**Chapter 4: System Design**
4.1 Overall Architecture
4.2 Data Flow Diagram
4.3 Component Interaction
4.4 Database Design (MinIO structure)
4.5 API Design

**Chapter 5: Data Structures Implementation**
5.1 Binary Search Tree
5.2 Min-Heap
5.3 Graph
5.4 Stack and Queue
5.5 Complexity Analysis

**Chapter 6: Algorithm Design & Analysis**
6.1 Sorting Algorithms
6.2 Searching Algorithms
6.3 Dynamic Programming
6.4 Greedy Algorithms
6.5 Graph Algorithms
6.6 Time and Space Complexity

**Chapter 7: Object-Oriented Design**
7.1 Class Hierarchy
7.2 Inheritance Implementation
7.3 Polymorphism
7.4 Encapsulation
7.5 Composition

**Chapter 8: Implementation**
8.1 Backend Development (Python)
8.2 AI Integration (Gemini)
8.3 Message Streaming (Kafka)
8.4 Data Lake (MinIO)
8.5 Frontend Development (React)
8.6 API Development (FastAPI)

**Chapter 9: Testing**
9.1 Unit Testing
9.2 Integration Testing
9.3 Performance Testing
9.4 User Acceptance Testing

**Chapter 10: Results & Discussion**
10.1 System Screenshots
10.2 Performance Metrics
10.3 Accuracy Analysis
10.4 Limitations

**Chapter 11: Conclusion**
11.1 Summary of Achievements
11.2 Learning Outcomes
11.3 Future Enhancements

**Chapter 12: References**
- Research papers
- Documentation
- GitHub repositories

**Appendices**
- Source Code Listings
- User Manual
- Installation Guide

---

## 🚀 Future Enhancements

### Short-term (1-3 months)
1. ✅ Historical data analysis and backtesting
2. ✅ User authentication and authorization
3. ✅ Custom alerts and notifications
4. ✅ Mobile app (React Native)
5. ✅ Advanced charting (candlesticks, indicators)

### Medium-term (3-6 months)
1. ✅ Machine learning model training
2. ✅ Automated trading bot
3. ✅ Risk management algorithms
4. ✅ Portfolio optimization algorithms
5. ✅ Multi-language support

### Long-term (6-12 months)
1. ✅ Cloud deployment (AWS/Azure/GCP)
2. ✅ Kubernetes orchestration
3. ✅ Advanced AI models (fine-tuned)
4. ✅ Blockchain integration
5. ✅ Social trading features

---

## 📞 Support & Contact

### For Project Issues

1. **Check Logs**
   ```bash
   docker-compose logs
   docker logs <container-name>
   ```

2. **Restart Services**
   ```bash
   docker-compose restart
   ```

3. **Clean Rebuild**
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

### Useful Resources

- **Docker Documentation**: https://docs.docker.com
- **React Documentation**: https://react.dev
- **Gemini API Docs**: https://ai.google.dev/docs
- **Kafka Documentation**: https://kafka.apache.org/documentation
- **MinIO Documentation**: https://min.io/docs

---

## ✅ Final Checklist

### Before College Evaluation

- [ ] Docker Desktop installed and running
- [ ] All 7 containers starting successfully
- [ ] Gemini API key configured (or demo mode ready)
- [ ] React dashboard accessible (http://localhost:3000)
- [ ] All 4 tabs working (Dashboard, Portfolio, Algorithms, Data Structures)
- [ ] Streamlit dashboard accessible (http://localhost:8501)
- [ ] Can demonstrate adding assets to portfolio
- [ ] Can demonstrate sorting algorithms
- [ ] Can demonstrate data structures operations
- [ ] README.md printed and ready
- [ ] PRESENTATION_GUIDE.md reviewed
- [ ] Code files ready to show (main.py, DataStructures.js, PortfolioManager.js)
- [ ] Architecture diagram prepared
- [ ] Class diagram prepared (for OOP explanation)
- [ ] Practice demo completed (5-10 minutes)

---

## 🎓 Conclusion

This project successfully demonstrates:

1. **Academic Excellence**
   - Complete implementation of core CS concepts
   - Data Structures built from scratch
   - OOP with proper inheritance hierarchy
   - Algorithm complexity analysis

2. **Industry Readiness**
   - Production-grade technologies
   - Scalable microservices architecture
   - Modern web development practices
   - Real AI integration

3. **Innovation**
   - Multi-source data aggregation
   - Real-time sentiment analysis
   - Beautiful, professional UI
   - Complete end-to-end solution

**This project is ready for February 2026 evaluation and demonstrates both academic fundamentals and industry-level engineering.**

---

**Version**: 1.0  
**Last Updated**: January 16, 2026  
**Status**: ✅ Complete & Ready for Evaluation

---

**⭐ Good luck with your evaluation! This project represents months of work and demonstrates exceptional technical skills. Be proud of what you've built!** 🚀🎓
