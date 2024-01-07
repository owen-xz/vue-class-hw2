<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const formData = ref({
  username: '',
  password: '',
})
const login = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_HEXAPI_URL}/v2/admin/signin`,
      formData.value
    )
    const { token, expired } = res.data
    document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
    router.push('/')
  } catch (err) {
    console.log(err.response)
  }
}
</script>

<template>
  <div class="container text-center pt-5">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
              v-model="formData.username"
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
              v-model="formData.password"
            />
            <label for="password">Password</label>
          </div>
          <button
            class="btn btn-lg btn-primary w-100 mt-3"
            type="submit"
            @click.prevent="login"
          >
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
  </div>
</template>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
