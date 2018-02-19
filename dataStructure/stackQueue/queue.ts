import DoublyLL from '../linkedList/doubly'

class Queue<T> {

  private _list: DoublyLL<T>

  constructor() {
    this._list = new DoublyLL()
  }

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

export default Queue

