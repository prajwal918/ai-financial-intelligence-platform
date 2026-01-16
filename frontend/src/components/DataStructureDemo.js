import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BinarySearchTree, MinHeap, Graph, Stack, Queue } from '../algorithms/DataStructures';
import './DataStructureDemo.css';

function DataStructureDemo() {
  const [selectedDS, setSelectedDS] = useState('bst');
  const [bst] = useState(new BinarySearchTree());
  const [heap] = useState(new MinHeap());
  const [graph] = useState(new Graph());
  const [stack] = useState(new Stack());
  const [queue] = useState(new Queue());
  const [output, setOutput] = useState(null);
  const [input, setInput] = useState('');

  const dataStructures = {
    bst: {
      name: '🌳 Binary Search Tree',
      description: 'Hierarchical data structure for efficient search',
      operations: ['Insert', 'Search', 'Inorder Traversal'],
      complexity: 'O(log n) average, O(n) worst',
      useCase: 'Stock price indexing and fast lookups'
    },
    heap: {
      name: '📊 Min Heap',
      description: 'Priority queue for trade execution',
      operations: ['Insert', 'Extract Min', 'View All'],
      complexity: 'O(log n) insert/extract',
      useCase: 'Priority-based trade order management'
    },
    graph: {
      name: '🕸️ Graph',
      description: 'Network structure for asset correlations',
      operations: ['Add Edge', 'BFS', 'DFS'],
      complexity: 'O(V + E) for traversal',
      useCase: 'Asset correlation and portfolio diversification'
    },
    stack: {
      name: '📚 Stack',
      description: 'LIFO data structure',
      operations: ['Push', 'Pop', 'View All'],
      complexity: 'O(1) push/pop',
      useCase: 'Undo/Redo operations in trading'
    },
    queue: {
      name: '🚶 Queue',
      description: 'FIFO data structure',
      operations: ['Enqueue', 'Dequeue', 'View All'],
      complexity: 'O(1) enqueue/dequeue',
      useCase: 'Order processing system'
    }
  };

  const handleOperation = (operation) => {
    const [symbol, value] = input.split(',').map(s => s.trim());
    
    try {
      switch(selectedDS) {
        case 'bst':
          if (operation === 'Insert') {
            bst.insert(symbol || 'AAPL', parseFloat(value) || Math.random() * 1000);
            setOutput({ type: 'success', message: `Inserted ${symbol || 'AAPL'} at $${value || '?'}` });
          } else if (operation === 'Search') {
            const result = bst.search(parseFloat(value));
            setOutput({ type: 'info', message: `Search for $${value}: ${result ? `Found ${result.symbol}` : 'Not Found'}` });
          } else if (operation === 'Inorder Traversal') {
            const sorted = bst.inorderTraversal();
            setOutput({ type: 'data', data: sorted, message: 'In-order traversal (sorted by price)' });
          }
          break;

        case 'heap':
          if (operation === 'Insert') {
            const priority = parseFloat(value) || Math.random() * 100;
            heap.insert(priority, symbol || 'Trade');
            setOutput({ type: 'success', message: `Inserted ${symbol || 'Trade'} with priority ${priority.toFixed(2)}` });
          } else if (operation === 'Extract Min') {
            const min = heap.extractMin();
            setOutput({ type: 'info', message: min ? `Extracted: ${min.data} (priority: ${min.priority})` : 'Heap is empty' });
          } else if (operation === 'View All') {
            const all = heap.getAll();
            setOutput({ type: 'data', data: all, message: 'Current heap state' });
          }
          break;

        case 'graph':
          if (operation === 'Add Edge') {
            const [v1, v2, weight] = input.split(',').map(s => s.trim());
            graph.addEdge(v1 || 'USD', v2 || 'EUR', parseFloat(weight) || 0.5);
            setOutput({ type: 'success', message: `Added edge: ${v1 || 'USD'} ↔ ${v2 || 'EUR'} (weight: ${weight || 0.5})` });
          } else if (operation === 'BFS') {
            const result = graph.bfs(symbol || 'USD');
            setOutput({ type: 'data', data: result, message: `BFS traversal from ${symbol || 'USD'}` });
          } else if (operation === 'DFS') {
            const result = graph.dfs(symbol || 'USD');
            setOutput({ type: 'data', data: result, message: `DFS traversal from ${symbol || 'USD'}` });
          }
          break;

        case 'stack':
          if (operation === 'Push') {
            stack.push(input || 'Action');
            setOutput({ type: 'success', message: `Pushed: ${input || 'Action'}` });
          } else if (operation === 'Pop') {
            const item = stack.pop();
            setOutput({ type: 'info', message: item ? `Popped: ${item}` : 'Stack is empty' });
          } else if (operation === 'View All') {
            const all = stack.getAll();
            setOutput({ type: 'data', data: all, message: 'Current stack (top to bottom)' });
          }
          break;

        case 'queue':
          if (operation === 'Enqueue') {
            queue.enqueue(input || 'Order');
            setOutput({ type: 'success', message: `Enqueued: ${input || 'Order'}` });
          } else if (operation === 'Dequeue') {
            const item = queue.dequeue();
            setOutput({ type: 'info', message: item ? `Dequeued: ${item}` : 'Queue is empty' });
          } else if (operation === 'View All') {
            const all = queue.getAll();
            setOutput({ type: 'data', data: all, message: 'Current queue (front to back)' });
          }
          break;

        default:
          break;
      }
    } catch (error) {
      setOutput({ type: 'error', message: `Error: ${error.message}` });
    }
  };

  return (
    <div className="data-structure-demo">
      <motion.div 
        className="demo-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>🌳 Data Structures Visualizer</h2>
        <p>Interactive demonstration of core CS data structures</p>
      </motion.div>

      <div className="ds-selector">
        {Object.entries(dataStructures).map(([key, ds]) => (
          <motion.button
            key={key}
            className={`ds-button ${selectedDS === key ? 'active' : ''}`}
            onClick={() => setSelectedDS(key)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <h3>{ds.name}</h3>
            <p>{ds.description}</p>
            <div className="ds-info">
              <span className="complexity">⚡ {ds.complexity}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="operation-panel">
        <h3>Operations</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={selectedDS === 'bst' ? 'symbol,price (e.g., AAPL,150)' : 
                      selectedDS === 'graph' ? 'vertex1,vertex2,weight' : 
                      'value'}
          className="operation-input"
        />
        <div className="operation-buttons">
          {dataStructures[selectedDS].operations.map((op) => (
            <motion.button
              key={op}
              className="operation-btn"
              onClick={() => handleOperation(op)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {op}
            </motion.button>
          ))}
        </div>
      </div>

      {output && (
        <motion.div 
          className={`output-section ${output.type}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>📤 Output</h3>
          <div className="output-content">
            <p>{output.message}</p>
            {output.data && (
              <pre className="output-data">
                {JSON.stringify(output.data, null, 2)}
              </pre>
            )}
          </div>
        </motion.div>
      )}

      <div className="use-case-section">
        <h3>💼 Real-world Use Cases</h3>
        <div className="use-case-card">
          <strong>{dataStructures[selectedDS].name}:</strong>
          <p>{dataStructures[selectedDS].useCase}</p>
        </div>
      </div>
    </div>
  );
}

export default DataStructureDemo;
