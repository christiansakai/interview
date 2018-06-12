import { urlify } from './arrayAndString'

describe('URLify', () => {
  test('change space to %20', () => {
    const input = [
      'm', 'r', ' ', 
      'j', 'o', 'h', 'n', ' ',
      's', 'm', 'i', 't', 'h',
      ' ', ' '
    ]
     const output = [
      'm', 'r', '%', '20', 
      'j', 'o', 'h', 'n', '%', '20',
      's', 'm', 'i', 't', 'h'
    ]
      
    expect(urlify(input, 13)).toBe(output)
  })
})
