<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    page?: number
    totalPage?: number
    totalItem?: number
    pageSize?: number
    range?: number
    pageSizes?: number[]
  }>(),
  {
    page: 1,
    totalPage: 0,
    totalItem: 0,
    pageSize: 20,
    range: 7,
    pageSizes: () => [10, 20, 50, 100]
  }
)
const emit = defineEmits<{
  pageChange: [value: number]
  sizeChange: [value: number]
}>()

const pages = ref<number[]>([])

function init(): void {
  const pagination: number[] = []

  let start = props.page - Math.floor(props.range / 2)
  let end = props.page + Math.floor(props.range / 2)

  if (props.totalPage >= props.range) {
    if (start < 1) {
      end += Math.abs(start) + 1
      start = 1
    }
    if (end > props.totalPage) {
      start -= end - props.totalPage
      end = props.totalPage
    }
  } else {
    start = 1
    end = props.totalPage
  }

  for (let i = start; i <= end; i++) {
    pagination.push(i)
  }

  pages.value = pagination
}

function gotoPage(page: number): void {
  emit('pageChange', page)
}

function onPageSizeChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  const count = parseInt(value)
  emit('sizeChange', count)
}

watch(
  () => props.page,
  () => {
    init()
  }
)

watch(
  () => props.pageSize,
  () => {
    init()
  }
)

watch(
  () => props.totalItem,
  () => {
    init()
  }
)

onMounted(() => {
  init()
})
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-x-3"
    :class="totalPage > 1 ? 'justify-between' : 'justify-end'"
  >
    <div v-if="totalPage > 1" class="join">
      <button type="button" class="join-item btn" :disabled="page <= 1" @click="gotoPage(1)">
        &laquo;
      </button>

      <button type="button" class="join-item btn" :disabled="page <= 1" @click="gotoPage(page - 1)">
        &lt;
      </button>

      <button
        v-for="p in pages"
        :key="p"
        type="button"
        class="join-item btn"
        :class="[{ active: p === page }]"
        @click="gotoPage(p)"
      >
        {{ p }}
      </button>

      <button
        type="button"
        class="join-item btn"
        :disabled="page >= totalPage"
        @click="gotoPage(page + 1)"
      >
        &gt;
      </button>

      <button
        type="button"
        class="join-item btn"
        :disabled="page >= totalPage"
        @click="gotoPage(totalPage)"
      >
        &raquo;
      </button>
    </div>

    <div class="flex items-center gap-x-3">
      <span class="text-sm">จำนวน {{ totalItem }} รายการ | จำนวนต่อหน้า</span>
      <select class="select-bordered select" @change="onPageSizeChange">
        <option v-for="p in pageSizes" :key="p" :value="p" :selected="p === pageSize">
          {{ p }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.active {
  @apply btn-active bg-primary text-white;
}
</style>
