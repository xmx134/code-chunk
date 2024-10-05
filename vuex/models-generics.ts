// Vuex 和泛型的基本背景
// 在 Vuex 中，泛型可以用于增加类型安全性和代码的可维护性。
// <S, R>这种形式通常是用于定义类型参数，其中S和R是自定义的类型变量，
// 代表了不同的类型概念。

// S参数（状态类型）
// 在 Vuex 的上下文中，S通常代表状态（State）类型。
// 例如，当创建一个 Vuex 模块时，会有一个状态对象来存储模块相关的数据。
// 通过使用泛型参数S，可以明确地定义这个状态对象的类型。
// 假设你有一个简单的用户模块，状态对象可能包含用户信息，如用户名、年龄、邮箱等。
// 你可以定义一个接口来表示这个状态类型：
interface UserState {
  username: string
  age: number
  email: string
}
// 当在 Vuex 模块中使用泛型时，S可以被替换为UserState，这样就确保了状态对象的操作是类型安全的。
// 例如，在一个 mutation 函数中，参数的类型会根据S（也就是UserState）来检查。

// R参数（可能是根状态类型或其他相关类型）
// R的含义可能因具体的使用场景而有所不同。在一些情况下，它可能代表根状态（Root State）类型。
// 这对于在模块中访问整个应用的根状态很有用。
// 例如，假设你的应用有一个全局的配置状态在根状态中，并且在一个子模块中需要访问这个配置信息。
// 通过定义R为包含这个全局配置状态的类型，就可以在子模块中以类型安全的方式访问根状态。
// 另一种可能是R代表与模块相关的其他某种返回类型（Result Type）或者相关类型集合。
// 比如，在定义一个模块的 getter 函数时，R可以用于定义这个 getter 返回数据的类型，
// 或者与这个返回类型相关的其他辅助类型。

// 实际使用示例
// 以下是一个简单的 Vuex 模块定义，展示了如何使用泛型参数<S, R>：
import { Module } from 'vuex'
const userModule: Module<S, R> = {
  namespaced: true,
  state: () => ({
    // 假设这里的状态符合UserState类型
    username: 'defaultUser',
    age: 0,
    email: 'default@email.com'
  }),
  mutations: {
    updateUsername(state: S, newUsername: string) {
      state.username = newUsername
    }
  },
  getters: {
    getUserEmail(state: S): string {
      return state.email
    }
  }
}
// 在这个例子中，S会在编译时被检查是否符合模块状态（state）实际定义的类型结构，
// 而R如果用于表示根状态等相关类型，
// 也可以在模块需要访问根状态的操作（如某些复杂的 getter 函数）中发挥作用。
// 通过传入<S, R>这些泛型参数，可以让代码在类型系统的支持下更加健壮和易于理解。
