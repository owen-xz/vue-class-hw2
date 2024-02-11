<template>
  <div class="container mt-4">
    <template v-if="store.cart && store.cart.length">
      <div class="text-end">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="store.cleanCart"
        >
          清空購物車
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th>品名</th>
            <th style="width: 150px">數量</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.cart" :key="item.id">
            <td>
              {{ item.title }}
              <div class="text-success">已套用優惠券</div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input
                    min="1"
                    type="number"
                    class="form-control"
                    v-model="item.qty"
                    @change="store.changeCartQty(index, item)"
                  />
                </div>
              </div>
            </td>
            <td class="text-end">${{ item.price }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td class="text-end">${{ store.totalCartPrice }}</td>
          </tr>
        </tfoot>
      </table>
      <!-- form -->
      <div class="my-5 row justify-content-center">
        <Form
          :schema="formSchema"
          :submitBtn="'送出訂單'"
          @onSubmit="sendSubmit"
          class="col-md-6"
        />
      </div>
    </template>
    <div class="text-center" v-else>尚無商品</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '../store'
import { useLoading } from 'vue-loading-overlay'
import * as Yup from 'yup'
import axios from 'axios'
import Form from '../components/Form.vue'

const store = useStore()
const loading = useLoading()
const formSchema = ref({
  fields: [
    {
      label: 'Email',
      name: 'email',
      as: 'input',
      type: 'email',
      rules: Yup.string().email('Email 格式錯誤').required('Email 不得爲空'),
    },
    {
      label: '收件人姓名',
      name: 'name',
      as: 'input',
      rules: Yup.string().required('收件人姓名不得爲空'),
    },
    {
      label: '收件人電話',
      name: 'tel',
      as: 'input',
      type: 'tel',
      rules: Yup.string()
        .min(8, '收件人電話格式錯誤')
        .required('收件人電話不得爲空'),
    },
    {
      label: '收件人地址',
      name: 'address',
      as: 'input',
      rules: Yup.string().required('收件人地址不得爲空'),
    },
    {
      label: '留言',
      name: 'message',
      as: 'textarea',
      rules: Yup.string(),
    },
  ],
})
const sendSubmit = async (data) => {
  const { message, ...attrs } = data
  const formatData = {
    data: {
      user: attrs,
      message,
    },
  }
  const loader = loading.show()
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_HEXAPI_URL}/v2/api/${
        import.meta.env.VITE_HEXAPI_PATH
      }/order`,
      formatData
    )
    store.cart = []
    alert(res.data.message)
    loader.hide()
  } catch (err) {
    alert(err.response?.data?.message)
    loader.hide()
  }
}
</script>

<style lang="scss" scoped></style>
