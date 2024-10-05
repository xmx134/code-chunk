// import写在这里只是一个展示作用，提示各个变量的来源
import { createRouter } from 'vue-router'
import axios from 'axios'
import { message } from 'ant-design-vue'
import store from '../store'

const router = createRouter({})
// 这段代码是一个 Vue Router 的导航守卫，用于在路由切换前进行一些逻辑判断和处理。
// 主要目的是根据用户的登录状态和路由的元信息来决定是否需要进行重定向或其他操作，
// 同时设置页面标题。
router.beforeEach(async (to, from) => {
  const { user } = store.state
  const { token, isLogin } = user
  const { redirectAlreadyLogin, requiredLogin, title } = to.meta
  if (title) {
    document.title = title
  }
  if (!isLogin) {
    if (token) {
      // 设置 Axios 的默认请求头，添加带有令牌的 Authorization 字段，用于后续的请求验证。
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      try {
        await store.dispatch('fetchCurrentUser')
        if (redirectAlreadyLogin) {
          return '/'
        }
      } catch {
        message.error('登陆状态已过期 请重新登陆', 2)
        store.commit('logout')
        return '/login'
      }
    } else {
      if (requiredLogin) {
        return '/login'
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      return '/'
    }
  }
})
