interface BinaryTree<T> {
  add:        (element: T) => void
  remove:     (element: T) => T | null,
  contains:   (element: T) => boolean, 
  inOrder:    (func: (acc: any, element: T) => any, acc: any) => any,
  preOrder:   (func: (acc: any, element: T) => any, acc: any) => any,
  postOrder:  (func: (acc: any, element: T) => any, acc: any) => any
}
