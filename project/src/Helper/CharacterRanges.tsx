function CharacterRanges(start: string = 'a', stop: string = 'z') {
  const result = [];
  
  for (let idx = start.charCodeAt(0), end = stop.charCodeAt(0); idx <= end; ++idx) {
    result.push(String.fromCharCode(idx));
  }
  
  return result;
}

export default CharacterRanges;
