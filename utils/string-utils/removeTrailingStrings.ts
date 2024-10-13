// 移除字符串前后多余的指定char字符
function removeTrailingStrings(str: string, char: string): string {
  function check(str: string, isStart: boolean): string {
    if (isStart) {
      if (str[0] === char) {
        str = str.substring(1)
        str = check(str, true)
      }
    } else {
      if (str[str.length - 1] === char) {
        str = str.substring(0, str.length - 1)
        str = check(str, false)
      }
    }
    return str
  }
  str = check(str, true)
  str = check(str, false)
  return str
}
