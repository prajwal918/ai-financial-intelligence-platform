import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { quickSort, mergeSort, binarySearch, dijkstra, movingAverage } from '../algorithms/Algorithms';
import './AlgorithmVisualizer.css';

function AlgorithmVisualizer() {
  const [selectedAlgo, setSelectedAlgo] = useState('sort');
  const [inputData, setInputData] = useState('45,23,67,12,89,34,56');
  const [result, setResult] = useState(null);
  const [complexity, setComplexity] = useState(null);

  const algorithms = {
    sort: {
      name: '🔄 Sorting Algorithms',
      description: 'Quick Sort & Merge Sort (Divide & Conquer)',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(log n)',
      run: () => {
        const arr = inputData.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
        const startTime = performance.now();
        const quickSorted = quickSort([...arr]);
        const quickTime = performance.now() - startTime;
        
        const startTime2 = performance.now();
        const mergeSorted = mergeSort([...arr]);
        const mergeTime = performance.now() - startTime2;
        
        setResult({
          original: arr,
          quickSort: quickSorted,
          mergeSort: mergeSorted,
          quickTime: quickTime.toFixed(4),
          mergeTime: mergeTime.toFixed(4)
        });
        setComplexity('O(n log n) average case, O(n²) worst case for Quick Sort');
      }
    },
    search: {
      name: '🔍 Binary Search',
      description: 'Efficient searching in sorted arrays',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      run: () => {
        const parts = inputData.split('|');
        const arr = parts[0].split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n)).sort((a, b) => a - b);
        const target = parseFloat(parts[1] || arr[0]);
        
        const startTime = performance.now();
        const index = binarySearch(arr, target);
        const time = performance.now() - startTime;
        
        setResult({
          array: arr,
          target,
          foundAt: index,
          time: time.toFixed(4),
          comparisons: Math.ceil(Math.log2(arr.length))
        });
        setComplexity('O(log n) - Only works on sorted arrays');
      }
    },
    movingAvg: {
      name: '📈 Moving Average',
      description: 'Technical Analysis for Stock Trends',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      run: () => {
        const prices = inputData.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
        const period = 3;
        
        const startTime = performance.now();
        const ma = movingAverage(prices, period);
        const time = performance.now() - startTime;
        
        setResult({
          prices,
          period,
          movingAverage: ma,
          time: time.toFixed(4)
        });
        setComplexity(`O(n * k) where k is the period (${period})`);
      }
    }
  };

  const handleRun = () => {
    if (algorithms[selectedAlgo]) {
      algorithms[selectedAlgo].run();
    }
  };

  return (
    <div className="algorithm-visualizer">
      <motion.div 
        className="visualizer-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>🧮 Algorithm Visualizer</h2>
        <p>Demonstrate ADA Concepts (Analysis & Design of Algorithms)</p>
      </motion.div>

      <div className="algorithm-selector">
        {Object.entries(algorithms).map(([key, algo]) => (
          <motion.button
            key={key}
            className={`algo-button ${selectedAlgo === key ? 'active' : ''}`}
            onClick={() => setSelectedAlgo(key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3>{algo.name}</h3>
            <p>{algo.description}</p>
            <div className="complexity-badges">
              <span className="badge time">⏱️ {algo.timeComplexity}</span>
              <span className="badge space">💾 {algo.spaceComplexity}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="input-section">
        <h3>Input Data</h3>
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder={selectedAlgo === 'search' ? '12,23,34,45,56|34 (array|target)' : '45,23,67,12,89,34,56'}
          className="data-input"
        />
        <motion.button
          className="run-button"
          onClick={handleRun}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ▶️ Run Algorithm
        </motion.button>
      </div>

      {result && (
        <motion.div 
          className="result-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>📊 Results</h3>
          
          {selectedAlgo === 'sort' && (
            <div className="sort-results">
              <div className="result-row">
                <strong>Original:</strong> [{result.original.join(', ')}]
              </div>
              <div className="result-row">
                <strong>Quick Sort:</strong> [{result.quickSort.join(', ')}]
                <span className="time-badge">{result.quickTime}ms</span>
              </div>
              <div className="result-row">
                <strong>Merge Sort:</strong> [{result.mergeSort.join(', ')}]
                <span className="time-badge">{result.mergeTime}ms</span>
              </div>
            </div>
          )}

          {selectedAlgo === 'search' && (
            <div className="search-results">
              <div className="result-row">
                <strong>Sorted Array:</strong> [{result.array.join(', ')}]
              </div>
              <div className="result-row">
                <strong>Target:</strong> {result.target}
              </div>
              <div className="result-row">
                <strong>Found at Index:</strong> {result.foundAt >= 0 ? result.foundAt : 'Not Found'}
                <span className="time-badge">{result.time}ms</span>
              </div>
              <div className="result-row">
                <strong>Comparisons:</strong> {result.comparisons} (max)
              </div>
            </div>
          )}

          {selectedAlgo === 'movingAvg' && (
            <div className="ma-results">
              <div className="result-row">
                <strong>Prices:</strong> [{result.prices.join(', ')}]
              </div>
              <div className="result-row">
                <strong>MA({result.period}):</strong> [{result.movingAverage.map(v => v.toFixed(2)).join(', ')}]
                <span className="time-badge">{result.time}ms</span>
              </div>
            </div>
          )}

          <div className="complexity-info">
            <strong>Complexity Analysis:</strong> {complexity}
          </div>
        </motion.div>
      )}

      <div className="algorithm-info">
        <h3>📚 Algorithm Details</h3>
        <div className="info-cards">
          <div className="info-card">
            <h4>Sorting Algorithms</h4>
            <ul>
              <li>Quick Sort: Divide & Conquer, Pivot-based</li>
              <li>Merge Sort: Divide & Conquer, Stable sorting</li>
              <li>Use Cases: Ranking stocks, organizing portfolios</li>
            </ul>
          </div>
          <div className="info-card">
            <h4>Search Algorithms</h4>
            <ul>
              <li>Binary Search: O(log n) efficiency</li>
              <li>Requires sorted input</li>
              <li>Use Cases: Finding stocks by price range</li>
            </ul>
          </div>
          <div className="info-card">
            <h4>Technical Analysis</h4>
            <ul>
              <li>Moving Average: Trend identification</li>
              <li>Exponential smoothing</li>
              <li>Use Cases: Stock price prediction</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlgorithmVisualizer;
