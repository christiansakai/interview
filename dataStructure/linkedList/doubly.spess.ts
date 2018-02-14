// import LinkedList from './doubly'

// describe('Doubly LinkedList', () => {
//   test('can append an element', () => {
//     const list = new LinkedList<number>()

//     expect(list.length).toBe(0)

//     list.append(10)
//     expect(list.length).toBe(1)

//     list.append(11)
//     expect(list.length).toBe(2)
//   })

//   test('can prepend an element', () => {
//     const list = new LinkedList<number>()

//     expect(list.length).toBe(0)

//     list.prepend(10)
//     expect(list.length).toBe(1)

//     list.prepend(11)
//     expect(list.length).toBe(2)
//   })

//   test('can remove an element', () => {
//     const list = new LinkedList<number>()

//     list.append(10)
//     list.append(11)
//     list.append(12)
//     list.append(13)

//     let el

//     el = list.remove(11)
//     expect(el).toBe(11)
//     expect(list.length).toBe(3)

//     el = list.remove(13)
//     expect(el).toBe(13)
//     expect(list.length).toBe(2)
//   })

//   test('can remove from head', () => {
//     const list = new LinkedList<number>()

//     list.append(10)
//     list.append(11)
//     list.append(12)
//     list.append(13)

//     let el

//     el = list.removeFromHead()
//     expect(el).toBe(10)
//     el = list.removeFromHead()
//     expect(el).toBe(11)
//     el = list.removeFromHead()
//     expect(el).toBe(12)
//     el = list.removeFromHead()
//     expect(el).toBe(13)

//     expect(list.length).toBe(0)
//   })

//   test('can remove from tail', () => {
//     const list = new LinkedList<number>()

//     list.append(10)
//     list.append(11)
//     list.append(12)
//     list.append(13)

//     let el

//     el = list.removeFromTail()
//     expect(el).toBe(13)
//     el = list.removeFromTail()
//     expect(el).toBe(12)
//     el = list.removeFromTail()
//     expect(el).toBe(11)
//     el = list.removeFromTail()
//     expect(el).toBe(10)

//     expect(list.length).toBe(0)

//   })
// })
