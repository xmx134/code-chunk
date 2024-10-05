import { createStore, ActionContext } from 'vuex'

import templates, { TemplatesProps } from './templates'
import user, { UserProps } from './user'
import editor, { EditorProps } from './editor'
import global, { GlobalStatus } from './global'

// 在全局根数据注册以下四组数据
export interface GlobalDataProps {
  user: UserProps
  templates: TemplatesProps
  editor: EditorProps
  global: GlobalStatus
}

//   通过vuex中的modules进行分包管理
const store = createStore({
  modules: {
    user,
    templates,
    editor,
    global
  }
})

export default store
