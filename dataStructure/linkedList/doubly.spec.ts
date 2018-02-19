import DoublyLL from './doubly'

describe('Doubly Linked List', () => {
  test('can append an element', () => {
    const list = new DoublyLL()
    expect(list.length).toBe(0)

    list.append(10)
    expect(list.tail).toBe(10)
    expect(list.contains(10)).toBe(true)

    expect(list.length).toBe(1)

    list.append(11)
    expect(list.tail).toBe(11)
    expect(list.contains(10)).toBe(true)
    expect(list.contains(11)).toBe(true)
    expect(list.length).toBe(2)
  })

  test('can prepend an element', () => {
    const list = new DoublyLL()
    expect(list.length).toBe(0)

    list.prepend(10)
    expect(list.head).toBe(10)
    expect(list.contains(10)).toBe(true)
    expect(list.length).toBe(1)

    list.prepend(11)
    expect(list.head).toBe(11)
    expect(list.contains(10)).toBe(true)
    expect(list.contains(11)).toBe(true)
    expect(list.length).toBe(2)
  })

  test('can remove from head', () => {
    const list = new DoublyLL()

    list.append(10)
    list.append(11)
    list.append(12)
    list.append(13)

    let el

    el = list.removeFromHead()
    expect(el).toBe(10)
    expect(list.contains(10)).toBe(false)
    expect(list.length).toBe(3)

    el = list.removeFromHead()
    expect(el).toBe(11)
    expect(list.contains(11)).toBe(false)
    expect(list.length).toBe(2)

    el = list.removeFromHead()
    expect(el).toBe(12)
    expect(list.contains(12)).toBe(false)
    expect(list.length).toBe(1)

    el = list.removeFromHead()
    expect(el).toBe(13)
    expect(list.contains(13)).toBe(false)
    expect(list.length).toBe(0)
  })

  test('can remove from tail', () => {
    const list = new DoublyLL()

    list.append(10)
    list.append(11)
    list.append(12)
    list.append(13)

    let el

    el = list.removeFromTail()
    expect(el).toBe(13)
    expect(list.contains(13)).toBe(false)
    expect(list.length).toBe(3)

    el = list.removeFromTail()
    expect(el).toBe(12)
    expect(list.contains(12)).toBe(false)
    expect(list.length).toBe(2)

    el = list.removeFromTail()
    expect(el).toBe(11)
    expect(list.contains(11)).toBe(false)
    expect(list.length).toBe(1)

    el = list.removeFromTail()
    expect(el).toBe(10)
    expect(list.contains(10)).toBe(false)
    expect(list.length).toBe(0)
  })

  test('can be reversed', () => {
    const list = new DoublyLL()

    list.append(10)
    list.append(11)
    list.append(12)
    list.append(13)

    const result = list.reduce((acc, el) => {
      acc.push(el)
      return acc
    }, [])

    expect(result).toEqual([10, 11, 12, 13])

    list.reverse()

    const resultReversed = list
      .reduce((acc, el) => {
        acc.push(el)
        return acc
      }, [])

    expect(resultReversed).toEqual([13, 12, 11, 10])
  })

  test('can be reduced', () => {
    const list = new DoublyLL()

    list.append(10)
    list.append(11)
    list.append(12)
    list.append(13)
    list.append(14)

    const result = list.reduce((acc, el) => acc + el, 100)

    expect(result).toBe(160)
  })

  test('can be compared', () => {
    const list = new DoublyLL()
    list.append(10)
    list.append(11)
    list.append(12)
    list.append(13)

    const list2 = new DoublyLL()
    list2.append(10)
    list2.append(11)
    list2.append(12)
    list2.append(13)

    expect(list.equals(list2)).toBe(true)

    const list3 = new DoublyLL()
    list3.append(11)
    list3.append(12)
    list3.append(13)
    list3.append(14)

    expect(list.equals(list3)).toBe(false)
  })
})
