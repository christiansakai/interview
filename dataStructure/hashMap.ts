import LinkedList from './linkedList/singly'

/**
 * ADT to holds key value pair.
 */
// TODO: Make into protected/private/nested class
class KeyValue<K, V> implements Comparable {
  _key: K

  _value: V

  constructor(key: K, value: V) {
    this._key = key
    this._value = value
  }

  equals(keyValue: KeyValue<K, V>) {
    return this._key === keyValue._key && this._value === keyValue._value
  }
}

class HashMap<K, V> implements Reduceable {

  private _array: Array<LinkedList<KeyValue<K, V>>>

  private _arraySize: number

  private _size: number

  constructor(arraySize: number = 10) {
    this._array = new Array(arraySize)
    this._array.fill(null)

    this._arraySize = arraySize
    this._size = 0
  }

  containsKey(key: K): boolean {
    const pair = this.get(key)

    return (pair === null ? false : true)
  }

  containsValue(value: V): boolean {
    let bucket
    let found

    for (let i = 0; i < this._array.length; i++) {
      bucket = this._array[i]
      found = bucket.reduce((acc, el) => {
        el.value === value ? true : acc
      }, false)

      if (found) return true
    }

    return false
  }

  get(key: K): V | null {
    const pair = this._findKeyValuePair(key)
    return pair === null ? null : pair._value
  }

  set(key: K, value: V) {
    const pair = this._findKeyValuePair(key)

    if (pair === null) {
      let newPair = new KeyValue(key, value)
      const index = this._slot(this._hash(key))

      this._array[index].append(newPair)

      this._size++
    } else {
      pair._value = value
    }
  }

  remove(key: K): V | null {
    const pair = this._findKeyValuePair(key)

    if (pair === null) return null
    else {
      const index = this._slot(this._hash(key))
      this._array[index].remove(pair)
      this._size--

      return pair._value
    }
  }

  size(): number {
    return this._size
  }

  isEmpty() {
    return this._size === 0
  }

  reduce(func: (acc: any, element: V) => any, acc: any): any {
    let result = acc

    let bucket
    for (let i = 0; i < this._array.length; i++) {
      bucket = this._array[i]
      result = bucket.reduce(func, result)
    }

    return result
  }

  /**
   * Taken from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
   */
  private _hash(key: K): number {
    const str = key.toString()

    if (str.length == 0) return 0

    let hash = 0
    let char

    for (let i = 0; i < str.length; i++) {
      char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }

    return hash
  }

  private _slot(hash: number): number {
    return hash % this._arraySize
  }

  private _findKeyValuePair(key: K): KeyValue<K, V> {
    const index = this._slot(this._hash(key))
    const bucket = this._array[index]

    return bucket.reduce((acc, kv) => 
      kv._key === key ? kv : null
    , null)
  }

}

export default HashMap
