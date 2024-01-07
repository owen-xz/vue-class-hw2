import axios from 'axios'
import { createRouter, createWebHashHistory } from 'vue-router'
import ProductManagement from './view/ProductManagement.vue'
import Login from './view/Login.vue'

const loginCheck = async(to, from) => {
  try {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('hexToken='))
      ?.split('=')[1]
    const config = {
      headers: { Authorization: token },
    }
    await axios.post(
      `${import.meta.env.VITE_HEXAPI_URL}/v2/api/user/check`,
      {},
      config
    )
  } catch (err) {
    console.log(err.response)
    alert(err.response?.data?.message)
    return {path: '/login'}
  }
}

const routes = [
  { path: '/', component: ProductManagement, beforeEnter: loginCheck },
  { path: '/login', component: Login },
]

export default createRouter({
  history: createWebHashHistory(),
  routes, 
})