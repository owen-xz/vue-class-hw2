<script setup>
const props = defineProps({
  totalPages: Number,
  nowPage: Number,
})
const emit = defineEmits(['changePage'])
const changePage = (page) => {
  emit('changePage', page)
}
</script>
<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: nowPage === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="changePage(nowPage - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{ active: item === nowPage }"
        v-for="item in totalPages"
        :key="item"
      >
        <a class="page-link" href="#" @click.prevent="changePage(item)">{{
          item
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: nowPage === totalPages }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="changePage(nowPage + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<style></style>
