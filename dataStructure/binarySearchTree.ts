// TODO: Make into protected/private/nested class
class TreeNode<T> {
  _element: T
  _left: TreeNode<T>
  _right: TreeNode<T>

  constructor(element: T) {
    this._element = element
    this._left = null
    this._right = null
  }
}

class BinarySearchTree<T> {
}

export default BinarySearchTree
