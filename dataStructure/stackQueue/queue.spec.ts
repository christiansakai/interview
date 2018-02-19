import Queue from './queue'

describe('Queue', () => {
  test('can add an element from the back of the queue', () => {
    const queue = new Queue()
    expect(queue.size()).toBe(0)
    expect(queue.isEmpty()).toBe(true)

    queue.enqueue(10)
    expect(queue.first()).toBe(10)
    expect(queue.size()).toBe(1)

    queue.enqueue(11)
    expect(queue.first()).toBe(10)
    expect(queue.size()).toBe(2)

    queue.enqueue(12)
    expect(queue.first()).toBe(10)
    expect(queue.size()).toBe(3)
    
    queue.enqueue(13)
    expect(queue.first()).toBe(10)
    expect(queue.size()).toBe(4)
  })

  test('can remove an element from the front of the queue', () => {
    const queue = new Queue()
    expect(queue.size()).toBe(0)
    expect(queue.isEmpty()).toBe(true)

    queue.enqueue(10)
    queue.enqueue(11)
    queue.enqueue(12)
    queue.enqueue(13)
    expect(queue.size()).toBe(4)

    expect(queue.dequeue()).toBe(10)
    expect(queue.first()).toBe(11)
    expect(queue.size()).toBe(3)

    expect(queue.dequeue()).toBe(11)
    expect(queue.first()).toBe(12)
    expect(queue.size()).toBe(2)

    expect(queue.dequeue()).toBe(12)
    expect(queue.first()).toBe(13)
    expect(queue.size()).toBe(1)

    expect(queue.dequeue()).toBe(13)
    expect(queue.first()).toBe(null)
    expect(queue.size()).toBe(0)
  })
})

