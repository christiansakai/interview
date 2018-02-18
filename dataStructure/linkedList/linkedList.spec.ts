import LinkedList from './linkedList'

runLinkedListTest()

function runLinkedListTest(isDoubly: boolean = false) {
  describe(`${isDoubly ? 'Doubly' : 'Singly'} LinkedList`, () => {
    test('can append an element', () => {
      const list = LinkedList.createLinkedList(isDoubly)
      expect(list.length).toBe(0)

      list.append(10)
      expect(list.contains(10)).toBe(true)
      expect(list.length).toBe(1)

      list.append(11)
      expect(list.contains(10)).toBe(true)
      expect(list.contains(11)).toBe(true)
      expect(list.length).toBe(2)
    })

    test('can prepend an element', () => {
      const list = LinkedList.createLinkedList(isDoubly)
      expect(list.length).toBe(0)

      list.prepend(10)
      expect(list.contains(10)).toBe(true)
      expect(list.length).toBe(1)

      list.prepend(11)
      expect(list.contains(10)).toBe(true)
      expect(list.contains(11)).toBe(true)
      expect(list.length).toBe(2)
    })

    test('can remove from head', () => {
      const list = LinkedList.createLinkedList(isDoubly)

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
      const list = LinkedList.createLinkedList(isDoubly)

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
      const list = LinkedList.createLinkedList(isDoubly)

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
      const list = LinkedList.createLinkedList(isDoubly)

      list.append(10)
      list.append(11)
      list.append(12)
      list.append(13)
      list.append(14)

      const result = list.reduce((acc, el) => acc + el, 100)

      expect(result).toBe(160)
    })
  })
}

