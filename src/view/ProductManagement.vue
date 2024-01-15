<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { config } from '@/assets/mixins'
import { Modal } from 'bootstrap'

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
const productModalRef = ref(null)

const delProductModal = ref(null)
const delProductModalRef = ref(null)

const getProducts = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
        import.meta.env.VITE_HEXAPI_PATH
      }/admin/products?page=1`,
      config
    )
    products.value = res.data.products
  } catch (err) {
    alert(err.response?.data?.message)
  }
}
const createProduct = async () => {
  try {
    const data = {
      data: product.value,
    }
    await axios.post(
      `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
        import.meta.env.VITE_HEXAPI_PATH
      }/admin/product`,
      data,
      config
    )
    await getProducts()
    productModal.value.hide()
  } catch (err) {
    alert(err.response?.data?.message)
  }
}
const putProduct = async () => {
  try {
    const data = {
      data: product.value,
    }
    await axios.put(
      `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
        import.meta.env.VITE_HEXAPI_PATH
      }/admin/product/${product.value.id}`,
      data,
      config
    )
    await getProducts()
    productModal.value.hide()
  } catch (err) {
    alert(err.response?.data?.message)
  }
}
const deleteProduct = async () => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
        import.meta.env.VITE_HEXAPI_PATH
      }/admin/product/${delProduct.value.id}`,
      config
    )
    await getProducts()
    delProductModal.value.hide()
  } catch (err) {
    alert(err.response?.data?.message)
  }
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

const confirmProductModal = () => {
  if (product.value.id) {
    putProduct()
  } else {
    createProduct()
  }
}

onMounted(() => {
  productModal.value = new Modal(productModalRef.value)
  delProductModal.value = new Modal(delProductModalRef.value)
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
  </div>
  <!-- Modal -->
  <div
    id="productModal"
    ref="productModalRef"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>新增產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="product.imageUrl"
                  />
                </div>
                <img class="img-fluid" :src="product.imageUrl" alt="" />
              </div>
              <!-- <div>
                <button class="btn btn-outline-primary btn-sm d-block w-100">
                  新增圖片
                </button>
              </div>
              <div v-else>
                <button class="btn btn-outline-danger btn-sm d-block w-100">
                  刪除圖片
                </button>
              </div> -->
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="product.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="product.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="product.unit"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model="product.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model="product.price"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="product.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="product.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="product.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="confirmProductModal"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    id="delProductModal"
    ref="delProductModalRef"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ delProduct.title }}</strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteProduct">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
</template>

<style scoped></style>
