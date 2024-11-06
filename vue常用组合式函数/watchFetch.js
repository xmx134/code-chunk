// 响应式Fetch，使用watchEffect()和toValue() API 来重构我们现有的实现。
// 当URL改变时，支持重新fetch。
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    // reset state before fetching..
    data.value = null
    error.value = null

    // toValue()是将 ref 或 getter 规范化为值。如果参数是 ref，它会返回 ref 的值；
    // 如果参数是函数，它会调用函数并返回其返回值。
    // 否则，它会原样返回参数。它的工作方式类似于 unref()，但对函数有特殊处理。
    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}

// 效果展示
{
  const url = ref('/initial-url')

  const { data, error } = useFetch(url)

  // 这将会重新触发 fetch
  url.value = '/new-url'
}

// 或者接收一个getter函数
{
  // 当 props.id 改变时重新 fetch
  const { data, error } = useFetch(() => `/posts/${props.id}`)
}
