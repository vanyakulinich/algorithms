/**
 * One of popular algorithmic tasks: Validation of string with brackets
 *
 * String can include only "[", "(" and "{" brackets and its matches, e.g. "[]{}()"
 * The string is valid when brackets are "paired":
 * "[]{}()" - valid
 * "[]{})" - not valid
 * "[{}]" - valid
 * "[}]" - not valid
 *
 * Task solution:
 * This case is solved via one iteration ( O(n) ) with the help of stack data structure
 */

/**
 * Validation of string with brackets. Returns false is string is empty.
 * Loops the string to check the brackets validation
 * @param str: string
 * @returns boolean
 */
const validateBrackets = (str) => {
  if (!str) return false
  const BRACKETS_PAIRS = {
    '{': '}',
    '}': '{',
    '(': ')',
    ')': '(',
    '[': ']',
    ']': '[',
  }
  const stack = []
  const splitted = str.split('')

  for (const b of splitted) {
    if (!stack.length) {
      stack.push(b)
    } else {
      const upperStackItem = stack[stack.length - 1]
      if (upperStackItem === BRACKETS_PAIRS[b]) {
        stack.pop()
      } else {
        if (stack[stack.length - 2] === BRACKETS_PAIRS[b]) {
          // optimize loop: in case single bracket is inside valid ones
          return false
        }
        stack.push(b)
      }
    }
  }
  return !stack.length
}

/**
 *  Strings for validations
 */
const bracketsStrList = [
  '(){}',
  '(){[{{(}}](){}}',
  '{([])}',
  '{{}}({[{)]',
  '([{}])()[',
  '(',
  '{}(',
  '',
]

const validatedStringsList = bracketsStrList.map((string) => ({
  string,
  isValid: validateBrackets(string),
}))
console.log({ validatedStringsList })
