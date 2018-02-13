import SinglyLinkedList from './singlyLinkedList'

describe('SinglyLinkedList', () => {
  test('can add an element', () => {
    const list = new SinglyLinkedList<number>()

    expect(list.length).toBe(0)

    list.append(10)
    expect(list.length).toBe(1)

    list.append(11)
    expect(list.length).toBe(2)
  })

  test('can remove an element', () => {
    const list = new SinglyLinkedList<number>()

    list.append(10)
    list.append(11)
    list.append(12)
    list.append(13)

    let el

    el = list.remove(11)
    expect(el).toBe(11)
    expect(list.length).toBe(3)

    el = list.remove(13)
    expect(el).toBe(13)
    expect(list.length).toBe(2)
  })
})
