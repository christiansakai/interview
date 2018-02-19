import Stack from './stack'

describe('Stack', () => {
  test('can add an element on top of the stack', () => {
    const stack = new Stack()
    expect(stack.size()).toBe(0)
    expect(stack.isEmpty()).toBe(true)

    stack.push(10)
    expect(stack.top()).toBe(10)
    expect(stack.size()).toBe(1)

    stack.push(11)
    expect(stack.top()).toBe(11)
    expect(stack.size()).toBe(2)

    stack.push(12)
    expect(stack.top()).toBe(12)
    expect(stack.size()).toBe(3)
    
    stack.push(13)
    expect(stack.top()).toBe(13)
    expect(stack.size()).toBe(4)
  })

  test('can remove an element from top of the stack', () => {
    const stack = new Stack()
    expect(stack.size()).toBe(0)
    expect(stack.isEmpty()).toBe(true)

    stack.push(10)
    stack.push(11)
    stack.push(12)
    stack.push(13)
    expect(stack.size()).toBe(4)

    expect(stack.pop()).toBe(13)
    expect(stack.top()).toBe(12)
    expect(stack.size()).toBe(3)

    expect(stack.pop()).toBe(12)
    expect(stack.top()).toBe(11)
    expect(stack.size()).toBe(2)

    expect(stack.pop()).toBe(11)
    expect(stack.top()).toBe(10)
    expect(stack.size()).toBe(1)

    expect(stack.pop()).toBe(10)
    expect(stack.top()).toBe(null)
    expect(stack.size()).toBe(0)
  })
})

