class TreeNode<T> {
  _element: T

  _left: TreeNode<T>

  _right: TreeNode<T>

  constructor(element: T = null) {
    this._element = element
    this._left = null
    this._right = null
  }
}

class BST<T> implements BinaryTree<T> {

  private _root: TreeNode<T>

  private _size: number

  constructor() {
    this._root = null
    this._size = 0
  }

  get root(): T | null {
    if (this._root === null) return null

    return this._root._element
  }

  get size(): number {
    return this._size
  }

  add(element: T): void {
    this._root = this._doAdd(this._root, element)
  }

  remove(element: T): T | null {
    return this._doRemove(this._root, element)
  }

  contains(element: T): boolean {
    return this._find(this._root, element) !== null
  }

  inOrder(func: (acc: any, element: T) => any, acc: any): any {
  }
  
  preOrder(func: (acc: any, element: T) => any, acc: any): any {
  }

  postOrder(func: (acc: any, element: T) => any, acc: any): any {
  }

  private _doAdd(node: TreeNode<T>, element: T): TreeNode<T> {
    if (node === null) {
      this._size++
      return new TreeNode(element)
    }

    if (node._element < element) {
      node._left = this._doAdd(node._left, element)
    } else {
      node._right = this._doAdd(node._right, element)
    }

    return node
  }

  private _doRemove(node: TreeNode<T>, element: T): T | null {
    if (node === null) return null

    if (node._element < element) {
      return this
        ._doRemoveWithChildren(node, 'left', node._left, element)
    } else {
      return this
        ._doRemoveWithChildren(node, 'right', node._right, element)
    }
  }

  private _doRemoveWithChildren(
    parentNode: TreeNode<T>, 
    relationBetweenParentAndNode: 'left' | 'right',
    node: TreeNode<T>, 
    element: T,
  ): T | null {
    if (node._element === element) {
      const nodeHasChildOn = this._nodeHasChild(node)

      switch (nodeHasChildOn) {
        // Case 2 - Node has one child
        // * remove the node
        // * point parent to child
        case 'left': 
          if (relationBetweenParentAndNode === 'left')
            parentNode._left = node._left
          else
            parentNode._right = node._left

          break

        case 'right':
          if (relationBetweenParentAndNode === 'left')
            parentNode._left = node._right
          else
            parentNode._right = node._right

          break

        // Case 3 - Node has two children
        // * if we want to replace it with the next smallest
        //   * look at the next smallest value by
        //     by going to the left branch then
        //     continue all the way to the right until
        //     you encounter the leftmost leaf
        // * if we want to replace it with the next biggest
        //   * look at the next biggest value
        //     by going to the right branch then 
        //     continue all the way to the left until
        //     you encounter the leftmost leaf
        // 
        // * make this leaf replace the node 
        //   by pointing this leaf's left to the 
        //   node's left and this leaf's right to the
        //   node's right
        // * point parent to this leaf
        case 'both':
          // Choose next smallest node
          const nextSmallestNode = this._findNextSmallestNode(node)

          nextSmallestNode._left = node._left
          nextSmallestNode._right = node._right

          if (relationBetweenParentAndNode === 'left')
            parentNode._left = nextSmallestNode
          else
            parentNode._right = nextSmallestNode
          
          break

        // Case 1 - Node is a leaf (does not have children)
        // * remove the node
        default:
          if (relationBetweenParentAndNode === 'left')
            parentNode._left = null
          else
            parentNode._right = null
      }

      this._size--

      return node._element
    } else {
      return null
    }
  }

  private _nodeHasChild(node: TreeNode<T>): 'left' 
                                          | 'right' 
                                          | 'both' 
                                          | 'none' {
    if (node._left !== null &&
        node._right !== null) return 'both'

    if (node._left !== null &&
        node._right === null) return 'left'

    if (node._left === null && 
        node._right !== null) return 'right'

    return 'none'
  }

  private _findNextBiggestNode(node: TreeNode<T>): TreeNode<T> {
    let foundNode = node._right

    while (node._left !== null) {
      node = node._left
    }

    return foundNode
  }

  private _findNextSmallestNode(node: TreeNode<T>): TreeNode<T> {
    let foundNode = node._left

    while (node._right !== null) {
      node = node._right
    }

    return foundNode
  }

  private _find(node: TreeNode<T>, element: T): TreeNode<T> | null {
    if (node === null) return null

    if (node._element === element) {
      return node
    } else if (node._element < element) {
      return this._find(node._left, element)
    } else {
      return this._find(node._right, element)
    }
  }
}


export default BST
