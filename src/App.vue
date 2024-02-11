<script setup>
import { onMounted } from 'vue'
import { useStore } from './store'
import { Modal } from 'bootstrap'
import Navbar from './components/Navbar.vue'
import ViewProductModal from './components/ViewProductModal.vue'
import EditProductModal from './components/EditProductModal.vue'
import DeleteProductModal from './components/DeleteProductModal.vue'
import CartModal from './components/CartModal.vue'

const store = useStore()
onMounted(() => {
  store.viewProductModal = new Modal('#viewProductModal')
  store.editProductModal = new Modal('#editProductModal')
  store.delProductModal = new Modal('#delProductModal')
  store.cartModal = new Modal('#cartModal')
})
</script>

<template>
  <Navbar />
  <RouterView></RouterView>
  <ViewProductModal />
  <EditProductModal />
  <DeleteProductModal />
  <CartModal />
</template>

<style scoped></style>
