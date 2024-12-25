const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	constructor() {
		this._root = null;
	}
	root() {
		return this._root;
	}

	add(data) {
		if (!data) return;
		const newNode = new Node(data);
		if (!this._root) {
			this._root = newNode;
			console.log(this._root);
			return this;
		}

		const addNode = (current, node) => {
			if (node.data < current.data) {
				if (!current.left) {
					current.left = node;
					console.log(current.left);
				} else {
					addNode(current.left, node);
				}
			} else if (node.data > current.data) {
				if (!current.right) {
					current.right = node;
					console.log(current.right);
				} else {
					addNode(current.right, node);
				}
			}
		};
		addNode(this._root, newNode);
		return this;
	}

	has(data) {
		if (!data || !this._root) return;
		const isHas = (current, _data) => {
			if (!current) return false;
			if (current.data === _data) return true;
			if (_data > current.data) {
				return isHas(current.right, _data);
			}
			return isHas(current.left, _data);
		};
		return isHas(this._root, data);
	}

	find(data) {
		if (!data || !this._root) return null;
		const findData = (current, _data) => {
			if (!current) return null;
			if (current.data === _data) return current;
			if (_data > current.data) return findData(current.right, _data);
			if (_data < current.data) return findData(current.left, _data);
		};
		return findData(this._root, data);
	}

	remove(data) {
    if (!this._root || !data) return;

    const findMin = (current) => {
      while(current.left) {
        current = current.left;
      }
      return current.data;
    }

    const removeData = (current, _data) => {
      if (!current) return null;
    
			if (_data < current.data) current.left =  removeData(current.left, _data);
      if (_data > current.data) current.right =  removeData(current.right, _data);
      if (_data === current.data) {
        if (!current.left && !current.right) return null;
        if (!current.left) return current.right;
        if (!current.right) return current.left;

        if(current.left && current.right) {
          const minRightItem = findMin(current.right);
          current.data = minRightItem;
          current.right = removeData(current.right, minRightItem);
        }
      }
      return current;
    }
    return removeData(this._root, data);
	}

	min() {
    if (!this._root) return null;
    
		const findMin = current => {
			while (current.left) {
				current = current.left;
			}
			return current.data;
		};

		return findMin(this._root);
	}

	max() {
		if (!this._root) return null;

		const findMax = current => {
			while (current.right) {
				current = current.right;
			}
			return current.data;
		};
		return findMax(this._root);
	}
}

module.exports = {
	BinarySearchTree,
};