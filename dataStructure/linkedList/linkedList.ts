import SinglyLL from './singly'
import DoublyLL from './doubly'

class LinkedList {
  static createLinkedList(isDoubly: boolean = false): SinglyLL<number> | DoublyLL<number> {
    if (isDoubly)
      return new DoublyLL<number>()

    return new SinglyLL<number>()
  }
}

export default LinkedList
