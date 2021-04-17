def merge_sort(nums_list=[]):

    if len(nums_list) <= 1:
        return nums_list

    half_of_list = round(len(nums_list) / 2)
    left_list = nums_list[:half_of_list]
    right_list = nums_list[half_of_list:]

    def _merge(left_list, right_list):
        left_cursor = 0
        right_cursor = 0
        result_list = []
        while(left_cursor < len(left_list) and right_cursor < len(right_list)):
            if left_list[left_cursor] > right_list[right_cursor]:
                result_list.append(right_list[right_cursor])
                right_cursor += 1
            else:
                result_list.append(left_list[left_cursor])
                left_cursor += 1
        return result_list + left_list[left_cursor:] + right_list[right_cursor:]

    return _merge(merge_sort(left_list), merge_sort(right_list))


if __name__ == "__main__":
    # test lists
    nums_list = [4, 3, 6, 1, 7, 2, 9, 0, 8, 5, 0]
    # nums_list = [4, 3, 6, 1, 7]
    sorted_list = merge_sort(nums_list)
    print(sorted_list)
