<template>
  <div class="container mt-4">
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td style="width: 200px">
            <div
              style="
                height: 100px;
                background-size: cover;
                background-position: center;
              "
              :style="`background-image: url(${item.imageUrl})`"
            ></div>
          </td>
          <td>{{ item.title }}</td>
          <td>
            <del class="h6">原價 {{ item.origin_price }} 元</del>
            <div class="h5">現在只要 {{ item.price }} 元</div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button type="button" class="btn btn-outline-secondary">
                <i class="fas fa-spinner fa-pulse"></i>
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addCart(item.id)"
              >
                <i class="fas fa-spinner fa-pulse"></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :totalPages="store.pageData.totalPages"
      :nowPage="store.pageData.nowPage"
      @changePage="changePage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Pagination from '../components/Pagination.vue'
import { useStore } from '../store'
import { useLoading } from 'vue-loading-overlay'

const store = useStore()
const loading = useLoading()
const products = ref([])
const getProducts = async (page = 1) => {
  const loader = loading.show()
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
        import.meta.env.VITE_HEXAPI_PATH
      }/products?page=${page}`
    )
    products.value = res.data.products
    store.pageData.totalPages = res.data.pagination.total_pages
    loader.hide()
  } catch (err) {
    alert(err.response?.data?.message)
    loader.hide()
  }
}
const changePage = async (page) => {
  await getProducts(page)
  store.pageData.nowPage = page
}
onMounted(() => {
  store.initPageData()
  getProducts()
})

const addCart = async (productId) => {
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
    const index = store.cart.findIndex((item) => item.productId === productId)
    if (index === -1) {
      store.cart.push({
        id: res.data.data.id,
        productId: res.data.data.product_id,
        title: res.data.data.product.title,
        price: res.data.data.product.price,
        qty: res.data.data.qty,
      })
    } else {
      store.cart[index].qty++
    }
    alert(res.data.message)
    loader.hide()
  } catch (err) {
    alert(err.response?.data?.message)
    loader.hide()
  }
}
</script>

<style lang="scss" scoped></style>
