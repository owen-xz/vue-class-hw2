<script setup>
import { useStore } from '../store'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const goCartPage = () => {
  router.push('/cart')
  store.cartModal.hide()
}
</script>
<template>
  <div
    id="cartModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="cartModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>購物車</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <template v-if="store.cart && store.cart.length">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">商品名稱</th>
                  <th scope="col">數量</th>
                  <th scope="col" class="text-end">單價</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in store.cart" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td>
                    <input
                      min="1"
                      type="number"
                      class="form-control"
                      v-model="item.qty"
                      @change="store.changeCartQty(index, item)"
                    />
                  </td>
                  <td class="text-end">${{ item.price }}</td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex">
              <button
                class="btn btn-outline-danger me-2 w-100"
                @click="store.cleanCart"
              >
                清空購物車
              </button>
              <button class="btn btn-primary w-100" @click="goCartPage">
                前往結賬
              </button>
            </div>
          </template>
          <div class="text-center" v-else>尚無商品</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
