export { BinaryTree, Node };

class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }

    static isLeaf(node) {
        return node.left == null && node.right == null;
    }

    static isBranch(node) {
        return !Node.isLeaf(node);
    }

    static insert(nodeContructor, duplicateNode, node, key) {
        // If the tree is empty, return a new node
        if (node == null) {
            if (nodeContructor == null) return new Node(key);
            else return nodeContructor(key);
        }
        // Otherwise, recur down the tree
        if (key < node.key) {
            node.left = Node.insert(nodeContructor, duplicateNode, node.left, key);
        } else if (key > node.key) {
            node.right = Node.insert(nodeContructor, duplicateNode, node.right, key);
        } else { // Duplicate keys not allowed
            if (duplicateNode) duplicateNode(node);
        }
        // Return the node pointer
        return node;
    }

    /* The above code is defining a static method called "height" in JavaScript. The method takes a
    parameter called "node" and does not have a return type specified. The purpose and implementation
    of the method are not provided in the code snippet, so it is not possible to determine what the
    code is doing without further context. */
    static height(node) {
        if (!node) return 0;
        const lDepth = Node.height(node.left);
        const rDepth = Node.height(node.right);
        return (lDepth > rDepth ? lDepth : rDepth) + 1;
    }

    /**
     * The function `toArray` converts a tree-like structure into an array by performing an in-order
     * traversal.
     * @param node - The `node` parameter represents the root node of a binary tree.
     * @returns The `toArray` function is returning an array containing the nodes of a binary tree in
     * the order of an in-order traversal.
     */
    static toArray(node) {
        const result = [];
        Node.inOrderTraversal(node, n => result.push(n));
        return result;
    }

    /* The above code is defining a static method called "inOrderTraversal" in JavaScript. This method
    takes two parameters: "node" and "consumer". */
    static inOrderTraversal(node, consumer) {
        if (node === null) return;
        Node.inOrderTraversal(node.left, consumer);
        consumer(node);
        Node.inOrderTraversal(node.right, consumer);
    }

    /* The above code is defining a static method called preOrderTraversal in JavaScript. This method
    takes two parameters: node and consumer. The purpose of this method is to perform a pre-order
    traversal on a tree-like data structure starting from the given node. During the traversal, the
    consumer function is called on each node in the tree. */
    static preOrderTraversal(node, consumer) {
        if (node === null) return;
        consumer(node);
        Node.preOrderTraversal(node.left, consumer);
        Node.preOrderTraversal(node.right, consumer);
    }

    /* The `postOrderTraversal` method in the `Node` class is used to traverse a binary tree in
    post-order fashion. */
    static postOrderTraversal(node, consumer) {
        if (node === null) return;
        Node.postOrderTraversal(node.left, consumer);
        Node.postOrderTraversal(node.right, consumer);
        consumer(node);
    }

    // Given a binary search tree and a key, this function deletes the key and returns the new root
    static delete(node, k) {
        // Base case
        if (node === null) return node;

        // Recursive calls for ancestors of node to be deleted
        if (node.key > k) {
            node.left = Node.delete(node.left, k);
            return node;
        } else if (node.key < k) {
            node.right = Node.delete(node.right, k);
            return node;
        }

        // We reach here when root is the node to be deleted.

        // If one of the children is empty
        if (node.left === null) {
            return node.right;
        } else if (node.right === null) {
            return node.left;
        } else {
            // If both children exist
            let succParent = node;

            // Find successor
            let succ = node.right;
            while (succ.left !== null) {
                succParent = succ;
                succ = succ.left;
            }

            // Delete successor.  Since successor is always left child of its parent we can safely make successor's right right child as left of its parent. If there is no succ, then assign succ.right to succParent.right
            if (succParent !== node) succParent.left = succ.right;
            else succParent.right = succ.right;

            // Copy Successor Data to root
            node.key = succ.key;

            // Delete Successor and return root
            return node;
        }
    }

    /* The `search` method in the `Node` class is used to search for a specific key in a binary
     search tree. It takes the root node of the tree and the key to search for as parameters. */
    static search(node, key) {
        // Base Cases: root is null or key is present at root
        if (node === null) return null;

        if (node.key === key) return node;

        // Key is greater than root's key
        if (node.key < key) return Node.search(node.right, key);

        // Key is smaller than root's key
        return Node.search(node.left, key);
    }
    /* The `balance` method in the `Node` class is used to convert an unbalanced binary search
    tree (BST) into a balanced BST. A balanced BST is a binary tree in which the heights of
    the left and right subtrees of every node differ by at most 1. */
    static balance(root) {
        // Recursive function to construct binary tree
        function $balance(nodes, start, end) {
            if (start > end) return null;

            // Get the middle element and make it root
            let mid = parseInt((start + end) / 2, 10);
            let node = nodes[mid];

            // Using index in Inorder traversal, construct left and right subtress
            node.left = $balance(nodes, start, mid - 1);
            node.right = $balance(nodes, mid + 1, end);

            return node;
        }

        // Store nodes of given BST in sorted order
        const nodes = Node.toArray(root);
        // Constructs BST from nodes[]
        const n = nodes.length;
        return $balance(nodes, 0, n - 1);
    }

    /*
    // MUST BE FUKK BST: isFull() must be true
    //
    // https://www.geeksforgeeks.org/convert-bst-min-heap/
    static toMinHeap(root) {
        let arr = [];
        let i;

        // function for the inorder traversal of the tree so as to store the node values in 'arr' in sorted order
        function BSTToMinHeap_inorderTraversal(node) {
            if (node == null) return;

            // first recur on left subtree
            BSTToMinHeap_inorderTraversal(node.left);

            // then copy the data of the node
            arr.push(node.key);

            // now recur for right subtree
            BSTToMinHeap_inorderTraversal(node.right);
        }

        // utility function to convert the given BST to MIN HEAP
        function convertToMinHeapUtil(node) {
            // vector to store the data of all the nodes of the BST
            i = -1;

            // inorder traversal to populate 'arr'
            BSTToMinHeap_inorderTraversal(node);

            // BST to MIN HEAP conversion
            BSTToMinHeap(node);
        }

        // function to convert the given BST to MIN HEAP performs preorder traversal of the tree
        function BSTToMinHeap(node) {
            if (node == null) return;

            // first copy data at index 'i' of 'arr' to the node
            node.data = arr[++i];

            // then recur on left subtree
            BSTToMinHeap(node.left);

            // now recur on right subtree
            BSTToMinHeap(node.right);
        }

        convertToMinHeapUtil(root);
    }
    */

    /* The `min` function in the `Node` class is used to find the node with the minimum key
    value in a binary search tree. It starts from the given node and recursively traverses
    the left subtree until it reaches the leftmost leaf node, which has the smallest key
    value. It then returns that node. */
    static min(node) {
        if (node.left) return Node.min(node.left);
        return node;
    }

    /* The `max` function in the `Node` class is used to find the node with the maximum key
    value in a binary search tree. It starts from the given node and recursively traverses
    the right subtree until it reaches the rightmost leaf node, which has the largest key
    value. It then returns that node. */
    static max(node) {
        if (node.right) return Node.max(node.right);
        return node;
    }

    /* The `isFull` function in the `Node` class is used to determine whether a binary tree is a
    full binary tree or not. A full binary tree is a binary tree in which every node has
    either 0 or 2 children. */
    static isFull(node) {
        if (node === null) return true;
        if (Node.isLeaf(node)) return true;
        if (node.left != null && node.right != null) return Node.isFull(node.left) && Node.isFull(node.right);
        return false;
    }
}

class BinaryTree {
    constructor(r) {
        if (r) this.root = r;
    }

    /* The `duplicate` method in the `BinaryTree` class is used to create a deep copy of the binary
    tree. It creates a new instance of the `BinaryTree` class and copies all the properties and
    values from the original tree to the duplicate tree. The duplicate tree is then returned. */
    duplicate() {
        let duplicate = JSON.parse(JSON.stringify(this));
        duplicate.__proto__ = BinaryTree.prototype;
        return duplicate;
    }

    /* The `debug` method in the `BinaryTree` class is used to print the binary tree in a formatted and
    readable way. It uses `console.log` to print the tree object as a JSON string with indentation.
    This can be helpful for debugging and understanding the structure of the binary tree. */
    debug() {
        console.log(JSON.stringify(this, (key, value) => {
            if (value) return value
        }, "\t"));
    }

    /* The `insert` method in the `BinaryTree` class is used to insert a new node with a given key into
    the binary tree. It takes the key as a parameter and creates a new node with that key. If the
    tree is empty, the new node becomes the root of the tree. If the tree is not empty, the method
    recursively traverses the tree to find the appropriate position to insert the new node. If the
    key is less than the current node's key, the method continues the traversal in the left subtree.
    If the key is greater than the current node's key, the method continues the traversal in the
    right subtree. If the key is equal to the current node's key, duplicate keys are not allowed and
    the method does nothing. After inserting the new node, the method returns the inserted node. */
    insert(key) {
        let nodeToReturn = null;
        this.root = Node.insert(//
            keyForNewNode => nodeToReturn = new Node(keyForNewNode)//creates a new node and returns it
            , nodeExists => nodeToReturn = nodeExists//node for the key already exists and returns it
            , this.root//
            , key);
        return nodeToReturn;
    }

    /* The `insertMultiple` method in the `BinaryTree` class is used to insert multiple nodes with the
    given keys into the binary tree. It takes an array of keys as a parameter and iterates over each
    key, calling the `insert` method for each key to insert a new node with that key into the binary
    tree. This method allows for the insertion of multiple nodes at once, instead of inserting them
    one by one. */
    insertMultiple(keys) {
        keys.forEach(key => this.insert(key));
    }

    height() {
        return Node.height(this.root);
    }

    toArray() {
        return Node.toArray(this.root);
    }

    delete(key) {
        this.root = Node.delete(this.root, key);
    }

    deleteMultiple(keys) {
        keys.forEach(key => this.delete(key));
    }

    search(key) {
        return Node.search(this.root, key);
    }

    inOrderTraversal(consumer) {
        Node.inOrderTraversal(this.root, consumer);
    }

    preOrderTraversal(consumer) {
        Node.preOrderTraversal(this.root, consumer);
    }

    postOrderTraversal(consumer) {
        Node.postOrderTraversal(this.root, consumer);
    }

    balance() {
        return new BinaryTree(Node.balance(this.root));
    }

    min() {
        return Node.min(this.root);
    }

    max() {
        return Node.max(this.root);
    }

    isFull() {
        return Node.isFull(this.root);
    }
}