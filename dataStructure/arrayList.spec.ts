import ArrayList from './arrayList'

describe('ArrayList', () => {
  test('can add an element', () => {
    const arr = new ArrayList<number>()

    expect(arr.length).toBe(0)

    arr.add(10)
    expect(arr.length).toBe(1)

    arr.add(12)
    expect(arr.length).toBe(2)

    expect(arr.retrieve(0)).toBe(10)
    expect(arr.retrieve(1)).toBe(12)
  })

  test('automatically grows', () => {
    const arr = new ArrayList<number>(2)

    arr.add(10)
    arr.add(11)
    arr.add(12)
    arr.add(13)

    expect(arr.length).toBe(4)

    expect(arr.retrieve(0)).toBe(10)
    expect(arr.retrieve(1)).toBe(11)
    expect(arr.retrieve(2)).toBe(12)
    expect(arr.retrieve(3)).toBe(13)
  })

  test('can remove an element', () => {
    const arr = new ArrayList<number>(2)

    arr.add(10)
    arr.add(11)
    arr.add(12)
    arr.add(13)

    expect(arr.capacity).toBe(4)

    let el

    el = arr.remove(0)
    expect(el).toBe(10)
    expect(arr.length).toBe(3)
    expect(arr.retrieve(0)).toBe(11)
    expect(arr.retrieve(1)).toBe(12)
    expect(arr.retrieve(2)).toBe(13)

    el = arr.remove(1)
    expect(el).toBe(12)
    expect(arr.length).toBe(2)
    expect(arr.retrieve(1)).toBe(13)
    expect(arr.capacity).toBe(2)

    el = arr.remove(0)
    expect(el).toBe(11)

    el = arr.remove(0)
    expect(el).toBe(13)
    expect(arr.length).toBe(0)
  })
})
