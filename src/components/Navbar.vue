<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">首頁</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin">商品後臺</router-link>
          </li>
          <li class="nav-item">
            <button class="nav-link" @click="showCartModal">購物車</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from '../store'

const store = useStore()
const showCartModal = () => {
  store.cartModal.show()
}
onMounted(() => {
  if (!store.cart) {
    store.getCart()
  }
})
</script>

<style lang="scss" scoped></style>
