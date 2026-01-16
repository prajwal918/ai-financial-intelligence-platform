// ✅ ALGORITHMS & DATA ANALYSIS (ADA)

// 1. SORTING ALGORITHMS

// Quick Sort (Divide & Conquer)
export function quickSort(arr, key = null) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(item => {
    const val = key ? item[key] : item;
    const pivotVal = key ? pivot[key] : pivot;
    return val < pivotVal;
  });
  const middle = arr.filter(item => {
    const val = key ? item[key] : item;
    const pivotVal = key ? pivot[key] : pivot;
    return val === pivotVal;
  });
  const right = arr.filter(item => {
    const val = key ? item[key] : item;
    const pivotVal = key ? pivot[key] : pivot;
    return val > pivotVal;
  });
  
  return [...quickSort(left, key), ...middle, ...quickSort(right, key)];
}

// Merge Sort (Divide & Conquer)
export function mergeSort(arr, key = null) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), key);
  const right = mergeSort(arr.slice(mid), key);
  
  return merge(left, right, key);
}

function merge(left, right, key) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    const leftVal = key ? left[i][key] : left[i];
    const rightVal = key ? right[j][key] : right[j];
    
    if (leftVal < rightVal) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// 2. SEARCHING ALGORITHMS

// Binary Search (O(log n))
export function binarySearch(arr, target, key = null) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midVal = key ? arr[mid][key] : arr[mid];
    
    if (midVal === target) return mid;
    if (midVal < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}

// Linear Search (O(n))
export function linearSearch(arr, target, key = null) {
  for (let i = 0; i < arr.length; i++) {
    const val = key ? arr[i][key] : arr[i];
    if (val === target) return i;
  }
  return -1;
}

// 3. DYNAMIC PROGRAMMING

// Knapsack Problem (Portfolio Optimization)
export function knapsack(items, capacity) {
  const n = items.length;
  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (items[i - 1].weight <= w) {
        dp[i][w] = Math.max(
          items[i - 1].value + dp[i - 1][w - items[i - 1].weight],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  
  return dp[n][capacity];
}

// Fibonacci (with memoization)
export function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

// 4. GREEDY ALGORITHMS

// Activity Selection (Trade Execution Optimization)
export function activitySelection(activities) {
  // Sort by finish time
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

// Fractional Knapsack (Risk-Reward Optimization)
export function fractionalKnapsack(items, capacity) {
  // Sort by value/weight ratio
  const sorted = [...items].sort((a, b) => 
    (b.value / b.weight) - (a.value / a.weight)
  );
  
  let totalValue = 0;
  let remainingCapacity = capacity;
  const selected = [];
  
  for (const item of sorted) {
    if (remainingCapacity >= item.weight) {
      selected.push({ ...item, fraction: 1 });
      totalValue += item.value;
      remainingCapacity -= item.weight;
    } else if (remainingCapacity > 0) {
      const fraction = remainingCapacity / item.weight;
      selected.push({ ...item, fraction });
      totalValue += item.value * fraction;
      remainingCapacity = 0;
      break;
    }
  }
  
  return { totalValue, selected };
}

// 5. GRAPH ALGORITHMS

// Dijkstra's Algorithm (Shortest Path)
export function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const previous = {};
  
  // Initialize distances
  for (const vertex of graph.keys()) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;
  
  while (visited.size < graph.size) {
    // Find unvisited vertex with minimum distance
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
    
    // Update distances to neighbors
    const neighbors = graph.get(minVertex) || [];
    for (const neighbor of neighbors) {
      const distance = distances[minVertex] + neighbor.weight;
      if (distance < distances[neighbor.node]) {
        distances[neighbor.node] = distance;
        previous[neighbor.node] = minVertex;
      }
    }
  }
  
  return { distances, previous };
}

// 6. ANALYSIS ALGORITHMS

// Moving Average (Technical Analysis)
export function movingAverage(data, period) {
  const result = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    result.push(sum / period);
  }
  return result;
}

// Standard Deviation (Volatility Analysis)
export function standardDeviation(values) {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
  return Math.sqrt(variance);
}

// Sentiment Score Aggregation
export function aggregateSentiment(sentiments) {
  if (sentiments.length === 0) return 0;
  
  // Weighted average with recency bias
  let weightedSum = 0;
  let totalWeight = 0;
  
  sentiments.forEach((sentiment, index) => {
    const weight = Math.exp(-0.1 * (sentiments.length - index - 1)); // Exponential decay
    weightedSum += sentiment * weight;
    totalWeight += weight;
  });
  
  return weightedSum / totalWeight;
}
