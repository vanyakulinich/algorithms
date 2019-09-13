// const generateArr = limit => {
//   const arr = [];
//   while (limit) {
//     arr.push(Math.round(10 - Math.random() * 10));
//     limit--;
//   }
//   return arr;
// };

const _partition = (arr, left, right) => {
  const pivotIndex = Math.floor((left + right) / 2);
  const pivotValue = arr[pivotIndex];

  while (left <= right) {
    while (arr[left] < pivotValue) {
      left++;
    }

    while (arr[right] > pivotValue) {
      right--;
    }

    if (left <= right) {
      const temp = arr[left] + arr[right];
      arr[right] = temp - arr[right];
      arr[left] = temp - arr[right];
      left++;
      right--;
    }
  }
  return left;
};

const quickSortMiddlePivot = (
  arr = [],
  leftPointer = 0,
  rightPointer = null
) => {
  if (!rightPointer) rightPointer = arr.length - 1;

  if (leftPointer >= rightPointer) return arr;

  const pivotIndex = _partition(arr, leftPointer, rightPointer);
  if (leftPointer < pivotIndex - 1) {
    quickSortMiddlePivot(arr, leftPointer, pivotIndex - 1);
  }
  if (pivotIndex < rightPointer) {
    quickSortMiddlePivot(arr, pivotIndex, rightPointer);
  }

  return arr;
};

const main = () => {
  // const LIMIT = 10;
  // const arr = generateArr(LIMIT);
  // console.log(arr);
  const result = quickSortMiddlePivot([4, 3, 6, 1, 7, 2, 9, 0, 8, 5, 0]);
  console.log(result);
};

main();
