// 使用 axios 的拦截器来处理请求和响应
// 以下是一个基础的axios模板，包含了请求拦截器、响应拦截器

// 引入 axios
import axios from 'axios'

// 创建 axios 实例
const instance = axios.create({
  // baseURL：设置了所有请求的基础 URL，避免在每个请求中重复输入相同的 URL 前缀。
  // timeout：设置了请求超时时间，超过这个时间如果请求还未完成，就会触发超时错误。
  // headers：可以设置默认的请求头信息，这里设置了常见的 JSON 数据交互所需的内容类型和接受类型。
  // paramsSerializer：用于对请求参数进行序列化处理，这里使用了qs库来序列化参数，并设置了数组参数的序列化格式为方括号形式。
  baseURL: 'https://your-api-base-url.com', // 设置基础 URL，确保所有请求都以此为前缀
  timeout: 5000, // 设置请求超时时间，单位为毫秒。这里设置为 5 秒
  headers: {
    'Content-Type': 'application/json', // 设置默认的请求头内容类型为 JSON
    Accept: 'application/json' // 设置接受的响应内容类型为 JSON
  },
  paramsSerializer: function (params) {
    // 对请求参数进行序列化处理
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})
// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 获取存储中的令牌（如果有）
    const token = localStorage.getItem('token')
    // 如果令牌存在，添加到请求头中
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // 返回配置对象，让请求继续发送
    return config
  },
  error => {
    // 如果请求拦截器出现错误，返回错误对象
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 获取响应数据
    const data = response.data
    // 假设服务器返回的数据格式为 { success: true, data: {...actualData } }
    if (data.success) {
      // 如果成功，返回实际数据
      return data.data
    } else {
      // 如果不成功，抛出错误
      throw new Error(data.message)
    }
  },
  error => {
    // 如果响应拦截器出现错误，返回错误对象
    return Promise.reject(error)
  }
)

// 可以将 axios 实例导出，以便在其他模块中使用
export default instance
