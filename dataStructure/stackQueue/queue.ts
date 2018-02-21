import SinglyLL from '../linkedList/singly'

/**
 * Stack implementation using singly linked list
 */
class Queue<T> {

  /** Linked list to hold data */
  private _list: SinglyLL<T>

  constructor() {
    this._list = new SinglyLL()
  }

  /**
   * Add an element to the end of the queue.
   * 
   * Time = O(1)
   * Space = O(1)
   *
   * @param element Element to be added
   */
  enqueue(element: T): void {
    this._list.append(element)
  }

  /**
   * Remove an element from the front of the queue.
   *
   * Time = O(1)
   * Space = O(1)
   *
   * @return Element to be removed or null 
   *         if the queue is empty.
   */
  dequeue(): T | null {
    return this._list.removeFromHead()
  }

  /**
   * Look at the element at the front of the queue.
   *
   * Time = O(1)
   * Space = -
   *
   * @return Element at the front of the queue or null 
   *         if the queue is empty.
   */
  first(): T | null {
    return this._list.head
  }

  /**
   * Get the size of the queue.
   *
   * Time = O(1)
   * Space = -
   *
   * @return Size of the queue
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

export default Queue
