// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
function isAlphabetEven(string) {
  const alphabets = [...new Set(string.split(""))];
  let isEven = true;
  alphabets.forEach((alphabet) => {
    alphabetCount = string.split(alphabet).length - 1;
    isEven = isEven && alphabetCount % 2 === 0;
  });

  return isEven;
}

function solution(S) {
  let biggestEven = S.length - (S.length % 2);
  for (let stringLength = biggestEven; stringLength >= 2; stringLength -= 2) {
    for (
      let startPosition = 0;
      startPosition <= S.length - stringLength;
      startPosition += 1
    ) {
      const isEven = isAlphabetEven(
        S.slice(startPosition, startPosition + stringLength)
      );
      if (isEven) return stringLength;
    }
  }

  return 0;
}
