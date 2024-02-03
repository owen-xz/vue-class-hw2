<script setup>
import { onMounted } from 'vue'
import { useStore } from '../store'
import Pagination from '../components/Pagination.vue'

const store = useStore()

const changePage = async (page) => {
  await store.getAdminProducts(page)
  store.pageData.nowPage = page
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
    store.editProduct = {
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
    store.editProduct = {
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
  store.editProductModal.show()
}
const showDelProductModal = (id, title) => {
  store.delProduct = {
    id,
    title,
  }
  store.delProductModal.show()
}

onMounted(() => {
  store.getAdminProducts()
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
        <tr v-for="item in store.adminProducts" :key="item.id">
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
      :totalPages="store.pageData.totalPages"
      :nowPage="store.pageData.nowPage"
      @changePage="changePage"
    />
  </div>
</template>

<style scoped></style>
