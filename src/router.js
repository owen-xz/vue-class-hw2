import axios from 'axios'
import { getConfig } from '@/assets/mixins'
import { createRouter, createWebHashHistory } from 'vue-router'
import ProductManagement from './view/ProductManagement.vue'
import Login from './view/Login.vue'
import ProductList from './view/ProductList.vue'
import Cart from './view/Cart.vue'

const loginCheck = async(to, from) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_HEXAPI_URL}/v2/api/user/check`,
      {},
      getConfig()
    )
  } catch (err) {
    alert(err.response?.data?.message)
    return {path: '/login'}
  }
}

const routes = [
  { path: '/', component: ProductList },
  { path: '/admin', component: ProductManagement, beforeEnter: loginCheck },
  { path: '/login', component: Login },
  { path: '/cart', component: Cart },
]

export default createRouter({
  history: createWebHashHistory(),
  routes, 
})