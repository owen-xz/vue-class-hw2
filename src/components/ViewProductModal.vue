<script setup>
import { useStore } from '../store'

const store = useStore()
</script>
<template>
  <div
    id="viewProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="viewProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="viewProductModalLabel" class="modal-title">
            <span>產品詳情</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="store.viewProduct">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <img
                  class="img-fluid"
                  :src="store.viewProduct.imageUrl"
                  alt=""
                />
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <div>{{ store.viewProduct.title }}</div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <div>{{ store.viewProduct.category }}</div>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <div>{{ store.viewProduct.unit }}</div>
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <div>${{ store.viewProduct.origin_price }}</div>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <div>${{ store.viewProduct.price }}</div>
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <div>{{ store.viewProduct.description }}</div>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <div>{{ store.viewProduct.content }}</div>
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
            @click="store.addCart(store.viewProduct.id)"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
