<script setup>
import { useStore } from '../store'
import axios from 'axios'
const store = useStore()
const changeQty = async (index, cart, changeQty) => {
  const qty = cart.qty + changeQty
  if (qty > 0) {
    const data = {
      data: {
        product_id: cart.productId,
        qty,
      },
    }
    try {
      await axios.put(
        `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
          import.meta.env.VITE_HEXAPI_PATH
        }/cart/${cart.id}`,
        data
      )
      store.cart[index].qty = qty
    } catch (err) {
      alert(err.response?.data?.message)
    }
  } else {
    try {
      await axios.delete(
        `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
          import.meta.env.VITE_HEXAPI_PATH
        }/cart/${cart.id}`
      )
      store.cart.splice(index, 1)
    } catch (err) {
      alert(err.response?.data?.message)
    }
  }
}
const cleanCart = async () => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
        import.meta.env.VITE_HEXAPI_PATH
      }/carts`
    )
    store.cart = []
  } catch (err) {
    alert(err.response?.data?.message)
  }
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
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in store.cart" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      @click="changeQty(index, item, -1)"
                    >
                      -
                    </button>
                    <span class="px-3">{{ item.qty }}</span>
                    <button
                      class="btn btn-primary"
                      @click="changeQty(index, item, 1)"
                    >
                      +
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex">
              <button
                class="btn btn-outline-danger me-2 w-100"
                @click="cleanCart"
              >
                清空購物車
              </button>
              <router-link class="btn btn-primary w-100" to="/order">
                前往結賬
              </router-link>
            </div>
          </template>
          <div class="text-center" v-else>尚無商品</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
