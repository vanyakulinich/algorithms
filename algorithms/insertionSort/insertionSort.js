const insertionSort = (arr = []) => {
  if (arr.length <= 1) return arr;

  const LOOP_START_IDX = 1; // start loop from second element
  for (let idx = LOOP_START_IDX; idx < arr.length; idx++) {
    // save value of current element
    const pivot = arr[idx];
    let innerInx = idx - 1;
    // we go back to the start of list in loop
    while (innerInx >= 0 && arr[innerInx] > pivot) {
      arr[innerInx + 1] = arr[innerInx];
      innerInx--;
    }
    // put current element value back into list
    arr[innerInx + 1] = pivot;
  }

  return arr;
};

(() => {
  const arr = [12, 11, 13, 5, 6, 4, 3, 6, 1, 7, 2, 9, 0, 8, 5, 0];
  const result = insertionSort(arr);
  console.log(result);
})();
