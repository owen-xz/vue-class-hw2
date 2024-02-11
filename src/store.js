import { defineStore } from 'pinia'
import axios from 'axios'
import { getConfig } from './assets/mixins'
import { useLoading } from 'vue-loading-overlay'
const loading = useLoading()
export const useStore = defineStore('store', {
  state: () => ({
    pageData: {
      totalPages: 1,
      nowPage: 1,
    },
    adminProducts: [],
    viewProduct: null,
    viewProductModal: null,
    editProduct: null,
    editProductModal: null,
    delProduct: null,
    delProductModal: null,
    cart: null,
    cartModal: null
  }),
  getters: {
    totalCartPrice: (state) => {
      if(state.cart) {
        let sum = 0
        state.cart.forEach(item => {
          sum += item.qty * item.price
        })
        return sum
      } else {
        return 0
      }
    }
  },
  actions: {
    initPageData() {
      this.pageData = {
        totalPages: 1,
        nowPage: 1,
      }
    },
    async getAdminProducts(page = 1) {
      const loader = loading.show()
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
            import.meta.env.VITE_HEXAPI_PATH
          }/admin/products?page=${page}`,
          getConfig()
        )
        this.adminProducts = res.data.products
        this.pageData.totalPages = res.data.pagination.total_pages
        loader.hide()
      } catch (err) {
        alert(err.response?.data?.message)
        loader.hide()
      }
    },
    async getCart() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_HEXAPI_URL}/V2/api/${import.meta.env.VITE_HEXAPI_PATH}/cart`)
        this.cart = res.data.data.carts
          .map(item => {
            return {
              id: item.id,
              productId: item.product_id,
              title: item.product.title,
              price: item.product.price,
              qty: item.qty
            }
          })
      } catch (err) {
        alert(err.response?.data?.message)
      }
    },
    async addCart (productId) {
      const data = {
        data: {
          product_id: productId,
          qty: 1,
        },
      }
      try {
        const loader = loading.show()
        const res = await axios.post(
          `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
            import.meta.env.VITE_HEXAPI_PATH
          }/cart`,
          data
        )
        const index = this.cart.findIndex((item) => item.productId === productId)
        if (index === -1) {
          this.cart.push({
            id: res.data.data.id,
            productId: res.data.data.product_id,
            title: res.data.data.product.title,
            price: res.data.data.product.price,
            qty: res.data.data.qty,
          })
        } else {
          this.cart[index].qty++
        }
        alert(res.data.message)
        loader.hide()
      } catch (err) {
        alert(err.response?.data?.message)
        loader.hide()
      }
    },
    async changeCartQty(index, cart) {
      if (typeof cart.qty !== 'number') return
      if (cart.qty > 0) {
        const data = {
          data: {
            product_id: cart.productId,
            qty: cart.qty,
          },
        }
        try {
          await axios.put(
            `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
              import.meta.env.VITE_HEXAPI_PATH
            }/cart/${cart.id}`,
            data
          )
        } catch (err) {
          alert(err.response?.data?.message)
        }
      } else {
        try {
          await axios.delete(
            `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
              import.meta.env.VITE_HEXAPI_PATH
            }/cart/${cart.id}`
          )
          this.cart.splice(index, 1)
        } catch (err) {
          alert(err.response?.data?.message)
        }
      }
    },
    async cleanCart() {
      const loader = loading.show()
      try {
        await axios.delete(
          `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
            import.meta.env.VITE_HEXAPI_PATH
          }/carts`
        )
        this.cart = []
        loader.hide()
      } catch (err) {
        alert(err.response?.data?.message)
        loader.hide()
      }
    }
  },
})