export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  var index = 0;
  var arrayLength = array.length;
  var tempArray = [];
  
  for (index = 0; index < arrayLength; index += chunkSize) {
    const myChunk = array.slice(index, index + chunkSize);
    tempArray.push(myChunk);
  }

  return tempArray;
}