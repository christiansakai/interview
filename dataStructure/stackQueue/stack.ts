import DoublyLL from '../linkedList/doubly'

/**
 * Stack implementation using doubly linked list
 */
class Stack<T> {

  /** Linked list to hold data */
  private _list: DoublyLL<T>

  constructor() {
    this._list = new DoublyLL()
  }

  /**
   * Add an element to the top of the stack.
   * 
   * Time = O(1)
   * Space = O(1)
   *
   * @param element Element to be added
   */
  push(element: T) {
    this._list.append(element)
  }

  /**
   * Remove an element from the top of the stack.
   *
   * Time = O(1)
   * Space = O(1)
   *
   * @return Element to be removed or null 
   *         if the stack is empty.
   */
  pop(): T | null {
    return this._list.removeFromTail()
  }

  /**
   * Look at the element on top of the stack.
   *
   * Time = O(1)
   * Space = -
   *
   * @return Element on top of the stack or null 
   *         if the stack is empty.
   */
  top(): T | null {
    return this._list.tail
  }

  /**
   * Get the size of the stack.
   *
   * Time = O(1)
   * Space = -
   *
   * @return Size of the stack
   */
  size(): number {
    return this._list.length
  }

  /**
   * Check whether the stack is empty or not.
   *
   * @return `true` if the stack is empty, `false` otherwise
   */
  isEmpty(): boolean {
    return this._list.length === 0
  }
}

export default Stack
