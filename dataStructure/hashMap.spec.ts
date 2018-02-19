import HashMap from './hashMap'

describe('HashMap', () => {
  test('can add key value pair', () => {
    const map = new HashMap(2)
    expect(map.size()).toBe(0)

    map.set('name', 'Christian')
    expect(map.size()).toBe(1)

    map.set('age', '31')
    expect(map.size()).toBe(2)

    map.set('gender', 'male')
    expect(map.size()).toBe(3)

    map.set('hobby', 'music')
    expect(map.size()).toBe(4)

    map.set('food', 'seafood')
    expect(map.size()).toBe(5)

    map.set('laziness', 'very')
    expect(map.size()).toBe(6)
  })

  test('can check for key membership', () => {
    const map = new HashMap(2)

    map.set('name', 'Christian')
    expect(map.containsKey('name')).toBe(true)

    map.set('age', '31')
    expect(map.containsKey('age')).toBe(true)
    expect(map.containsKey('gender')).toBe(false)
  })

  test('can check for value membership', () => {
    const map = new HashMap(2)

    map.set('name', 'Christian')
    expect(map.containsValue('Christian')).toBe(true)

    map.set('age', '31')
    expect(map.containsValue('31')).toBe(true)
    expect(map.containsValue('male')).toBe(false)
  })

  test('can get value from key', () => {
    const map = new HashMap(2)

    map.set('name', 'Christian')
    map.set('age', '31')
    map.set('gender', 'male')
    map.set('hobby', 'music')
    map.set('food', 'seafood')
    map.set('laziness', 'very')

    expect(map.get('name')).toBe('Christian')
    expect(map.get('age')).toBe('31')
    expect(map.get('gender')).toBe('male')
    expect(map.get('hobby')).toBe('music')
    expect(map.get('food')).toBe('seafood')
    expect(map.get('laziness')).toBe('very')
  })

  test('can replace value at key', () => {
    const map = new HashMap(2)

    map.set('name', 'Christian')
    map.set('age', '31')
    map.set('gender', 'male')
    map.set('hobby', 'music')
    map.set('food', 'seafood')
    map.set('laziness', 'very')
    expect(map.size()).toBe(6)

    map.set('name', 'Sakai')

    expect(map.get('name')).toBe('Sakai')
    expect(map.get('age')).toBe('31')
    expect(map.get('gender')).toBe('male')
    expect(map.get('hobby')).toBe('music')
    expect(map.get('food')).toBe('seafood')
    expect(map.get('laziness')).toBe('very')
    expect(map.size()).toBe(6)
  })

  test('can remove key value pair', () => {
    const map = new HashMap(2)

    map.set('name', 'Christian')
    map.set('age', '31')
    map.set('gender', 'male')
    map.set('hobby', 'music')
    map.set('food', 'seafood')
    map.set('laziness', 'very')

    expect(map.remove('hello')).toBe(null)
    expect(map.size()).toBe(6)

    expect(map.remove('name')).toBe('Christian')
    expect(map.size()).toBe(5)
    expect(map.containsKey('name')).toBe(false)
    expect(map.containsValue('Christian')).toBe(false)

    expect(map.remove('age')).toBe('31')
    expect(map.size()).toBe(4)
    expect(map.containsKey('age')).toBe(false)
    expect(map.containsValue('31')).toBe(false)

    expect(map.remove('gender')).toBe('male')
    expect(map.size()).toBe(3)
    expect(map.containsKey('gender')).toBe(false)
    expect(map.containsValue('male')).toBe(false)

    expect(map.remove('hobby')).toBe('music')
    expect(map.size()).toBe(2)
    expect(map.containsKey('hobby')).toBe(false)
    expect(map.containsValue('music')).toBe(false)

    expect(map.remove('food')).toBe('seafood')
    expect(map.size()).toBe(1)
    expect(map.containsKey('seafood')).toBe(false)
    expect(map.containsValue('male')).toBe(false)

    expect(map.remove('laziness')).toBe('very')
    expect(map.size()).toBe(0)
    expect(map.containsKey('very')).toBe(false)
    expect(map.containsValue('male')).toBe(false)
  })

  test('can be reduced', () => {
    const map = new HashMap(2)

    map.set('name', 'Christian')
    map.set('age', '31')
    map.set('gender', 'male')
    map.set('hobby', 'music')
    map.set('food', 'seafood')
    map.set('laziness', 'very')

    const result = map.reduce((acc, el) => {
      return acc.concat([el])
    }, [])

    expect(result.length).toBe(6)
    expect(result.indexOf('Christian') >= 0).toBe(true)
    expect(result.indexOf('31') >= 0).toBe(true)
    expect(result.indexOf('male') >= 0).toBe(true)
    expect(result.indexOf('music') >= 0).toBe(true)
    expect(result.indexOf('seafood') >= 0).toBe(true)
    expect(result.indexOf('very') >= 0).toBe(true)
  })
})
