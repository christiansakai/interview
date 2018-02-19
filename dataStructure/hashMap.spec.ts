import HashMap from './hashMap'

describe('HashMap', () => {
  test('can add key value pair', () => {
    const map = new HashMap()
    expect(map.size()).toBe(0)

    map.set('name', 'Christian')
    expect(map.size()).toBe(1)

    map.set('age', '31')
    expect(map.size()).toBe(2)
  })

  test('can check for key membership', () => {
    const map = new HashMap()

    map.set('name', 'Christian')
    expect(map.containsKey('name')).toBe(true)

    map.set('age', '31')
    expect(map.containsKey('age')).toBe(true)
    expect(map.containsKey('gender')).toBe(false)
  })

  test('can check for value membership', () => {
    const map = new HashMap()

    map.set('name', 'Christian')
    expect(map.containsValue('Christian')).toBe(true)

    map.set('age', '31')
    expect(map.containsValue('31')).toBe(true)
    expect(map.containsValue('male')).toBe(false)
  })

  test('can get value from key', () => {
    const map = new HashMap()

    map.set('name', 'Christian')
    map.set('age', '31')
    map.set('gender', 'male')

    expect(map.get('name')).toBe('Christian')
    expect(map.get('age')).toBe('31')
    expect(map.get('gender')).toBe('male')
  })

  test('can replace value at key', () => {
    const map = new HashMap()

    map.set('name', 'Christian')
    map.set('age', '31')
    map.set('gender', 'male')
    expect(map.size()).toBe(3)

    map.set('name', 'Sakai')

    expect(map.get('name')).toBe('Sakai')
    expect(map.get('age')).toBe('31')
    expect(map.get('gender')).toBe('male')
    expect(map.size()).toBe(3)
  })

  test('can remove key value pair', () => {
    const map = new HashMap()

    map.set('name', 'Christian')
    map.set('age', '31')
    map.set('gender', 'male')

    expect(map.remove('name')).toBe('Christian')
    expect(map.size()).toBe(2)
    expect(map.containsKey('name')).toBe(false)
    expect(map.containsValue('Christian')).toBe(false)

    expect(map.remove('age')).toBe('31')
    expect(map.size()).toBe(1)
    expect(map.containsKey('age')).toBe(false)
    expect(map.containsValue('31')).toBe(false)

    expect(map.remove('gender')).toBe('male')
    expect(map.size()).toBe(0)
    expect(map.containsKey('gender')).toBe(false)
    expect(map.containsValue('male')).toBe(false)
  })

  test('can be reduced', () => {
    const map = new HashMap()

    map.set('name', 'Christian')
    map.set('age', '31')
    map.set('gender', 'male')

    const result = map.reduce((acc, el) =>
      `${acc}, ${el}`
    , '')

    expect(result).toBe('Christian, 31, male')
  })
})
