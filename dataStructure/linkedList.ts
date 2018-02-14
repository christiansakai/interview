// TODO: Make into protected/private/nested class
class ListNode<T> {
  _element: T 
  _next: ListNode<T>

  constructor(element: T) {
    this._element = element
    this._next = null
  }
}

class LinkedList<T> {
  private _head: ListNode<T>
  private _tail: ListNode<T>
  private _length: number

  constructor() {
    const node = new ListNode<T>(null)

    this._head = this._tail = new ListNode<T>(null)
    this._length = 0
  }

  get length(): number {
    return this._length
  }

  prepend(element: T) {
    const node = new ListNode<T>(element)

    node._next = this._head._next
    this._head._next = node

    this._length++
  }

  append(element: T) {
    const node = new ListNode<T>(element)

    this._tail._next = node
    this._tail = node

    this._length++
  }

  removeFromHead(): T | null {
    if (this._length === 0) return null

    const node = this._head._next
    this._head._next = node._next
    node._next = null

    this._length--

    return node._element
  }

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
        break
      }
    }

    this._length--

    return node._element
  }
}

export default LinkedList
