export class BadVersion {
  private _isBadVersion: (n: number) => boolean

  constructor(isBadVersion: (n: number) => boolean) {
    this._isBadVersion = isBadVersion
  }

  firstBadVersion(n: number): number {
    return this._checkBad(1, n)
  }

  private _checkBad(from: number, to: number): number {
    if (from === to) return from
    if (from === to - 1) {
      if (this._isBadVersion(from)) return from
      if (this._isBadVersion(to)) return to
    }

    const mid = Math.floor((from + to) / 2)
    if (this._isBadVersion(mid)) {
      return this._checkBad(from, mid)
    } else {
      return this._checkBad(mid, to)
    }
  }
}
