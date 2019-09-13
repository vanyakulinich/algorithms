from math import floor as round_num_down
import random


# quick sort when pivot is selected as median of list
def quick_sort_median_pivot(nums_list=[], left_pointer=0, right_pointer=None):
    if right_pointer is None:
        right_pointer = len(nums_list)-1
    if left_pointer >= right_pointer:
        return nums_list

    def _partition(nums_list, left_pointer, right_pointer):
        pivotIndex = round_num_down((left_pointer+right_pointer)/2)
        pivot = nums_list[pivotIndex]

        while left_pointer <= right_pointer:

            while nums_list[left_pointer] < pivot:
                left_pointer += 1

            while nums_list[right_pointer] > pivot:
                right_pointer -= 1

            if left_pointer <= right_pointer:
                nums_list[left_pointer], nums_list[right_pointer] = nums_list[right_pointer], nums_list[left_pointer]
                left_pointer += 1
                right_pointer -= 1
        return left_pointer

    pivot_index = _partition(nums_list, left_pointer, right_pointer)
    if left_pointer < pivot_index-1:
        quick_sort_median_pivot(nums_list, left_pointer, pivot_index-1)
    if pivot_index < right_pointer:
        quick_sort_median_pivot(nums_list, pivot_index, right_pointer)
    return nums_list


# qick sort when pivot is the first element of list
def quicksort_start_element_pivot(array, start_element=0, end_element=None):
    if end_element is None:
        end_element = len(array) - 1

    def _partition(array, start, end):
        pivot = start
        for i in range(start+1, end+1):
            if array[i] <= array[start]:
                pivot += 1
                array[i], array[pivot] = array[pivot], array[i]
        array[pivot], array[start] = array[start], array[pivot]
        return pivot

    def _quicksort(array, start, end):
        if start >= end:
            return
        pivot = _partition(array, start, end)
        _quicksort(array, start, pivot-1)
        _quicksort(array, pivot+1, end)
        return array

    return _quicksort(array, start_element, end_element)


if __name__ == "__main__":
    LIMIT = 100
    nums_list = [random.randint(0, LIMIT) for _ in range(LIMIT)]

    result_with_median_pivot = quick_sort_median_pivot(nums_list)
    print(result_with_median_pivot)

    result_with_start_element_pivot = quicksort_start_element_pivot(nums_list)
    print(result_with_start_element_pivot)
