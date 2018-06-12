export const urlify = (charArr, trueLength: number) => {
  if (trueLength <= 2) return charArr

  let spaceCount = 0
  for (let i = 2; i < charArr.length; i++) {
    if (_hasSpaceBefore(charArr, i)) {
      spaceCount++
    }
  }

  for (let i = charArr.length - 1; i >= 0; i--) {
    if (charArr[i] === ' ') {
      charArr[i] = '20'
      charArr[i - 1] = '%'
    } else {
      charArr[i] = charArr[i - spaceCount]
      spaceCount--
    }
  }

  return charArr
}

function _hasSpaceBefore(charArr: [string], index: number): boolean {
  if (charArr[index - 2] !== ' ' &&
      charArr[index - 1] === ' ' &&
      charArr[index] !== ' ') {
    return true
  }

  return false
}


