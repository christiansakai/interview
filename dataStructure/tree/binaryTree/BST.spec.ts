import BST from './bst'

describe('BST', () => {
  test('starts with size 0 and null root', () => {
    const bst = new BST()

    expect(bst.size).toBe(0)
    expect(bst.root).toBe(null)
  })

  test('can add element', () => {
  })
})
