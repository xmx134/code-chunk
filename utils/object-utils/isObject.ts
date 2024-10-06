// isObject通常会拿来和typeof做比较，因为typeof的作用是快速获取变量基本类型。
// 它们的区别在于：
//   当使用typeof判断一个对象（包括普通对象、数组、null等）时，
//   除了函数会返回"function"，其他大部分情况下都会返回"object"。
// 相比typeof，这种方法提供了更细致的类型区分。
// 它可以准确地识别数组、日期对象（"[object Date]"）、正则表达式对象（"[object RegExp]"）等
// 不同类型的对象，而不仅仅是简单地将它们归为"object"类型。
function isObject(o: any): boolean {
  return Object.prototype.toString.call(o) === '[object Object]'
}

// 以下是对比实例
console.log(typeof {}) // "object"
console.log(typeof []) // "object"
console.log(typeof null) // "object"

console.log(Object.prototype.toString.call({})) // "[object Object]"
console.log(Object.prototype.toString.call([])) // "[object Array]"
console.log(Object.prototype.toString.call(null)) // "[object Null]"
