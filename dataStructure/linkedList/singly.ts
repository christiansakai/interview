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
 * The implementation here is using null element
 * as the head of the list.
 */
class SinglyLinkedList<T> implements 
  LinkedList<T>, Reduceable, Comparable {

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
  prepend(element: T): void {
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
  append(element: T): void {
    const node = new ListNode<T>(element)

    this._tail._next = node
    this._tail = node

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
        node._next = null

        this._length--

        break
      }
    }


    return node._element
  }

  /**
   * Reverse the list.
   *
   * Time = O(n)
   * Space = O(n)
   */
  reverse(): void {
    if (this._length === 1) return

    const firstNode = this._head._next
    const lastNode = this._tail

    let node = this._head
    let nextNode

    this._doReverse(this._head._next)

    this._head._next = lastNode
    this._tail = firstNode
  }

  /**
   * Helper function to reverse the list.
   *
   * Time = O(1)
   * Space = O(1)
   *
   * @param node ListNode to be modified.
   */
  private _doReverse(node: ListNode<T>): void {
    if (node._next === null) return

    const nextNode = node._next

    this._doReverse(nextNode)

    node._next = null
    nextNode._next = node
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
   * Check whether this list is equal to
   * another list or not
   *
   * @param sll Singly linked list to be compared with
   * @return `true` if yes, `false` otherwise
   */
  equals(sll: SinglyLinkedList<T>): boolean {
    let thisNode = this._head
    let thatNode = sll._head

    while (thisNode._next !== null) {
      if (thisNode._element !== thatNode._element)
        return false

      thisNode = thisNode._next
      thatNode = thatNode._next
    }

    return true
  }
}

export default SinglyLinkedList
