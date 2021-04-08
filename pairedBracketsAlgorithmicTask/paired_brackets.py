'''
One of popular algorithmic tasks: Validation of string with brackets

String can include only "[", "(" and "{" brackets and its matches, e.g. "[]{}()"
The string is valid when brackets are "paired":
 "[]{}()" - valid
 "[]{})" - not valid
 "[{}]" - valid
 "[}]" - not valid

Task solution:
This case is solved via one iteration ( O(n) ) with the help of stack data structure
'''


def validate_bracket_str(string=''):
    '''
      Validation of string with brackets. Returns false is string is empty.
      Loops the string to check the brackets validation

      :param string: string with brackets
      :return: boolean validation result
    '''

    if not string:
        return False

    BRACKETS_PAIRS = {
        '{': '}',
        '}': '{',
        '(': ')',
        ')': '(',
        '[': ']',
        ']': '[',
    }

    stack = []
    splitted_str = list(string)

    for bracket in splitted_str:
        if not len(stack):
            stack.append(bracket)
        else:
            upper_stacked = stack[len(stack)-1]
            if upper_stacked == BRACKETS_PAIRS[bracket]:
                stack.pop()
            else:
                if stack[len(stack)-2] == BRACKETS_PAIRS[bracket]:
                    # optimize loop: in case single bracket is inside valid ones
                    return False
                stack.append(bracket)

    return not bool(len(stack))


# Strings for validations
brackets_str_list = [
    "(){}",
    "(){[{{(}}](){}}",
    "{([])}",
    "{{}}({[{)]",
    "([{}])()[",
    "(",
    "{}(",
    "",
]

# tests
validated_strings_list = list(
    map(
        lambda str: {"string": str, "isValid": validate_bracket_str(str)},
        brackets_str_list
    )
)
print(validated_strings_list)
