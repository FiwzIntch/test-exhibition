<script setup lang="ts">
import IconSave from '@/components/icons/IconSave.vue'
import { dataMockup } from '@/mock'
import type { ExhibitionModel, ExhibitionType } from '@/models/exhibition'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getTypeName, getFriendlyDate } from '@/helpers/exhibition'

const route = useRoute()
const types = ref<ExhibitionType[]>(['art', 'literature', 'media'])
const model = computed<ExhibitionModel | undefined>(() => {
  if (route.params.id) {
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    return dataMockup.find((data) => data.id === parseInt(id))
  }
  return undefined
})

const startDate = computed(() => {
  if (model.value) {
    return getFriendlyDate(model.value?.startDate, 'YYYY-MM-DD')
  }
  return undefined
})

const endDate = computed(() => {
  if (model.value) {
    return getFriendlyDate(model.value?.endDate, 'YYYY-MM-DD')
  }
  return undefined
})
</script>

<template>
  <div class="grid grid-cols-1 space-y-5" v-if="model">
    <div class="text-sm breadcrumbs flex justify-between">
      <ul>
        <li><RouterLink :to="{ name: 'list' }" class="link-primary"> หน้าหลัก </RouterLink></li>
        <li>
          <RouterLink :to="{ name: 'detail', params: { id: 1 } }" class="link-primary">
            รายละเอียด
          </RouterLink>
        </li>
        <li>แก้ไขการแสดงผลงาน</li>
      </ul>

      <button class="btn btn-sm btn-active btn-primary">
        <IconSave class="w-4" />
        Save
      </button>
    </div>

    <div class="grid grid-cols-1 space-y-10">
      <div class="card bg-base-100 shadow h-full">
        <div class="card-body gap-4">
          <h2 class="card-title">{{ model.name }}</h2>

          <div class="flex flex-col">
            <div class="mb-5">
              <label class="form-control w-full max-w-xs">
                <div class="label">
                  <span class="label-text">ประเภทผลงาน <span class="text-error">*</span></span>
                </div>
                <select class="select select-bordered w-full max-w-xs" v-model="model.type">
                  <template v-for="type in types" :key="type">
                    <option :value="type">{{ getTypeName(type) }}</option>
                  </template>
                </select>
              </label>
            </div>

            <div class="text-lg font-bold my-4">เจ้าของลิทสิทธิ์</div>
            <div class="grid grid-cols-2 gap-4">
              <label class="form-control w-full max-w-md">
                <div class="label">
                  <span class="label-text">ชื่อ <span class="text-error">*</span></span>
                </div>
                <input
                  v-model="model.copyright.name"
                  type="text"
                  placeholder="Type here"
                  class="input input-bordered w-full max-w-md"
                />
              </label>
              <label class="form-control w-full max-w-md">
                <div class="label">
                  <span class="label-text">เบอร์โทร <span class="text-error">*</span></span>
                </div>
                <input
                  v-model="model.copyright.phone"
                  type="text"
                  placeholder="Type here"
                  class="input input-bordered w-full max-w-md"
                />
              </label>
              <label class="form-control w-full max-w-md">
                <div class="label">
                  <span class="label-text">อีเมล์ <span class="text-error">*</span></span>
                </div>
                <input
                  v-model="model.copyright.email"
                  type="text"
                  placeholder="Type here"
                  class="input input-bordered w-full max-w-md"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="card bg-base-100 shadow h-full">
        <div class="card-body gap-10">
          <h2 class="card-title">ข้อมูลผลงาน</h2>

          <div class="grid grid-cols-4">
            <div class="flex flex-col">
              <div class="text-center">ระยะเวลาการแสดงงานให้ผู้อื่นเห็น</div>
              <div class="flex justify-between">
                <div class="form-control">
                  <label class="label cursor-pointer gap-4">
                    <input
                      v-model="model.active"
                      type="radio"
                      name="radio-1"
                      class="radio radio-primary"
                      value="false"
                    />
                    <span class="label-text">ไม่แสดง</span>
                  </label>
                </div>
                <div class="form-control">
                  <label class="label cursor-pointer gap-4">
                    <input
                      v-model="model.active"
                      type="radio"
                      name="radio-1"
                      class="radio radio-primary"
                      value="true"
                    />
                    <span class="label-text">แสดง</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="col-span-3">
              <div class="grid grid-cols-2">
                <div class="flex justify-end">
                  <label class="form-control w-full max-w-[200px]">
                    <div class="label">
                      <span class="label-text"
                        >วันที่เริ่มต้น <span class="text-error">*</span></span
                      >
                    </div>
                    <input
                      v-model="startDate"
                      type="date"
                      placeholder="Type here"
                      class="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>

                <div>
                  <div class="flex justify-center">
                    <label class="form-control w-full max-w-xs">
                      <div class="label">
                        <span class="label-text"
                          >วันที่สิ้นสุด <span class="text-error">*</span></span
                        >
                      </div>
                      <div class="flex items-center gap-4">
                        <div>
                          <input type="checkbox" class="toggle toggle-md toggle-primary" checked />
                        </div>
                        <div class="flex grow">
                          <input
                            v-model="endDate"
                            type="date"
                            placeholder="Type here"
                            class="input input-bordered w-[200px]"
                          />
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1">
            <label class="form-control w-full">
              <div class="label">
                <span>รายละเอียด</span>
              </div>
              <textarea
                v-model="model.detail"
                class="textarea textarea-bordered w-full"
                rows="5"
                placeholder="Lorem Ipsum คือ เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจ"
              ></textarea>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
