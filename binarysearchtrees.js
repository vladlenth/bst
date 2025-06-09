class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  add(data) {
    const node = this.root;
    if (node === null) {
      this.root = new Node(data);
      return;
    } else {
      const searchTree = function (node) {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data);
            return;
          } else {
            return searchTree(node.left);
          }
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data);
            return;
          } else {
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      };
      return searchTree(node);
    }
  }

  findMin() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  find(data) {
    let current = this.root;
    while (current && current.data !== data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current === null) {
        return null;
      }
    }
    return current;
  }

  isPresent(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {
        return true;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  remove(data) {
    const removeNode = function (node, data) {
      if (node == null) return null;

      if (data == node.data) {
        if (!node.left && !node.right) return null;

        if (!node.left) return node.right;

        if (!node.right) return node.left;

        let tempNode = node.right;
        while (tempNode.left !== null) tempNode = tempNode.left;

        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };

    this.root = removeNode(this.root, data);
  }

  isBalanced() {
    return this.findMinHeight() >= this.findMaxHeight() - 1;
  }

  findMinHeight(node = this.root) {
    if (!node) return -1;

    const leftHeight = this.findMinHeight(node.left);
    const rightHeight = this.findMinHeight(node.right);

    return Math.min(leftHeight, rightHeight) + 1;
  }

  findMaxHeight(node = this.root) {
    if (!node) return -1;

    const leftHeight = this.findMaxHeight(node.left);
    const rightHeight = this.findMaxHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  inOrder() {
    if (!this.root) return null;

    const result = [];

    function traverseInOrder(node) {
      if (node.left) {
        traverseInOrder(node.left);
      }
      result.push(node.data);
      if (node.right) {
        traverseInOrder(node.right);
      }
    }

    traverseInOrder(this.root);

    return result;
  }

  preOrder() {
    if (!this.root) return null;
    const result = [];
    function traversePreOrder(node) {
      result.push(node.data);
      if (node.left) {
        traversePreOrder(node.left);
      }
      if (node.right) {
        traversePreOrder(node.right);
      }
    }
    traversePreOrder(this.root);
    return result;
  }

  postOrder() {
    if (!this.root) return null;
    const result = [];
    function traversePostOrder(node) {
      if (node.left) {
        traversePostOrder(node.left);
      }
      if (node.right) {
        traversePostOrder(node.right);
      }
      result.push(node.data);
    }
    traversePostOrder(this.root);
    return result;
  }

  levelOrder() {
    const result = [];
    const Q = [];
    if (this.root !== null) {
      Q.push(this.root);
      while (Q.length > 0) {
        const node = Q.shift();
        result.push(node.data);
        if (node.left) {
          Q.push(node.left);
        }
        if (node.right) {
          Q.push(node.right);
        }
      }
      return result;
    } else {
      return null;
    }
  }

  printTree() {
    const printNode = (node, prefix = "", isLeft = true) => {
      if (node !== null) {
        console.log(prefix + (isLeft ? "├── " : "└── ") + node.data);
        const newPrefix = prefix + (isLeft ? "│   " : "    ");
        printNode(node.left, newPrefix, true);
        printNode(node.right, newPrefix, false);
      }
    };
    if (this.root === null) {
      console.log("Дерево пустое");
    } else {
      console.log(this.root.data);
      printNode(this.root.left, "", true);
      printNode(this.root.right, "", false);
    }
  }

  getTreeWidth() {
    const lines = [];

    const traverse = (node, prefix = "") => {
      if (!node) return;
      lines.push(prefix + node.data);
      traverse(node.left, prefix + "   ");
      traverse(node.right, prefix + "   ");
    };

    traverse(this.root);

    const maxLength = Math.max(...lines.map((line) => line.length));
    return maxLength;
  }

  printTreeCentered() {
    if (!this.root) {
        console.log("Дерево пустое");
        return;
    }

        const termWidth = (typeof process !== 'undefined' && process.stdout && process.stdout.columns) ? process.stdout.columns : 80;

        const levels = [];
        let queue = [{ node: this.root }];

        while (queue.length > 0) {
            const levelSize = queue.length; // Объявляем здесь
            const levelNodes = [];
            let allNull = true;

            for (let i = 0; i < levelSize; i++) {
            const { node } = queue.shift();

            if (node) {
                allNull = false;
                levelNodes.push(node);
                queue.push({ node: node.left });
                queue.push({ node: node.right });
            } else {
                levelNodes.push(null);
                queue.push({ node: null });
                queue.push({ node: null });
            }
            }

            levels.push(levelNodes);

            if (allNull) {
            break;
            }
        }

        for (const level of levels) {
            let line = '';
            const between = '   ';

            for (let i = 0; i < level.length; i++) {
            if (level[i]) {
                line += level[i].data.toString();
            } else {
                line += ' ';
            }
            if (i < level.length - 1) {
                line += between;
            }
            }

            const offset = Math.max(0, Math.floor((termWidth - line.length) / 2));
            console.log(' '.repeat(offset) + line);
        }
    }
}
const bst = new BST();

// first test
// bst.add(50);
// bst.add(30);
// bst.add(70);
// bst.add(20);
// bst.add(40);
// bst.add(60);
// bst.add(80);
// bst.printTree();
// bst.printTreeCentered();


//second test
// bst.add(9);
// bst.add(4);
// bst.add(17);
// bst.add(3);
// bst.add(6);
// bst.add(22);
// bst.add(5);
// bst.add(7);
// bst.add(20);

// console.log(bst.findMinHeight());
// console.log(bst.findMaxHeight());
// console.log(bst.isBalanced());
// bst.add(10);
// console.log(bst.findMinHeight());
// console.log(bst.findMaxHeight());
// console.log(bst.isBalanced());
// console.log('inOrder: ' + bst.inOrder());
// console.log('preOrder: ' + bst.preOrder());
// console.log('postOrder: ' + bst.postOrder());

// console.log('levelOrder: ' + bst.levelOrder());
// bst.printTree();
// bst.printTreeCentered();