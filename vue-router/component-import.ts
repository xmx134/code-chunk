import { createRouter, createWebHistory } from 'vue-router'

// 记录动态导入的作用
// 本代码块中editor页面的导入方式就是动态导入
// 什么时候需要使用动态导入：
// 1、懒加载（代码分割）以优化性能
//  大型应用场景：在大型的单页应用（SPA）中，例如一个包含多个功能模块的企业级 Web 应用，
//   初始加载时如果把所有的组件和脚本都加载进来，会导致页面加载时间过长。
//   动态导入可以将应用程序划分为更小的块，只在需要的时候加载特定的组件或模块。
//   比如一个电商应用，有商品展示模块、购物车模块、用户订单模块等。
//   当用户访问商品展示页面时，只有商品展示相关的组件和脚本需要立即加载，
//   而购物车和订单模块可以在用户点击相应链接时再动态导入。
//  减少初始加载大小：以一个包含多种图表组件（柱状图、折线图、饼图等）的数据分析应用为例。
//   如果一次性加载所有图表组件的代码，会使初始包体积过大。通过动态导入，在用户需要查看某种特定图表时，
//   再加载对应的图表组件代码，这样可以显著减小初始加载的 JavaScript 包大小，提高应用的首次加载速度。
// 2、条件加载组件或模块
//  用户权限相关场景：在一个具有不同用户角色（如管理员、普通用户、访客）的应用中，
//   根据用户的角色动态加载不同的功能组件。例如，对于一个内容管理系统，
//   管理员可能有添加、删除和编辑内容的组件，而普通用户只有查看内容的组件。
//   当用户登录并经过身份验证后，根据其角色权限动态导入相应的组件。
//  功能按需使用场景：考虑一个多功能的文档编辑应用，它支持文本编辑、表格编辑、图形绘制等多种功能。
//   不是所有用户都会使用所有功能，所以可以根据用户的操作动态导入相应的功能组件。
//   比如，当用户点击插入表格按钮时，动态导入表格编辑组件。
// 3、处理动态模块加载（如插件系统）
//  插件式应用场景：在一些具有插件扩展功能的应用中，如代码编辑器或者图形设计软件。
//   这些应用可以通过动态导入来加载用户安装的插件。
//   例如，一个代码编辑器允许用户安装各种语法检查插件、代码格式化插件等。
//   当用户启用某个插件时，应用通过动态导入加载该插件的代码，实现插件的功能。
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        { path: '', name: 'home', component: Home, meta: { title: '欢迎来到慕课乐高' } },
        { path: 'template/:id', name: 'template', component: TemplateDetail, meta: { title: '模版详情' } },
        { path: 'works', name: 'works', component: Works, meta: { title: '我的作品', requiredLogin: true } }
      ]
    },
    {
      path: '/editor/:id',
      name: 'editor',
      component: () => import(/* webpackChunkName: "editor" */ '../views/Editor.vue'),
      meta: { requiredLogin: true, title: '编辑我的设计' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
      meta: { redirectAlreadyLogin: true, title: '登录到慕课乐高', disableLoading: true }
    }
  ]
})
