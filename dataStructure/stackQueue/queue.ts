import DoublyLL from '../linkedList/doubly'

class Queue<T> {

  private _list: DoublyLL<T>

  enqueue(element: T) {
    this._list.append(element)
  }

  dequeue(): T | null {
    return this._list.removeFromHead()
  }

  first(): T | null {
    return this._list.head
  }

  size(): number {
    return this._list.length
  }

  isEmpty(): boolean {
    return this._list.length === 0
  }

}
