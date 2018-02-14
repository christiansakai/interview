/**
 * Node to holds the value
 * and pointers to other node.
 */
// TODO: Make into protected/private/nested class
class ListNode<T> {
  
  /** Actual element of the node */
  _element: T 

  /** Pointer to next node on the list */
  _next: ListNode<T>

  /**
   * @param element Element to be held in the node
   */
  constructor(element: T) {
    this._element = element
    this._next = null
  }
}

/**
 * Singly Linked List.
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
   * Space = O(1)
   *
   * @returns Length of the list
   */
  get length(): number {
    return this._length
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

    this._tail._next = node
    this._tail = node

    this._length++
  }

  /**
   * Check whether an element is inside the list.
   *
   * Time = O(n)
   * Space = O(n)
   *
   * @param element Element to be checked
   */
  isMember(element: T): boolean {
    let result = this.iterate((el) => el === element)

    for (let i = 0; i < result.length; i++) {
      if (result[i] === true) return true
    }

    return false
  }

  /**
   * Iterate over the elements in the list.
   *
   * Time = O(n)
   * Space = O(n)
   *
   * @param func Function to be applied per element in the list
   */
  iterate(func: (element: T) => any): Array<any> {
    const result = new Array<any>(this._length)

    let node = this._head
    let i = 0

    while (node._next !== null) {
      node = node._next
      result[i] = func(node._element)
      i++
    }

    return result
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
    node._next = null

    this._length--

    return node._element
  }

  /**
   * Remove an element from the tail of the list.
   *
   * Time = O(n)
   * Space = O(1)
   *
   * @returns Element to be removed or
   *          null if the list is empty
   */
  removeFromTail(): T | null {
    if (this._length === 0) return null

    let node = this._head
    let prevNode
    let nextNode

    while (node._next !== null) {
      prevNode = node
      node = node._next
      nextNode = node._next
    }

    this._tail = prevNode
    this._tail._next = null

    this._length--

    return node._element
  }

  /**
   * Remove an element from the list.
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
        node._next = null

        break
      }
    }

    this._length--

    return node._element
  }
}

export default LinkedList
