const mergeSort = (unsortedArray = []) => {
  if (unsortedArray.length <= 1) return unsortedArray;

  const middleOfArr = Math.round(unsortedArray.length / 2);
  const leftArr = unsortedArray.slice(0, middleOfArr);
  const rightArr = unsortedArray.slice(middleOfArr);

  function _merge(leftPartArr, rightPartArr) {
    const resultArray = [];
    let leftCursor = 0;
    let rightCursor = 0;
    while (
      leftCursor < leftPartArr.length &&
      rightCursor < rightPartArr.length
    ) {
      if (leftPartArr[leftCursor] < rightPartArr[rightCursor]) {
        resultArray.push(leftPartArr[leftCursor]);
        leftCursor++; // move left array cursor
      } else {
        resultArray.push(rightPartArr[rightCursor]);
        rightCursor++; // move right array cursor
      }
    }
    return resultArray
      .concat(leftPartArr.slice(leftCursor))
      .concat(rightPartArr.slice(rightCursor));
  }

  return _merge(mergeSort(leftArr), mergeSort(rightArr));
};

// test array
const arr = [4, 3, 6, 1, 7, 2, 9, 0, 8, 5];

const sortedArr = mergeSort(arr);
console.log(sortedArr);
