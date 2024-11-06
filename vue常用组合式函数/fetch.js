// 基础fetch.js,支持一次性调用接口，不支持url修改后重新发送请求
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}

// 组件内部调用方式：
// <script setup>
// import { useFetch } from './fetch.js'

// const { data, error } = useFetch('...')
// </script>
