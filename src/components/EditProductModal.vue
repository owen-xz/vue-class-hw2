<script setup>
import axios from 'axios'
import { getConfig } from '@/assets/mixins'
import { useStore } from '../store'
import { useLoading } from 'vue-loading-overlay'

const store = useStore()
const loading = useLoading()
const confirmEditProductModal = () => {
  if (store.editProduct.id) {
    putProduct()
  } else {
    createProduct()
  }
}
const createProduct = async () => {
  const loader = loading.show()
  try {
    const data = {
      data: store.editProduct,
    }
    const res = await axios.post(
      `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
        import.meta.env.VITE_HEXAPI_PATH
      }/admin/product`,
      data,
      getConfig()
    )
    await store.getAdminProducts()
    alert(res.data.message)
    store.editProductModal.hide()
    loader.hide()
  } catch (err) {
    alert(err.response?.data?.message)
    loader.hide()
  }
}
const putProduct = async () => {
  const loader = loading.show()
  try {
    const data = {
      data: store.editProduct,
    }
    const res = await axios.put(
      `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
        import.meta.env.VITE_HEXAPI_PATH
      }/admin/product/${store.editProduct.id}`,
      data,
      getConfig()
    )
    await store.getAdminProducts()
    alert(res.data.message)
    store.editProductModal.hide()
    loader.hide()
  } catch (err) {
    alert(err.response?.data?.message)
    loader.hide()
  }
}
</script>
<template>
  <div
    id="editProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="editProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="editProductModalLabel" class="modal-title">
            <span>{{ store.editProduct?.id ? '編輯' : '新增' }}產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="store.editProduct">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="store.editProduct.imageUrl"
                  />
                </div>
                <img
                  class="img-fluid"
                  :src="store.editProduct.imageUrl"
                  alt=""
                />
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
                  v-model="store.editProduct.title"
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
                    v-model="store.editProduct.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="store.editProduct.unit"
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
                    v-model="store.editProduct.origin_price"
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
                    v-model="store.editProduct.price"
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
                  v-model="store.editProduct.description"
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
                  v-model="store.editProduct.content"
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
                    v-model="store.editProduct.is_enabled"
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
            @click="confirmEditProductModal"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
