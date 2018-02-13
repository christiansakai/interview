class ArrayList<T> {
  private _capacity: number
  private _length: number
  private _array: Array<T>

  constructor(capacity: number = 10) {
    this._array = new Array<T>(capacity)
    this._capacity = capacity
    this._length = 0
  }

  get length(): number {
    return this._length
  }

  get capacity(): number {
    return this._capacity
  }

  add(element: T): void {
    if (this._length < this._capacity) {
      this._array[this._length] = element
    } else {
      const newCapacity = this._capacity * 2
      this._array = this._resizeArray(this._array, newCapacity)
      this._array[this._length] = element
      this._capacity = newCapacity
    }

    this._length++
  }

  retrieve(index: number): T {
    this._checkIndex(index)
    return this._array[index]
  }

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

  // TODO: Throw type annotation
  private _checkIndex(index: number) {
    // TODO: Check if number is integer
    
    if ((this._length - 1) < index) {
      throw new RangeError('Index out of bounds')
    }
  }

  private _resizeArray(array: Array<T>, capacity: number): Array<T> {
    const newArray = new Array<T>(capacity)
    return this._copyArr(array, newArray)
  }

  private _copyArr(source: Array<T>, target: Array<T>): Array<T> {
    for (let i = 0; i < this._length; i++) {
      target[i] = source[i]
    }

    return source
  }

  private _shiftContentsOneLeft(startIndex: number, array: Array<T>): Array<T> {
    for (let i = startIndex + 1; i < this._length; i++) {
      array[i - 1] = array[i]
    }

    return array
  }
}

export default ArrayList
