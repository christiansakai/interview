import LinkedList from './linkedList/singly'

class HashMap<K, V> {

  private _array: Array<LinkedList<V>>

  private _arraySize: number

  constructor(arraySize: number = 10) {
    this._array = new Array(arraySize)
    this._array.fill(null)

    this._arraySize = arraySize
  }

  containsKey(key: K): boolean {
    const index = this._slot(this._hash(key))

    return this._array[index] !== null
  }

  containsValue(value: V): boolean {
    for (let i = 0; i < this._array.length; i++) {
      if (this._array[i].contains(value))
        return true
    }

    return false
  }

  get(key: K) {
    const index = this._slot(this._hash(key))

    return this._array[index] !== null
  }

  set(key: K, value: V) {
  }

  remove(key: K): V {
  }

  size() {}

  isEmpty() {}

  iterate() {}

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

}

export default HashMap
