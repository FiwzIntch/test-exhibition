<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, email, numeric, minLength } from '@vuelidate/validators'
import IconSave from '@/components/icons/IconSave.vue'
import DatePicker from '@/components/common/DatePicker.vue'
import { dataMockup } from '@/mock'
import type { ExhibitionModel, ExhibitionType } from '@/models/exhibition'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getTypeName } from '@/helpers/exhibition'
import dayjs from 'dayjs'

const route = useRoute()
const types = ref<ExhibitionType[]>(['art', 'literature', 'media'])
const localModel = ref<ExhibitionModel | undefined>()
const isLimitEndDate = ref(false)

const rules = computed(() => {
  return {
    localModel: {
      copyright: {
        name: { required },
        phone: { required, numeric },
        email: { required, email }
      }
    }
  }
})

const v$ = useVuelidate(rules, { localModel })

const minDateOnEndDate = computed(() => {
  if (localModel.value) {
    return localModel.value.startDate ? new Date(localModel.value.startDate) : new Date()
  }
  return undefined
})

function getErrorMessageByType(type: string, key: string) {
  switch (type) {
    case 'required':
      return `${key}ต้องไม่เป็นค่าว่าง`

    case 'email':
      return `โปรดกรอกรูปแบบอีเมล์ให้ถูกต้อง`

    case 'numeric':
      return `${key}ต้องเป็นตัวเลข`

    default:
      return ''
  }
}

async function onSave() {
  const valid = await v$.value.$validate()
  console.log(valid)
}

watch(
  () => localModel.value?.active,
  (value) => {
    if (value === false && localModel.value) {
      localModel.value.startDate = undefined
      localModel.value.endDate = undefined
    } else if (value === true && localModel.value) {
      localModel.value.startDate = localModel.value.startDate
        ? localModel.value.startDate
        : dayjs().format('YYYY-MM-DD')
      localModel.value.endDate = localModel.value.endDate
        ? localModel.value.endDate
        : isLimitEndDate.value
          ? dayjs().add(1, 'day').format('YYYY-MM-DD')
          : undefined
    }
  }
)

watch(
  () => localModel.value?.startDate,
  (value) => {
    if (localModel.value && value && localModel.value.endDate) {
      if (new Date(value).getTime() > new Date(localModel.value.endDate).getTime()) {
        localModel.value.endDate = dayjs(value).add(1, 'day').format('YYYY-MM-DD')
      }
    }
  }
)

watch(
  () => isLimitEndDate.value,
  (value) => {
    if (value === false && localModel.value) {
      localModel.value.endDate = undefined
    } else if (value === true && localModel.value) {
      localModel.value.endDate = dayjs(localModel.value.startDate)
        .add(1, 'day')
        .format('YYYY-MM-DD')
    }
  }
)

onMounted(() => {
  if (route.params.id) {
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    localModel.value = dataMockup.find((data) => data.id === parseInt(id))
    console.log(dataMockup.find((data) => data.id === parseInt(id)))
  }
  isLimitEndDate.value = localModel.value?.endDate !== undefined ? true : false
})
</script>

<template>
  <div v-if="localModel" class="grid grid-cols-1 space-y-5">
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

      <button class="btn btn-sm btn-active btn-primary" @click="onSave()">
        <IconSave class="w-4" />
        Save
      </button>
    </div>

    <div class="grid grid-cols-1 space-y-10">
      <div class="card bg-base-100 shadow h-full">
        <div class="card-body gap-4">
          <h2 class="card-title">{{ localModel.name }}</h2>

          <div class="flex flex-col">
            <div class="mb-5">
              <label class="form-control w-full max-w-xs">
                <div class="label">
                  <span class="label-text">ประเภทผลงาน </span>
                </div>
                <select class="select select-bordered w-full max-w-xs" v-model="localModel.type">
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
                  v-model="localModel.copyright.name"
                  type="text"
                  placeholder="Type here"
                  class="input input-bordered w-full max-w-md"
                />
                <span
                  v-if="v$.localModel.copyright.name.$error"
                  class="label-text-alt text-error p-1"
                >
                  {{
                    getErrorMessageByType(
                      v$.localModel.copyright.name.$errors[0].$validator,
                      'ชื่อ'
                    )
                  }}</span
                >
              </label>
              <label class="form-control w-full max-w-md">
                <div class="label">
                  <span class="label-text">เบอร์โทร <span class="text-error">*</span></span>
                </div>
                <input
                  v-model="localModel.copyright.phone"
                  maxlength="10"
                  type="text"
                  placeholder="Type here"
                  class="input input-bordered w-full max-w-md"
                />
                <span
                  v-if="v$.localModel.copyright.phone.$error"
                  class="label-text-alt text-error p-1"
                >
                  {{
                    getErrorMessageByType(
                      v$.localModel.copyright.phone.$errors[0].$validator,
                      'เบอร์โทร'
                    )
                  }}</span
                >
              </label>
              <label class="form-control w-full max-w-md">
                <div class="label">
                  <span class="label-text">อีเมล์ <span class="text-error">*</span></span>
                </div>
                <input
                  v-model="localModel.copyright.email"
                  type="text"
                  placeholder="Type here"
                  class="input input-bordered w-full max-w-md"
                />
                <span
                  v-if="v$.localModel.copyright.email.$error"
                  class="label-text-alt text-error p-1"
                >
                  {{
                    getErrorMessageByType(
                      v$.localModel.copyright.email.$errors[0].$validator,
                      'อีเมล์'
                    )
                  }}</span
                >
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
                      v-model="localModel.active"
                      type="radio"
                      name="radio-1"
                      class="radio radio-primary"
                      :value="false"
                    />
                    <span class="label-text">ไม่แสดง</span>
                  </label>
                </div>
                <div class="form-control">
                  <label class="label cursor-pointer gap-4">
                    <input
                      v-model="localModel.active"
                      type="radio"
                      name="radio-1"
                      class="radio radio-primary"
                      :value="true"
                    />
                    <span class="label-text">แสดง</span>
                  </label>
                </div>
              </div>
            </div>

            <div v-show="localModel.active" class="col-span-3">
              <div class="grid grid-cols-2">
                <div class="flex justify-center">
                  <label class="form-control w-full max-w-[200px]">
                    <div class="label">
                      <span class="label-text"
                        >วันที่เริ่มต้น <span class="text-error">*</span></span
                      >
                    </div>

                    <DatePicker v-if="localModel.startDate" v-model="localModel.startDate" />
                  </label>
                </div>

                <div class="flex gap-4">
                  <label class="form-control">
                    <div class="label h-[48px]">
                      <span v-show="!isLimitEndDate" class="label-text"
                        >วันที่สิ้นสุด <span class="text-error">*</span></span
                      >
                    </div>
                    <div>
                      <input
                        v-model="isLimitEndDate"
                        type="checkbox"
                        class="toggle toggle-md toggle-primary"
                      />
                    </div>
                  </label>

                  <label v-show="isLimitEndDate" class="form-control w-full max-w-xs">
                    <div class="label">
                      <span class="label-text"
                        >วันที่สิ้นสุด <span class="text-error">*</span></span
                      >
                    </div>
                    <div>
                      <DatePicker
                        v-if="localModel.endDate"
                        v-model="localModel.endDate"
                        :min-date="minDateOnEndDate"
                        custom-width="w-[200px]"
                      />
                    </div>
                  </label>
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
                v-model="localModel.detail"
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
