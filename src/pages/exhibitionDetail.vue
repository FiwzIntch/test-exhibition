<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
import IconEdit from '@/components/icons/IconEdit.vue'
import type { ExhibitionModel } from '@/models/exhibition'
import { dataMockup } from '@/mock'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getTypeName, getFriendlyDate } from '@/helpers/exhibition'

const route = useRoute()
const displayedText = ref('')
const isCollapsed = ref(false)
const model = computed<ExhibitionModel | undefined>(() => {
  if (route.params.id) {
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    return dataMockup.find((data) => data.id === parseInt(id))
  }
  return undefined
})

function collapseText(textSize: number) {
  displayedText.value = model.value?.detail.slice(0, textSize) || ''
  isCollapsed.value = !isCollapsed.value
}

function expandText() {
  displayedText.value = model.value?.detail || ''
  isCollapsed.value = !isCollapsed.value
}

onMounted(() => {
  collapseText(150)
})
</script>

<template>
  <div class="grid grid-cols-1 space-y-5" v-if="model">
    <div class="text-sm breadcrumbs">
      <ul>
        <li><RouterLink :to="{ name: 'list' }" class="link-primary"> หน้าหลัก </RouterLink></li>
        <li>รายละเอียด</li>
      </ul>
    </div>

    <div class="grid grid-cols-2">
      <div class="flex justify-center">
        <Carousel>
          <Slide v-for="slide in 3" :key="slide">
            <div class="carousel__item w-[90%]">
              <img :src="`../../public/ui-dk-${slide}.jpg`" />
            </div>
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
      </div>
      <div class="flex justify-center">
        <div class="card bg-base-100 shadow h-full w-[70%]">
          <div class="card-body gap-10">
            <div class="flex justify-between">
              <h2 class="card-title">{{ model.name }}</h2>
              <RouterLink :to="{ name: 'edit', params: { id: model.id } }" class="btn btn-sm">
                <IconEdit class="w-4 text-primary" />
                Edit
              </RouterLink>
            </div>

            <div class="flex flex-col gap-4">
              <div class="flex gap-5">
                <span class="text-zinc-400">ประเภทผลงาน</span>
                <span>{{ getTypeName(model.type) }}</span>
              </div>
              <div class="flex gap-5">
                <span class="text-zinc-400">วันที่เริ่มต้น</span>
                <span v-show="model.active">{{
                  getFriendlyDate(model.startDate, 'DD MMMM YYYY HH:mm:ss')
                }}</span>
              </div>
              <div class="flex gap-5">
                <span class="text-zinc-400">วันที่สิ้นสุด</span>
                <span v-show="model.active">{{
                  getFriendlyDate(model.endDate, 'DD MMMM YYYY HH:mm:ss')
                }}</span>
              </div>
            </div>

            <div>
              <h2 class="card-title mb-3">เจ้าของลิทสิทธิ์</h2>
              <div class="border rounded-lg border-base-300 p-6">
                <div class="flex flex-col gap-4">
                  <span class="text-lg font-bold">{{ model.copyright.name }}</span>
                  <div class="flex gap-5">
                    <span class="text-zinc-400">เบอร์โทร</span>
                    <span>{{ model.copyright.phone }}</span>
                  </div>
                  <div class="flex gap-5">
                    <span class="text-zinc-400">อีเมล์</span>
                    <span>{{ model.copyright.email }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 class="card-title">รายละเอียด</h2>
              <div class="text-zinc-400">
                {{ displayedText }}
                <span
                  class="cursor-pointer text-primary"
                  @click="expandText"
                  v-if="isCollapsed && model.detail.length > 0"
                  >...อ่านเพิ่มเติม</span
                >
                <p
                  class="cursor-pointer text-primary"
                  @click="collapseText(200)"
                  v-else-if="model.detail.length > 0"
                >
                  Show less
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.carousel {
  display: block !important;
}
.carousel__item {
  min-height: 300px;
  max-height: 500px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}
</style>
