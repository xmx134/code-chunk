// 登录验证码倒计时基本实现

<template>
  <a-row>
    <a-col :span="12" class="login-area">
      <a-form layout="vertical" :model="form" :rules="rules" ref="loginForm">
        <p class="subTitle">使用手机号码和验证码登录</p>
        <a-form-item label="手机号码" required name="cellphone">
          <a-input placeholder="手机号码" v-model:value="form.cellphone">
            <template v-slot:prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>
        <a-form-item label="验证码" required name="verifyCode">
          <a-input placeholder="四位验证码" v-model:value="form.verifyCode">
            <template v-slot:prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" size="large" @click="login" :loading="isLoginLoading"> 登录 </a-button>
          <a-button size="large" :style="{ marginLeft: '20px' }" :disabled="codeButtonDisable" @click="getCode">
            {{ counter === 60 ? '获取验证码' : `${counter}秒后重发` }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref, computed, watch } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useForm } from '@ant-design-vue/use'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { Rule } from 'ant-design-vue/es/form/interface'
import { GlobalDataProps } from '../store/index'
interface RuleFormInstance {
  validate: () => Promise<any>
}

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const isLoginLoading = computed(() => store.getters.isOpLoading('login'))
    const router = useRouter()
    const counter = ref(60)
    let timer = 0
    const loginForm = ref() as Ref<RuleFormInstance>
    const form = reactive({
      cellphone: '',
      verifyCode: ''
    })
    const codeButtonDisable = computed(() => {
      return !/^1[3-9]\d{9}$/.test(form.cellphone.trim()) || counter.value < 60
    })
    // 倒计时核心方法，startCounter与watch。一个让倒计时走完整个流程，另一个复原倒计时
    const startCounter = () => {
      counter.value--
      timer = window.setInterval(() => {
        counter.value--
      }, 1000)
    }
    watch(counter, newValue => {
      if (newValue === 0) {
        clearInterval(timer)
        counter.value = 60
      }
    })

    // 手机号的校验通过异步调用，当手机号输入500毫秒后执行。
    // 可以提升用户体验，不至于一输入就说手机号输错了，也可以节流，在手机号输完后才进行逻辑校验
    const cellnumberValidator = (rule: Rule, value: string) => {
      return new Promise((resolve, reject) => {
        // 手机号正则校验
        const passed = /^1[3-9]\d{9}$/.test(value.trim())
        setTimeout(() => {
          if (passed) {
            resolve('')
          } else {
            reject('手机号码格式不正确')
          }
        }, 500)
      })
    }
    const rules = reactive({
      cellphone: [
        { required: true, message: '手机号码不能为空', trigger: 'blur' },
        // { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        { asyncValidator: cellnumberValidator, trigger: 'blur' }
      ],
      verifyCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
    })
    const { validate, resetFields } = useForm(form, rules)
    const login = () => {
      validate().then(() => {
        const payload = {
          phoneNumber: form.cellphone,
          veriCode: form.verifyCode
        }
        // 数据更新，页面跳转。这里是唯一一处跟外界交互的地方
        store.dispatch('loginAndFetch', { data: payload }).then(() => {
          message.success('登录成功 2秒后跳转首页')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        })
      })
    }

    const getCode = () => {
      axios.post('/users/genVeriCode', { phoneNumber: form.cellphone }).then(() => {
        message.success('验证码已发送，请注意查收', 5)
        startCounter()
      })
    }
    return {
      form,
      rules,
      loginForm,
      login,
      codeButtonDisable,
      getCode,
      counter,
      isLoginLoading
    }
  }
})
</script>
