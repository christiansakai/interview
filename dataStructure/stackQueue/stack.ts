import SinglyLL from '../linkedList/singly'

class Stack<T> {

  private _list: SinglyLL<T>

  push(element: T) {
    this._list.append(element)
  }

  pop(): T | null {
    return this._list.removeFromTail()
  }

  top(): T | null {
    return this._list.tail
  }

  size(): number {
    return this._list.length
  }

  isEmpty(): boolean {
    return this._list.length === 0
  }
}
