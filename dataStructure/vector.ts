/**
 * Vector is an array that automatically grows
 * or shrinks in size.
 */
class Vector<T> {

  /** Full capacity of the vector */
  private _capacity: number

  /** 
   * Number of actual contents in the vector 
   * _length <= _capacity
   */
  private _length: number

  /**
   * Internal JavaScript array data structure. 
   * Pretend that the array size is static.
   */
  private _array: Array<T>

  /**
   * The multiplier/divider every time
   * the vector resizes.
   */
  private _resizeFactor: number

  /**
   * Indicator if the vector is empty or not.
   * Needed for checking out of bounds
   * index accessing at the initialization
   * of the vector.
   */
  private _isEmpty: boolean

  /**
   * @param capacity Beginning capacity of the vector
   * @param resizeFactor Resize factor of the vector
   */
  constructor(capacity: number = 10, resizeFactor: number = 2) {
    this._array = new Array<T>(capacity)
    this._capacity = capacity
    this._length = 0
    this._resizeFactor = resizeFactor
    this._isEmpty = true
  }

  /**
   * Get the length of the vector.
   *
   * Time = O(1)
   * Space = -
   *
   * @returns Length of the vector
   */
  get length(): number {
    return this._length
  }

  /**
   * Get the capacity of the vector.
   * For testing purposes.
   *
   * Time = O(1)
   * Space = -
   *
   * @returns Capacity of the vector
   */
  get capacity(): number {
    return this._capacity
  }

  /**
   * Check whether the vector
   * is empty.
   *
   * Time = O(1)
   * Space = -
   *
   * @returns `true` if the vector is empty,
   *          `false` otherwise.
   */
  get isEmpty(): boolean {
    return this._isEmpty
  }

  /**
   * Add an element to end of the vector.
   * The vector will grow by the resize factor.
   *
   * Time = O(1) (Amortized). see CTCI 6th Ed. p. 43 & 89.
   * Space = O(n)
   *
   * @param element Element to be added
   * @returns `true`
   */
  add(element: T): true {
    if (this._length === this._capacity) {
      const newCapacity = this._capacity * this._resizeFactor
      this._array = this._resizeArray(this._array, newCapacity)
      this._capacity = newCapacity
    }

    this._array[this._length] = element
    this._length++

    if (this._isEmpty === true)
      this._isEmpty = false

    return true
  }

  /**
   * Add an element at the specified index.
   * This will move the subsequent elements to the right.
   *
   * Time = TODO
   * Space = TODO
   *
   * @param index Index of the element to be added to
   * @param element Element to be added
   * @returns `true`
   */
  addAt(index: number, element: T): true {
    this._checkIndex(index)

    if (this._length === this._capacity) {
      const newCapacity = this._capacity * this._resizeFactor
      this._array = this._resizeArray(this._array, newCapacity)
      this._capacity = newCapacity
    }

    this._array = this._shiftsContentsOneRight(index, this._array)
    this._array[index] = element
    this._length++

    if (this._isEmpty === false)
      this._isEmpty = true

    return true
  }

  /**
   * Retrieve an element from the vector
   * based on the vector index. 
   *
   * Time = O(1)
   * Space = -
   *
   * @param index Index of the element
   * @returns Element stored on the index
   */
  retrieve(index: number): T {
    this._checkIndex(index)
    return this._array[index]
  }

  /**
   * Remove the first occurence of the specified element.
   *
   * Time = O(n)
   * Space = -
   *
   * @param element Element to be removed
   * @returns `true` if element was found, `false` otherwise
   */
  remove(element: T): boolean {
    for (let i = 0; i < this._length; i++) {
      if (this._array[i] === element) {
        this.removeAt(i)
        return true
      }
    }

    return false
  }

  /**
   * Remove an element from the vector
   * based on the vector index, then
   * shift the subsequent elements to the left.
   *
   * Time = TODO
   * Space = TODO
   *
   * @param index Index of the element
   * @returns Element stored on the index
   */
  removeAt(index: number): T {
    this._checkIndex(index)

    const el = this._array[index]

    this._array = this._shiftContentsOneLeft(index + 1, this._array)
    this._length--

    let possibleNewCapacity = Math.ceil(this._capacity / 2)
    if (this._length <= possibleNewCapacity) {
      this._capacity = possibleNewCapacity
      this._resizeArray(this._array, this._capacity)
    }

    if (this._length === 0 &&
        this._isEmpty === false)
      this._isEmpty = true


    return el
  }

  /**
   * Checks whether the vector contain the specified element.
   *
   * Time = O(n)
   * Space = -
   *
   * @param element Element to be checked
   * @returns `true` if Element found, `false` otherwise
   */
  contains(element: T): boolean {
    for (let i = 0; i < this._length; i++) {
      if (this._array[i] === element)
        return true
    }

    return false
  }

  /**
   * Reduce the vector into an accumulated value.
   *
   * Time = O(n)
   * Space = O(1)
   *
   * @param func Reducer function
   * @param acc Accumulator value
   * @return Accumulated value
   */
  reduce(func: (acc: any, element: T) => any, acc: any): any {
    let result = acc

    for (let i = 0; i < this._length; i++) {
      result = func(result, this._array[i])
    }

    return result
  }

  /**
   * Get the string representation
   * of this vector.
   *
   * Time = O(n)
   * Space = O(n) Assuming string concatenation is O(1)
   *
   * @returns String representation of the vector
   */
  toString(): string {
    let str = '['
    for (let i = 0; i < this._length; i++) {
      if (i === this._length - 1) {
        str += `${this._array[i]}`
      } else {
        str += `${this._array[i]}, `
      }
    }

    str += ']'
    return str
  }

  /**
   * Check whether the index is valid 
   * or not.
   *
   * Time = O(1)
   * Space = O(1)
   *
   * @param index Index to be checked
   */
  private _checkIndex(index: number) {
    if (!Number.isInteger(index))
      throw new TypeError('Index needs to be an integer')
    
    if ((this._isEmpty === false) && 
        (this._length) <= index) {
      throw new RangeError('Array index out of bounds')
    }
  }

  /**
   * Resize an vector and maintain the contents.
   *
   * Time = O(n)
   * Space = O(n)
   *
   * @param vector Array to be resiszed
   * @param capacity Capacity to be resized to
   * @returns Newly resized vector with its contents
   */
  private _resizeArray(vector: Array<T>, capacity: number): Array<T> {
    const newArray = new Array<T>(capacity)
    return this._copyArr(vector, newArray)
  }

  /**
   * Copy elements from source vector to target vector.
   *
   * Time = O(n)
   * Space = O(n)
   *
   * @param source Source vector to be copied from
   * @param target Target vector to be copied to
   * @return Target vector with its contents
   */
  private _copyArr(source: Array<T>, target: Array<T>): Array<T> {
    for (let i = 0; i < this._length; i++) {
      target[i] = source[i]
    }

    return source
  }

  /**
   * Shift contenst of the vector 1 to the left,
   * starting from a particular index.
   *
   * Time = O(n)
   * Space = -
   *
   * @param startIndex Starting index of the elements to be shifted
   * @param vector The vector to be operated on
   * @returns New aray with its contents shifted
   */
  private _shiftContentsOneLeft(startIndex: number, vector: Array<T>): Array<T> {
    for (let i = startIndex; i < this._length; i++) {
      vector[i - 1] = vector[i]
    }

    return vector
  }

  /**
   * Shift contenst of the vector 1 to the right,
   * starting from a particular index.
   *
   * Time = O(n)
   * Space = -
   *
   * @param startIndex Starting index of the elements to be shifted
   * @param vector The vector to be operated on
   * @returns New aray with its contents shifted
   */
  private _shiftsContentsOneRight(startIndex: number, vector: Array<T>): Array<T> {
    for (let i = this._length; i >= startIndex; i--) {
      vector[i] = vector[i - 1]
    }

    return vector
  }
}

export default Vector
