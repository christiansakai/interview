// TODO: Make into protected/private/nested class
class ListNode<T> {
  _element: T 
  _next: ListNode<T>

  constructor(element: T) {
    this._element = element
    this._next = null
  }
}

class SinglyLinkedList<T> {
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

  append(element: T) {
    const newNode = new ListNode<T>(element)

    this._tail._next = newNode
    this._tail = newNode

    this._length++
  }

  remove(element: T): T {
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

export default SinglyLinkedList
