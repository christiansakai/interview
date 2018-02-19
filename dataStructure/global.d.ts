interface Stringable {
  toString(): string
}

interface Reduceable {
  reduce(func: (acc: any, element: any) => any, acc: any): any
}

interface Comparable {
  equals(a: any, b: any): boolean
}
