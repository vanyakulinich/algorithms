def insertion_sort(nums_list):
    if len(nums_list) <= 1:
        return nums_list

    LOOP_START_IDX = 1  # start loop from second element
    for idx in range(LOOP_START_IDX, len(nums_list)):
        # save value of current element
        pivot = nums_list[idx]
        inner_idx = idx-1
        # we go back to the start of list in loop
        while inner_idx >= 0 and nums_list[inner_idx] > pivot:
            nums_list[inner_idx+1] = nums_list[inner_idx]
            inner_idx -= 1
        # put current element value back into list
        nums_list[inner_idx+1] = pivot

    return nums_list


if __name__ == '__main__':
    nums_list = [12, 11, 13, 5, 6, 4, 3, 6, 1, 7, 2, 9, 0, 8, 5, 0]
    result = insertion_sort(nums_list)
    print(result)
