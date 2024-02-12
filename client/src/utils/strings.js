// Title case a string. Guaranteed to work regardless of user input
function titleCaseString(string) {
  const capWords = [];
  for (const word of string.split(' ')) {
      capWords.push(word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase());
  }
  return capWords.join(' ');
}

export {
  titleCaseString
}