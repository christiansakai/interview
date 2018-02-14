/**
 * Array that automatically grows
 * or shrinks in size.
 */
class ArrayList<T> {

  /* Full capacity of the array */
  private _capacity: number

  /** 
   * Number of actual contents in the array 
   * _length <= _capacity
   */
  private _length: number

  /**
   * Internal JavaScript array data structure. 
   * Pretend that the array is static.
   */
  private _array: Array<T>

  /**
   * The multiplier/divider every time
   * the array resizes.
   */
  private _resizeFactor: number

  /**
   * @param capacity Beginning capacity of the array
   * @param resizeFactor Resize factor of the array
   */
  constructor(capacity: number = 10, resizeFactor: number = 2) {
    this._array = new Array<T>(capacity)
    this._capacity = capacity
    this._length = 0
    this._resizeFactor = resizeFactor
  }

  /**
   * Get the length of the array.
   *
   * Time = O(1)
   * Space = O(1)
   *
   * @returns Length of the array
   */
  get length(): number {
    return this._length
  }

  /**
   * Get the capacity of the array.
   * For testing purposes.
   *
   * Time = O(1)
   * Space = O(1)
   *
   * @returns Capacity of the array
   */
  get capacity(): number {
    return this._capacity
  }

  /**
   * Add an element to the array.
   * The array will grow by the resize factor.
   *
   * Time = O(1) (Amortized). see CTCI 6th Ed. p. 43 & 89.
   * Space = O(1)
   *
   * @param element Element to be added
   */
  add(element: T): void {
    if (this._length < this._capacity) {
      this._array[this._length] = element
    } else {
      const newCapacity = this._capacity * this._resizeFactor
      this._array = this._resizeArray(this._array, newCapacity)
      this._array[this._length] = element
      this._capacity = newCapacity
    }

    this._length++
  }

  /**
   * Retrieve an element from the array
   * based on the array index. 
   *
   * Time = O(1)
   * Space = O(1)
   *
   * @param index Index of the element
   * @returns Element stored on the index
   */
  retrieve(index: number): T {
    this._checkIndex(index)
    return this._array[index]
  }

  /**
   * Remove an element from the array
   * based on the array index.
   *
   * Time = O(1) TODO: Why?
   * Space = O(1)
   *
   * @param index Index of the element
   * @returns Element stored on the index
   */
  remove(index: number): T {
    this._checkIndex(index)

    const el = this._array[index]

    this._array = this._shiftContentsOneLeft(index, this._array)
    this._length--

    let possibleNewCapacity = Math.ceil(this._capacity / 2)
    if (this._length <= possibleNewCapacity) {
      this._capacity = possibleNewCapacity
      this._resizeArray(this._array, this._capacity)
    }

    return el
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
  // TODO: Add throws type annotation
  private _checkIndex(index: number) {
    // TODO: Check if number is integer
    
    if ((this._length - 1) < index) {
      throw new RangeError('Index out of bounds')
    }
  }

  /**
   * Resize an array and maintain the contents.
   *
   * Time = O(n)
   * Space = O(n)
   *
   * @param array Array to be resiszed
   * @param capacity Capacity to be resized to
   * @returns Newly resized array with its contents
   */
  private _resizeArray(array: Array<T>, capacity: number): Array<T> {
    const newArray = new Array<T>(capacity)
    return this._copyArr(array, newArray)
  }

  /**
   * Copy elements from source array to target array.
   *
   * Time = O(n)
   * Space = O(n)
   *
   * @param source Source array to be copied from
   * @param target Target array to be copied to
   * @return Target array with its contents
   */
  private _copyArr(source: Array<T>, target: Array<T>): Array<T> {
    for (let i = 0; i < this._length; i++) {
      target[i] = source[i]
    }

    return source
  }

  /**
   * Shift contenst of the array 1 to the left,
   * starting frrom a particular index.
   *
   * Time = O(n)
   * Space = O(1)
   *
   * @param startIndex Starting index of the elements to be shifted
   * @param array The array to be operated on
   * @returns New aray with its contents shifted
   */
  private _shiftContentsOneLeft(startIndex: number, array: Array<T>): Array<T> {
    for (let i = startIndex + 1; i < this._length; i++) {
      array[i - 1] = array[i]
    }

    return array
  }
}

export default ArrayList
