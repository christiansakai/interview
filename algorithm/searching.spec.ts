import { BadVersion } from './searching'

describe.only('BadVersion', () => {
  for (let maxVer = 5; maxVer <= 6; maxVer++) {
    for (let sinceVer = 1; sinceVer <= maxVer; sinceVer++) {
      test('checks bad version', () => {
        const bv = new BadVersion((n) => {
          return n >= sinceVer
        })

        expect(bv.firstBadVersion(maxVer)).toBe(sinceVer)
      })
    }
  }
})
