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

    if (this._length === 0) {
      this._head._next = newNode
      this._tail = newNode
    } else {
      this._tail._next = newNode
      this._tail = newNode
    }

    this._length++
  }

  remove(element: T): T {
    let node = this._head

    while (node._next !== null) {
      node = node._next

      if (node._element === element) {
        const nextNode = node._next
      }

    }

  }



}

export default SinglyLinkedList
