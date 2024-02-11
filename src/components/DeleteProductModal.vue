<script setup>
import axios from 'axios'
import { getConfig } from '@/assets/mixins'
import { useStore } from '../store'
import { useLoading } from 'vue-loading-overlay'

const store = useStore()
const loading = useLoading()
const deleteProduct = async () => {
  try {
    const loader = loading.show()
    const res = await axios.delete(
      `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
        import.meta.env.VITE_HEXAPI_PATH
      }/admin/product/${store.delProduct.id}`,
      getConfig()
    )
    await store.getAdminProducts()
    alert(res.data.message)
    store.delProductModal.hide()
    loader.hide()
  } catch (err) {
    alert(err.response?.data?.message)
    loader.hide()
  }
}
</script>
<template>
  <div
    id="delProductModal"
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
        <div class="modal-body" v-if="store.delProduct">
          是否刪除
          <strong class="text-danger">{{ store.delProduct.title }}</strong>
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
</template>
<style></style>
