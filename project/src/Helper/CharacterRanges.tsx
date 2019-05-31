function CharacterRanges(start: string = 'a', stop: string = 'z') {
  let idx: number;
  let end: number;
  
  const result = [];
  
  for (idx = start.charCodeAt(0), end = stop.charCodeAt(0); idx <= end; ++idx) {
    result.push(String.fromCharCode(idx));
  }
  
  return result;
}

export default CharacterRanges;
