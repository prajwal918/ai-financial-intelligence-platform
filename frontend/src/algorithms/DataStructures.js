// ✅ DATA STRUCTURES FROM SCRATCH

// 1. BINARY SEARCH TREE (BST) for Stock Storage
class TreeNode {
  constructor(symbol, price) {
    this.symbol = symbol;
    this.price = price;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(symbol, price) {
    const newNode = new TreeNode(symbol, price);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    
    let current = this.root;
    while (true) {
      if (price < current.price) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  search(targetPrice) {
    return this._searchNode(this.root, targetPrice);
  }

  _searchNode(node, targetPrice) {
    if (!node) return null;
    if (node.price === targetPrice) return node;
    if (targetPrice < node.price) return this._searchNode(node.left, targetPrice);
    return this._searchNode(node.right, targetPrice);
  }

  inorderTraversal() {
    const result = [];
    this._inorder(this.root, result);
    return result;
  }

  _inorder(node, result) {
    if (node) {
      this._inorder(node.left, result);
      result.push({ symbol: node.symbol, price: node.price });
      this._inorder(node.right, result);
    }
  }
}

// 2. MIN-HEAP for Priority Trading Queue
export class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(priority, data) {
    this.heap.push({ priority, data });
    this._heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown(0);
    return min;
  }

  _heapifyUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].priority >= this.heap[parentIndex].priority) break;
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  _heapifyDown(index) {
    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (leftChild < this.heap.length && this.heap[leftChild].priority < this.heap[smallest].priority) {
        smallest = leftChild;
      }
      if (rightChild < this.heap.length && this.heap[rightChild].priority < this.heap[smallest].priority) {
        smallest = rightChild;
      }
      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }

  getAll() {
    return [...this.heap];
  }
}

// 3. GRAPH for Asset Correlation Analysis
export class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1, vertex2, weight) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    this.adjacencyList.get(vertex1).push({ node: vertex2, weight });
    this.adjacencyList.get(vertex2).push({ node: vertex1, weight });
  }

  bfs(start) {
    const visited = new Set();
    const queue = [start];
    const result = [];

    visited.add(start);

    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);

      const neighbors = this.adjacencyList.get(vertex) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor.node)) {
          visited.add(neighbor.node);
          queue.push(neighbor.node);
        }
      }
    }

    return result;
  }

  dfs(start) {
    const visited = new Set();
    const result = [];
    this._dfsHelper(start, visited, result);
    return result;
  }

  _dfsHelper(vertex, visited, result) {
    visited.add(vertex);
    result.push(vertex);

    const neighbors = this.adjacencyList.get(vertex) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.node)) {
        this._dfsHelper(neighbor.node, visited, result);
      }
    }
  }

  getEdges() {
    const edges = [];
    for (const [vertex, neighbors] of this.adjacencyList) {
      for (const neighbor of neighbors) {
        edges.push({ from: vertex, to: neighbor.node, weight: neighbor.weight });
      }
    }
    return edges;
  }
}

// 4. STACK for Undo/Redo Operations
export class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  getAll() {
    return [...this.items];
  }
}

// 5. QUEUE for Trade Order Processing
export class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  getAll() {
    return [...this.items];
  }
}
