class Node {
  constructor() {
    this.left = null;
    this.right = null;
  }
}

class TreeNode extends Node {
  constructor(value) {
    super();
    this.value = value;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
    this.directions = {
      left: "left",
      right: "right"
    };
    this.dataTypes = {
      array: "array",
      string: "string"
    };
  }
  // public methods
  add(value) {
    if (!this.root) return this._appendRoot(value);
    this._recursiveAppend(this.root, value);
  }

  find(num) {
    const searchResult = this._findValueInTree(this.root, num);
    const { found, stepCounter } = searchResult;
    return found
      ? `Steps to find: ${stepCounter}`
      : `Not found. Steps done: ${stepCounter}`;
  }

  remove(num) {
    const result = this._removeNode(num, this.root);
    return result
      ? `${num} successfully removed`
      : `Unable to remove. There is no such value in tree`;
  }

  displayInString() {
    return this._recursiveCombineToDataStructure(
      this.root,
      this.dataTypes.string
    );
  }

  displayInArray() {
    return this._recursiveCombineToDataStructure(
      this.root,
      this.dataTypes.array
    );
  }

  // private methods
  // appending nodes methods
  _appendRoot(value) {
    this.root = new TreeNode(value);
  }

  _appendChildNode(parentNode, value, side) {
    parentNode[side] = new TreeNode(value);
  }

  _recursiveAppend(node, value) {
    const { value: rootValue, left: rootLeft, right: rootRight } = node;

    if (value < rootValue) {
      if (!rootLeft)
        return this._appendChildNode(node, value, this.directions.left);
      this._recursiveAppend(rootLeft, value);
    }

    if (value >= rootValue) {
      if (!rootRight)
        return this._appendChildNode(node, value, this.directions.right);
      this._recursiveAppend(rootRight, value);
    }
  }

  // string and array presentation methods
  _createDataObjDependingOnType(type) {
    const { array, string } = this.dataTypes;
    switch (type) {
      case array:
        return [];
      case string:
        return "";
      default:
        return null;
    }
  }

  _recursiveCombineToDataStructure(node, dataStorageType) {
    let dataStorage = this._createDataObjDependingOnType(dataStorageType);

    function placeNewNode(node) {
      if (node.left) placeNewNode(node.left);

      if (Array.isArray(dataStorage)) dataStorage.push(node.value);
      if (typeof dataStorage === "string") {
        dataStorage += ` ${node.value} `;
      }

      if (node.right) placeNewNode(node.right);

      return dataStorage;
    }
    return placeNewNode(node);
  }

  // binary tree search
  _findValueInTree(startNode, value) {
    let stepCounter = 0;
    const { left: leftDir, right: rightDir } = this.directions;
    function search(node, val) {
      stepCounter++;
      if (val === node.value) {
        return { found: true, stepCounter };
      }

      const direction = val > node.value ? rightDir : leftDir;

      if (!node[direction]) return { found: false, stepCounter };
      return search(node[direction], val);
    }

    return search(startNode, value);
  }

  // removing nodes from tree methods
  _findBottomOfTree(node, direction) {
    function goToBottom(treeNode) {
      if (treeNode[direction]) {
        return goToBottom(treeNode[direction], treeNode);
      }
      return treeNode;
    }
    return goToBottom(node);
  }

  _replaceChildrenPointers(node, parentNode, parentPointer) {
    if (!node.left && !node.right) {
      parentNode[parentPointer] = null;
      return true;
    }
    if (!node.left) {
      parentNode[parentPointer] = node.right;
      return true;
    }
    if (!node.right) {
      parentNode[parentPointer] = node.left;
      return true;
    }

    parentNode[parentPointer] = node.right;
    const bottomLeftNode = this._findBottomOfTree(
      node.right,
      this.directions.left
    );
    bottomLeftNode.left = node.left;
    return true;
  }

  _removeRoot() {
    if (!this.root.left && !this.root.right) {
      this.root = null;
      return true;
    }
    if (!this.root.right) {
      this.root = this.root.left;
      return true;
    }
    if (!this.root.left) {
      this.root = this.root.right;
      return true;
    }
    const bufferNode = this.root.left;
    this.root = this.root.right;
    const bottomLeftNode = this._findBottomOfTree(
      this.root,
      this.directions.left
    );
    bottomLeftNode.left = bufferNode;
    return true;
  }

  _removeNode(value, node, parentNode = null, parentPointer = null) {
    if (value === node.value) {
      if (!parentNode) return this._removeRoot();
      return this._replaceChildrenPointers(node, parentNode, parentPointer);
    }
    if (value < node.value)
      return this._removeNode(value, node.left, node, this.directions.left);
    if (value > node.value)
      return this._removeNode(value, node.right, node, this.directions.right);
  }
}

const tree = new BinaryTree();

tree.add(15);
tree.add(4);
tree.add(6);
tree.add(70);
tree.add(34);
tree.add(89);
tree.add(2);

// tests using console
console.log("STRING ", tree.displayInString()); //output: 'STRING   2  4  6  15  34  70  89'
console.log("ARRAY", tree.displayInArray()); //output: 'ARRAY [ 2, 4, 6, 15, 34, 70, 89 ]'

console.log(tree.find(4)); // output: 'Steps to find: 2'

console.log("REMOVE", tree.remove(4));
console.log("REMOVE", tree.remove(15));
console.log("REMOVE", tree.remove(70));

tree.add(10);

console.log("STRING ", tree.displayInString());
console.log("ARRAY", tree.displayInArray());

console.log(tree.find(2));
