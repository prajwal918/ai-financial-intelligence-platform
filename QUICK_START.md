# 🚀 Quick Start Guide

## ⚡ Start the Project

### Windows:
```bash
# Double-click this file:
start.bat

# OR in terminal:
docker-compose up --build
```

## 🌐 Access URLs (After 3-5 minutes)

| Service | URL | Description |
|---------|-----|-------------|
| **React Frontend** | http://localhost:3000 | Main Dashboard (NEW!) |
| **Streamlit UI** | http://localhost:8501 | Alternative Dashboard |
| **API Docs** | http://localhost:8000/docs | FastAPI Swagger |
| **MinIO Console** | http://localhost:9001 | Data Lake (admin/password) |

## 📑 What Each Tab Does

### React Frontend (localhost:3000)

#### Tab 1: 📊 Live Dashboard
- Real-time AI sentiment from your backend
- News feed with sentiment scores
- Sentiment wave chart

#### Tab 2: 💼 Portfolio Manager
- **OOP Demo**: Add stocks/crypto
- Shows inheritance & polymorphism
- QuickSort for ranking

#### Tab 3: 🧮 Algorithms
- **Sorting**: QuickSort vs MergeSort
- **Search**: Binary Search demo
- **Analysis**: Moving Average
- Shows time complexity

#### Tab 4: 🌳 Data Structures
- **BST**: Insert, Search, Traverse
- **Heap**: Priority queue ops
- **Graph**: BFS, DFS traversal
- **Stack/Queue**: Basic operations

## 🎯 For Quick Demo

### 1. Show Live AI (30 seconds)
```
1. Open http://localhost:3000
2. Wait for news to load
3. Point out sentiment scores
```

### 2. Show Data Structures (60 seconds)
```
1. Click "Data Structures" tab
2. Select "Binary Search Tree"
3. Type: AAPL,150
4. Click "Insert"
5. Click "Inorder Traversal"
6. Show sorted output
```

### 3. Show Algorithms (60 seconds)
```
1. Click "Algorithms" tab
2. Type: 45,23,67,12,89
3. Click "Run Algorithm"
4. Show QuickSort vs MergeSort times
```

### 4. Show OOP (60 seconds)
```
1. Click "Portfolio Manager" tab
2. Select "Stock"
3. Fill: AAPL, 10, 150, Tech
4. Click "Add Asset"
5. Explain inheritance
```

## 🛑 Stop the Project

```bash
# Press Ctrl+C in terminal
# OR
docker-compose down
```

## 🔑 Important Files

### To Show During Viva:
- `frontend/src/algorithms/DataStructures.js` - DS implementations
- `frontend/src/algorithms/Algorithms.js` - Algorithm code
- `frontend/src/components/PortfolioManager.js` - OOP classes
- `app/main.py` - Your Kafka producers
- `docker-compose.yml` - Architecture

### Documentation:
- `README.md` - Full documentation
- `PRESENTATION_GUIDE.md` - Viva Q&A
- `CHANGES_SUMMARY.md` - What was added

## 📊 Key Numbers to Remember

- **5** Data Structures implemented
- **10+** Algorithms with analysis
- **4** OOP classes (Asset, Stock, Crypto, Portfolio)
- **12+** Technologies used
- **O(log n)** Binary Search complexity
- **O(n log n)** Sorting complexity

## ⚠️ Troubleshooting

### Problem: React not loading
```bash
# Wait 5 minutes for npm install
# Check logs:
docker logs frontend
```

### Problem: No data in dashboard
```bash
# Restart services:
docker-compose restart stock-app
docker-compose restart api
```

### Problem: Docker error
```bash
# Clean restart:
docker-compose down
docker-compose up --build
```

## ✅ Pre-Evaluation Checklist

- [ ] Docker Desktop is running
- [ ] All containers started (7 total)
- [ ] React frontend loads (port 3000)
- [ ] Gemini API key configured in app/main.py
- [ ] Internet connection active
- [ ] PRESENTATION_GUIDE.md printed
- [ ] Can access all 4 tabs
- [ ] Can demonstrate each data structure
- [ ] Can run sorting algorithms
- [ ] Can add assets to portfolio

## 🎓 What Makes This Project Special

### Academic Requirements ✅
- Data Structures (5 types, from scratch)
- OOP (inheritance, polymorphism, encapsulation)
- ADA (sorting, searching, graph algorithms)
- Complexity analysis

### Industry Technologies ✅
- AI (Google Gemini 2.5)
- Big Data (Kafka, MinIO)
- Containers (Docker)
- Modern Web (React, FastAPI)

### Your Original Work ✅
- All your backend code intact
- Kafka producers still work
- Gemini integration unchanged
- Data lake functioning

## 💡 Quick Answers

**Q: What did you build?**
A: Financial intelligence platform with AI sentiment analysis + complete CS fundamentals

**Q: What data structures?**
A: BST, Heap, Graph, Stack, Queue - all from scratch

**Q: What's the complexity?**
A: BST O(log n), Heap O(log n), QuickSort O(n log n), Binary Search O(log n)

**Q: Show me OOP**
A: Portfolio Manager tab - Asset → Stock/Crypto inheritance

**Q: Is this your code?**
A: Yes, custom implementations. Industry tools are standard (React, Kafka)

## 🌟 Success Mantra

**"This project combines academic fundamentals (DS, OOP, ADA) with industry technologies (AI, Kafka, React, Docker) to solve a real-world problem (financial sentiment analysis)."**

## 📞 Day of Evaluation

1. ⏰ Start Docker 10 minutes early
2. 🌐 Test all URLs
3. 📋 Have code files open
4. 💪 Be confident - you have a complete project
5. 🎯 Focus on YOUR implementations (DS, Algorithms, OOP)

---

**Good Luck! You've got this! 🚀**
