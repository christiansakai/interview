interface LinkedList<T> {
  prepend:        (element: T) => void,
  append:         (element: T) => void,
  contains:       (element: T) => boolean,
  removeFromHead: (element: T) => T | null,
  removeFromTail: (element: T) => T | null,
  remove:         (element: T) => T | null,
  reverse:        () => void
}
