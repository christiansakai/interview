import LinkedList from './linkedList/singly'

/**
 * ADT to holds key value pair.
 */
// TODO: Make into protected/private/nested class
class KeyValue<K, V> {

  /** Key */
  _key: K

  /** Value */
  _value: V

  /**
   * @param key Key to be associated with the value
   * @param value Value to be associated with the key
   */
  constructor(key: K, value: V) {
    this._key = key
    this._value = value
  }
}

/**
 * HashMap implementation using Array of Singly Linked List
 */
class HashMap<K, V> implements Reduceable {

  /** Fixed size array to store singly linked lists */
  private _array: Array<LinkedList<KeyValue<K, V>>>

  /** Array size */
  private _arraySize: number

  /** Count of how many elements are in the map */ 
  private _size: number

  /**
   * @param arraySize Size of the array to store the singly linked lists
   */
  constructor(arraySize: number = 10) {
    this._array = new Array(arraySize)

    // Cannot use .fill due to Object pass by reference
    for (let i = 0; i < this._array.length; i++) {
      this._array[i] = new LinkedList()
    }

    this._arraySize = arraySize
    this._size = 0
  }

  /**
   * Check whether a key exists or not
   *
   * Time = O(n)
   * Space = -
   *
   * @param key Key to be checked
   * @return `true` if the key exists, `false` otherwise
   */
  containsKey(key: K): boolean {
    const pair = this.get(key)

    return (pair === null ? false : true)
  }

  /**
   * Check whether a value exists or not
   *
   * Time = O(n)
   * Space = -
   *
   * @param value value to be checked
   * @return `true` if the value exists, `false` otherwise
   */
  containsValue(value: V): boolean {
    let bucket
    let found

    for (let i = 0; i < this._array.length; i++) {
      bucket = this._array[i]
      found = bucket.reduce((acc, el) =>
        el._value === value || acc
      , false)
    }

    return found
  }

  /**
   * Get a value based on a key
   *
   * Time = O(n)
   * Space = -
   *
   * @param key Key associated with the value
   * @return Value if the value exists, null otherwise
   */
  get(key: K): V | null {
    const pair = this._findKeyValuePair(key)
    return pair === null ? null : pair._value
  }

  /**
   * Set a value based on a key. This will replace
   * the value if a key already existed with a former value.
   *
   * Time = O(n)
   * Space = -
   *
   * @param key Key associated with the value
   * @param value Value associated with the key
   */
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

  /**
   * Remove a value based on a key. 
   *
   * Time = O(n)
   * Space = -
   *
   * @param key Key associated with the value
   * @param value Value associated with the key, null if it doesn't exist
   */
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
  /**
   * Get how many elements are in the hash map.
   *
   * Time = O(1)
   * Space = -
   *
   * @return Count of elements in the hash map
   */
 
  size(): number {
    return this._size
  }

  /**
   * Check whether the hash map is empty or not.
   *
   * @return `true` if the hash map is empty, `false` otherwise
   */
  isEmpty() {
    return this._size === 0
  }

  /**
   * Reduce the Hashmap into an accumulated value.
   *
   * Time = O(n)
   * Space = O(1)
   *
   * @param func Reducer function
   * @param acc Accumulator value
   * @return Accumulated value
   */
  reduce(func: (acc: any, element: V) => any, acc: any): any {
    let result = acc

    let bucket
    let bucketResult
    for (let i = 0; i < this._array.length; i++) {
      bucket = this._array[i]

      bucket.reduce((_, el) => {
        result = func(result, el._value)
      }, null)
    }

    return result
  }

  /**
   * Turn a key into a positive integer.
   * Taken from 
   * http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
   *
   * @param key Key to be hashed
   * @return Positive number
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

    return Math.abs(hash)
  }

  /**
   * Compute slot index of a hash in the array.
   *
   * @param hash Hashcode
   * @return Index for the key in the array
   */
  private _slot(hash: number): number {
    return hash % this._arraySize
  }

  /**
   * Find a key value pair object.
   *
   * Time = O(n)
   * Space = -
   *
   * @param key Key to be found
   * @return Key-value pair object
   */
  private _findKeyValuePair(key: K): KeyValue<K, V> {
    const index = this._slot(this._hash(key))
    const bucket = this._array[index]

    return bucket.reduce((acc, kv) => 
      kv._key === key ? kv : acc
    , null)
  }
}

export default HashMap
