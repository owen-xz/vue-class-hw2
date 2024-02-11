<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoading } from 'vue-loading-overlay'
import * as Yup from 'yup'
import Form from '../components/Form.vue'

const router = useRouter()
const loading = useLoading()
const formSchema = ref({
  fields: [
    {
      label: 'Email',
      name: 'username',
      as: 'input',
      type: 'email',
      placeholder: 'name@example.com',
      rules: Yup.string().email('Email 格式錯誤').required('Email 不得爲空'),
    },
    {
      label: '密碼',
      name: 'password',
      as: 'input',
      type: 'password',
      placeholder: 'Password',
      rules: Yup.string().required('密碼不得爲空'),
    },
  ],
})
const formData = ref({
  username: '',
  password: '',
})
const login = async (data) => {
  const loader = loading.show()
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_HEXAPI_URL}/v2/admin/signin`,
      data
    )
    const { token, expired } = res.data
    document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
    loader.hide()
    router.push('/')
  } catch (err) {
    alert(err.response?.data?.message)
    loader.hide()
  }
}
</script>

<template>
  <div class="container text-center pt-5">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="form-signin text-start">
        <Form :schema="formSchema" :submitBtn="'登入'" @onSubmit="login" />
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
  </div>
</template>

<style scoped>
.form-signin {
  max-width: 330px;
}
</style>
