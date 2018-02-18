import Vector from './vector'

describe('Vector', () => {
  test('starts at length 0', () => {
    const vec = new Vector<number>()
    expect(vec.length).toBe(0)
  })

  test('checks for members', () => {
    const vec = new Vector<number>()
    expect(vec.contains(100)).toBe(false)

    vec.add(100)
    expect(vec.contains(100)).toBe(true)
  })

  test('checks for emptiness', () => {
    const vec = new Vector<number>()
    expect(vec.isEmpty).toBe(true)

    vec.add(100)
    expect(vec.isEmpty).toBe(false)

    vec.remove(100)
    expect(vec.isEmpty).toBe(true)
  })

  test('can be stringified', () => {
    const vec = new Vector<number>()
    expect(vec.toString()).toBe('[]')

    vec.add(100)
    vec.add(200)
    expect(vec.toString()).toBe('[100, 200]')
  })

  test('can add an element', () => {
    const vec = new Vector<number>(2)

    vec.add(10)
    expect(vec.length).toBe(1)

    vec.add(12)
    expect(vec.length).toBe(2)
  })

  test('can add an element and grows', () => {
    const vec = new Vector<number>(2)
    expect(vec.capacity).toBe(2)

    vec.add(10)
    expect(vec.length).toBe(1)

    vec.add(11)
    expect(vec.length).toBe(2)

    vec.add(12)
    expect(vec.length).toBe(3)

    expect(vec.capacity).toBe(4)

    vec.add(13)
    expect(vec.length).toBe(4)

    expect(vec.toString()).toBe('[10, 11, 12, 13]')
  })

  test('can add an element by index and grows', () => {
    const vec = new Vector<number>(2)
    expect(vec.capacity).toBe(2)

    vec.addAt(0, 10)
    expect(vec.length).toBe(1)

    vec.addAt(1, 11)
    expect(vec.length).toBe(2)

    vec.addAt(2, 12)
    expect(vec.length).toBe(3)

    expect(vec.capacity).toBe(4)

    vec.addAt(3, 13)
    expect(vec.length).toBe(4)

    expect(vec.toString()).toBe('[10, 11, 12, 13]')
  })

  test('can add an element by index in the middle and grows', () => {
    const vec = new Vector<number>(2)
    expect(vec.capacity).toBe(2)

    vec.addAt(0, 10)
    expect(vec.length).toBe(1)

    vec.addAt(1, 12)
    expect(vec.length).toBe(2)

    expect(vec.toString()).toBe('[10, 12]')

    vec.addAt(0, 9)
    expect(vec.length).toBe(3)

    expect(vec.capacity).toBe(4)
    expect(vec.toString()).toBe('[9, 10, 12]')

    vec.addAt(2, 11)
    expect(vec.length).toBe(4)
    expect(vec.toString()).toBe('[9, 10, 11, 12]')
  })

  test('can retrieve an element', () => {
    const vec = new Vector<number>()

    vec.addAt(0, 10)
    vec.addAt(1, 11)
    vec.addAt(2, 12)

    expect(vec.retrieve(0)).toBe(10)
    expect(vec.retrieve(1)).toBe(11)
    expect(vec.retrieve(2)).toBe(12)
  })

  test('can remove an element and shrinks', () => {
    const vec = new Vector<number>(2)

    vec.add(10)
    vec.add(11)
    vec.add(11)
    vec.add(12)
    vec.add(13)
    expect(vec.length).toBe(5)
    expect(vec.capacity).toBe(8)

    expect(vec.remove(15)).toBe(false)
    expect(vec.length).toBe(5)
    expect(vec.toString()).toBe('[10, 11, 11, 12, 13]')

    expect(vec.remove(11)).toBe(true)
    expect(vec.length).toBe(4)
    expect(vec.capacity).toBe(4)
    expect(vec.toString()).toBe('[10, 11, 12, 13]')

    expect(vec.remove(13)).toBe(true)
    expect(vec.length).toBe(3)
    expect(vec.toString()).toBe('[10, 11, 12]')

    expect(vec.remove(13)).toBe(false)
    expect(vec.length).toBe(3)
    expect(vec.toString()).toBe('[10, 11, 12]')

    expect(vec.remove(10)).toBe(true)
    expect(vec.length).toBe(2)
    expect(vec.capacity).toBe(2)
    expect(vec.toString()).toBe('[11, 12]')

    expect(vec.remove(11)).toBe(true)
    expect(vec.length).toBe(1)
    expect(vec.capacity).toBe(1)
    expect(vec.toString()).toBe('[12]')

    expect(vec.remove(12)).toBe(true)
    expect(vec.length).toBe(0)
    expect(vec.capacity).toBe(1)
    expect(vec.toString()).toBe('[]')
  })

  test('can remove an element by index and shrinks', () => {
    const vec = new Vector<number>(2)

    vec.add(10)
    vec.add(11)
    vec.add(11)
    vec.add(12)
    vec.add(13)
    expect(vec.length).toBe(5)
    expect(vec.capacity).toBe(8)

    expect(vec.removeAt(1)).toBe(11)
    expect(vec.length).toBe(4)
    expect(vec.toString()).toBe('[10, 11, 12, 13]')

    expect(vec.removeAt(1)).toBe(11)
    expect(vec.length).toBe(3)
    expect(vec.capacity).toBe(4)
    expect(vec.toString()).toBe('[10, 12, 13]')

    expect(vec.removeAt(2)).toBe(13)
    expect(vec.length).toBe(2)
    expect(vec.toString()).toBe('[10, 12]')

    expect(vec.removeAt(0)).toBe(10)
    expect(vec.length).toBe(1)
    expect(vec.toString()).toBe('[12]')

    expect(vec.removeAt(0)).toBe(12)
    expect(vec.length).toBe(0)
    expect(vec.toString()).toBe('[]')
  })

  test('can be reduced', () => {
    const vec = new Vector<number>(2)

    vec.add(10)
    vec.add(11)
    vec.add(12)
    vec.add(13)
    vec.add(14)

    const result = vec.reduce((acc, el) => acc + el, 100)

    expect(result).toBe(160)
  })
})
