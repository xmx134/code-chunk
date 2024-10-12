type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue }
type Obj = Record<string, JSONValue> | Array<JSONValue>

// compactObject 函数在涉及处理和操作 JSON 数据的 JavaScript 应用程序中可以是一个强大的工具。
// 它的主要功能是清除具有假值的键的对象（或数组，在 JavaScript 中被视为具有索引作为键的对象），
// 包括嵌套的键。以下是一些通用领域，这些功能可能有用：
// 数据清洗：在许多现实世界应用程序中，数据经常以不同格式从各种来源获取，
// 有时包含不必要的键或具有假值的键。使用 compactObject 可以在进一步处理之前清理这些数据。
// 例如，如果我们有一个嵌套对象，如 var obj = { key1: "", key2: { key3: null, key4: "value" }}，
// compactObject 将返回 { key2: { key4: "value" }}，有效地消除了空值或 null 值。
// API 响应处理：在与第三方 API 的响应一起工作时，发现具有假值的键并不是不常见的，
// 如果不妥善处理可能会导致问题。compactObject 可用于删除这些键，确保 API 响应更清洁，
// 对于后续操作更可预测。
// UI 渲染：在将数据渲染到用户界面之前，移除任何具有假值的键可以创建更清洁的用户界面。
// 例如，考虑一个 UI 组件，需要一个对象来显示用户配置文件。
// 如果对象包括具有 null 或 undefined 值的字段，可能会导致 UI 中出现空白或错误。
// 通过使用 compactObject，我们可以在将对象传递给 UI 组件之前删除这些字段。
// 优化存储：在存储数据时，使用 compactObject 来删除具有假值的键可以帮助优化存储利用率，
// 确保只保存有意义的数据。
// 需要注意的是，compactObject 的使用高度依赖于应用程序的特定要求和上下文。
// 可能存在保留具有假值的键是必要的情况。因此，在决定应用此函数之前，请始终考虑你的具体用例。
function compactObject(obj: Obj): Obj {
  function dfs(obj: any): any {
    if (!obj) return false
    if (typeof obj !== 'object') return obj

    if (Array.isArray(obj)) {
      const newArr: any[] = []
      for (let i = 0; i < obj.length; i++) {
        const curr = obj[i]
        const subRes = dfs(curr)
        if (subRes) {
          newArr.push(subRes)
        }
      }
      return newArr
    }
    const newObj: Obj = {}

    for (const key in obj) {
      const subRes = dfs(obj[key])
      if (subRes) {
        newObj[key] = subRes
      }
    }
    return newObj
  }
  return dfs(obj)
}
