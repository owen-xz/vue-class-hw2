<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { getConfig } from '@/assets/mixins'
import { Modal } from 'bootstrap'
import ProductModal from '../components/ProductModal.vue'
import DeleteProductModal from '../components/DeleteProductModal.vue'
import Pagination from '../components/Pagination.vue'

const pageData = ref({
  totalPages: 1,
  nowPage: 1,
})

const products = ref([])
const product = ref({
  id: '',
  title: '',
  category: '',
  origin_price: null,
  price: null,
  unit: '',
  description: '',
  content: '',
  is_enabled: 1,
  imageUrl: '',
  imagesUrl: [],
})
const delProduct = ref({
  id: '',
  title: '',
})

const productModal = ref(null)
const delProductModal = ref(null)

const getProducts = async (page = 1) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
        import.meta.env.VITE_HEXAPI_PATH
      }/admin/products?page=${page}`,
      getConfig()
    )
    products.value = res.data.products
    pageData.value.totalPages = res.data.pagination.total_pages
  } catch (err) {
    alert(err.response?.data?.message)
  }
}
const updateList = async () => {
  await getProducts()
  pageData.value.nowPage = 1
  productModal.value.hide()
  delProductModal.value.hide()
}

const changePage = async (page) => {
  await getProducts(page)
  pageData.value.nowPage = page
}

const showProductModal = (item = null) => {
  if (item) {
    const {
      id,
      title,
      category,
      origin_price,
      price,
      unit,
      description,
      content,
      is_enabled,
      imageUrl,
      imagesUrl,
    } = item
    product.value = {
      id,
      title,
      category,
      origin_price,
      price,
      unit,
      description,
      content,
      is_enabled,
      imageUrl,
      imagesUrl,
    }
  } else {
    product.value = {
      id: '',
      title: '',
      category: '',
      origin_price: null,
      price: null,
      unit: '',
      description: '',
      content: '',
      is_enabled: 1,
      imageUrl: '',
      imagesUrl: [],
    }
  }
  productModal.value.show()
}
const showDelProductModal = (id, title) => {
  delProduct.value = {
    id,
    title,
  }
  delProductModal.value.show()
}

onMounted(() => {
  productModal.value = new Modal('#productModal')
  delProductModal.value = new Modal('#delProductModal')
  getProducts()
})
</script>

<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="showProductModal">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">${{ item.origin_price }}</td>
          <td class="text-end">${{ item.price }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="showProductModal(item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="showDelProductModal(item.id, item.title)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :totalPages="pageData.totalPages"
      :nowPage="pageData.nowPage"
      @changePage="changePage"
    />
  </div>
  <!-- Modal -->
  <ProductModal :product="product" @updateList="updateList" />
  <DeleteProductModal :delProduct="delProduct" @updateList="updateList" />
  <!-- Modal -->
</template>

<style scoped></style>
