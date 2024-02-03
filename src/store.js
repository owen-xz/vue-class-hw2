import { defineStore } from 'pinia'
import axios from 'axios'
import { getConfig } from './assets/mixins'
export const useStore = defineStore('store', {
  state: () => ({
    pageData: {
      totalPages: 1,
      nowPage: 1,
    },
    adminProducts: [],
    editProduct: null,
    editProductModal: null,
    delProduct: null,
    delProductModal: null,
    cart: null,
    cartModal: null
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    async getAdminProducts(page = 1) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
            import.meta.env.VITE_HEXAPI_PATH
          }/admin/products?page=${page}`,
          getConfig()
        )
        this.adminProducts = res.data.products
        this.pageData.totalPages = res.data.pagination.total_pages
      } catch (err) {
        alert(err.response?.data?.message)
      }
    },
    async getCart() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_HEXAPI_URL}/V2/api/${import.meta.env.VITE_HEXAPI_PATH}/cart`)
        this.cart = res.data.data.carts
          .filter(item => item.qty > 0)
          .map(item => {
            return {
              id: item.id,
              productId: item.product_id,
              title: item.product.title,
              qty: item.qty
            }
          })
      } catch (err) {
        alert(err.response?.data?.message)
      }
    }
  },
})