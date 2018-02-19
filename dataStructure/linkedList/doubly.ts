/**
 * Node to holds the value
 * and pointers to other node.
 */
// TODO: Make into protected/private/nested class
class ListNode<T> {
  
  /** Actual element of the node */
  _element: T 

  /** Pointer to the previous node on the list */
  _prev: ListNode<T>

  /** Pointer to next node on the list */
  _next: ListNode<T>

  /**
   * @param element Element to be held in the node
   */
  constructor(element: T) {
    this._element = element
    this._prev = null
    this._next = null
  }
}

/**
 * Doubly Linked List. 
 * The implementation here is using null element
 * as the head of the list.
 */
class LinkedList<T> {

  /** Head of the list */
  private _head: ListNode<T>

  /** Tail of the list */
  private _tail: ListNode<T>

  /** Length of the list */
  private _length: number

  constructor() {
    const node = new ListNode<T>(null)

    this._head = this._tail = new ListNode<T>(null)
    this._length = 0
  }

  /**
   * Get the length of the list.
   *
   * Time = O(1)
   * Space = -
   *
   * @returns Length of the list
   */
  get length(): number {
    return this._length
  }

  /**
   * Get the first element of the list
   *
   * Time = O(1)
   * Space = -
   */
  get head(): T {
    if (this._length === 0) return null
    return this._head._next._element
  }

  /**
   * Get the last element of the list
   *
   * Time = O(1)
   * Space = -
   */
  get tail(): T {
    if (this._length === 0) return null
    return this._tail._element
  }

  /** 
   * Add element at the beginning of the list.
   *
   * Time = O(1)
   * Space = O(1)
   * 
   * @param element Element to be added
   */
  prepend(element: T) {
    const node = new ListNode<T>(element)

    node._next = this._head._next
    node._prev = this._head
    this._head._next = node

    this._length++
  }

  /**
   * Add element at the end of the list.
   *
   * Time = O(1)
   * Space = O(1)
   *
   * @param element Element to be added
   */
  append(element: T) {
    const node = new ListNode<T>(element)

    const tempNode = this._tail
    this._tail._next = node
    this._tail = node
    this._tail._prev = tempNode

    this._length++
  }

  /**
   * Check whether an element is inside the list.
   *
   * Time = O(n)
   * Space = O(1)
   *
   * @param element Element to be checked
   */
  contains(element: T): boolean {
    let node = this._head

    while (node._next !== null) {
      node = node._next
      if (node._element === element)
        return true
    }

    return false
  }

  /**
   * Remove an element from the head of the list.
   *
   * Time = O(1)
   * Space = O(1)
   *
   * @returns Element to be removed or 
   *          null if the list is empty
   */
  removeFromHead(): T | null {
    if (this._length === 0) return null

    const node = this._head._next
    this._head._next = node._next

    node._prev = null
    node._next = null

    this._length--

    return node._element
  }

  /**
   * Remove an element from the tail of the list.
   *
   * Time = O(1)
   * Space = O(1)
   *
   * @returns Element to be removed or
   *          null if the list is empty
   */
  removeFromTail(): T | null {
    if (this._length === 0) return null

    const node = this._tail

    const prevNode = node._prev
    prevNode._next = null
    this._tail = prevNode

    node._prev = null
    node._next = null

    this._length--

    return node._element
  }

  /**
   * Remove an element from the list.
   * This will remove the first encounter of
   * that element starting from the head of the list.
   *
   * Time = O(n)
   * Space = O(1)
   *
   * @returns Element to be removed or
   *          null if the list is empty
   */
  remove(element: T): T | null {
    if (this._length === 0) return null

    let node = this._head
    let prevNode
    let nextNode

    while (node._next !== null) {
      prevNode = node
      node = node._next
      nextNode = node._next

      if (node._element === element) {
        prevNode._next = nextNode
        nextNode._prev = prevNode
        node._next = null
        node._prev = null

        this._length--

        break
      }
    }

    return node._element
  }

  /**
   * Reduce the linked list into an accumulated value.
   *
   * Time = O(n)
   * Space = O(1)
   *
   * @param func Reducer function
   * @param acc Accumulator value
   * @return Accumulated value
   */
  reduce(func: (acc: any, element: T) => any, acc: any): any {
    let result = acc
    let node = this._head

    while (node._next !== null) {
      node = node._next
      result = func(result, node._element)
    }

    return result
  }

  /**
   * Reverse the list.
   *
   * Time = O(n)
   * Space = O(1)
   */
  reverse() {
    if (this._length === 1) return

    let firstNode = this._head._next
    let lastNode = this._tail

    let node = this._tail
    let prevNode
    let nextNode

    while (node._element !== null) {
      prevNode = node._prev
      nextNode = node._next
      node._prev = nextNode
      node._next = prevNode

      node = node._next
    }

    lastNode._prev = this._head
    this._head._next = lastNode

    firstNode._next = null
    this._tail = firstNode
  }
}

export default LinkedList
