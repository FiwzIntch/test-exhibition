<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import Pagination from '@/components/common/Pagination.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconDetail from '@/components/icons/IconDetail.vue'
import type { ExhibitionModelView } from '@/models/exhibition'
import { dataMockup } from '@/mock'
import { getTypeName, getFriendlyDate, getBadgeStatus } from '@/helpers/exhibition'

let totalItems = ref<ExhibitionModelView[]>(
  dataMockup.map((value) => {
    return {
      ...value,
      checked: false
    }
  })
)
const models = ref<ExhibitionModelView[]>([])
const checkAllList = ref<{
  [key: string]: boolean
}>({
  'page-1': false
})
const openModalRef = ref<HTMLButtonElement>()
const pageSize = ref(5)
const page = ref(1)

const totalPage = computed<number>(() => {
  return Math.ceil(totalItems.value.length / pageSize.value)
})

const countSelectedToDelete = computed<number>(() => {
  return totalItems.value.filter((m) => m.checked === true).length
})

function reloadData() {
  const allList = totalItems.value.map((value) => {
    return {
      ...value
    }
  })

  models.value = allList.splice((page.value - 1) * pageSize.value, pageSize.value)
}

function onConfirmDelete() {
  if (openModalRef.value) {
    openModalRef.value.click()
  }
}

function deleteItem() {
  totalItems.value = totalItems.value.filter((item) => item.checked === false)

  if (checkAllList.value[`page-${page.value}`]) {
    generateCheckBoxAllByPage()
  }

  if (page.value > totalPage.value) {
    page.value = totalPage.value - 1
  }

  reloadData()
}

function onPageChange(value: number) {
  page.value = value
  reloadData()
}

function onPageSizeChange(value: number) {
  pageSize.value = value

  page.value = 1

  reloadData()

  generateCheckBoxAllByPage()
}

function generateCheckBoxAllByPage() {
  checkAllList.value = {}
  for (let i = 1; i <= totalPage.value; i++) {
    checkAllList.value[`page-${i}`] = false
  }
}

function onChangeCheckAllDelete() {
  const ids = models.value.map((m) => m.id)

  for (const id of ids) {
    const findIndex = totalItems.value.findIndex((v) => v.id === id)
    if (findIndex !== -1) {
      totalItems.value[findIndex].checked = checkAllList.value[`page-${page.value}`]
    }
  }

  reloadData()
}

function onChangeCheckDelete(index: number) {
  const model = models.value[index]

  const findIndex = totalItems.value.findIndex((v) => v.id === model.id)

  if (findIndex !== -1) {
    totalItems.value[findIndex].checked = model.checked
  }
}

onMounted(() => {
  reloadData()
  generateCheckBoxAllByPage()
})
</script>
<template>
  <div>
    <p class="text-xl font-bold">รายการผลงาน</p>

    <div class="card bg-base-100 shadow mt-5 h-full">
      <div class="card-body">
        <div class="card-title justify-between">
          <div class="text-sm">เลือกจำนวน {{ countSelectedToDelete }} รายการ</div>
          <button class="btn" @click="onConfirmDelete()" :disabled="countSelectedToDelete === 0">
            <IconDelete class="w-6 text-error" />
            Delete
          </button>
        </div>
        <div class="card-actions justify-between">
          <div class="overflow-x-auto w-full">
            <table class="table">
              <thead class="text-lg">
                <tr>
                  <th>
                    <label>
                      <input
                        v-model="checkAllList[`page-${page}`]"
                        @change="onChangeCheckAllDelete()"
                        type="checkbox"
                        class="checkbox checkbox-primary"
                        :disabled="models.length === 0"
                      />
                    </label>
                  </th>
                  <th>ชื่อผลงาน</th>
                  <th>ประเภทผลงาน</th>
                  <th>วันที่แสดงผลงาน</th>
                  <th>วันที่สิ้นสุดแสดงผลงาน</th>
                  <th>สถานะ</th>
                  <th class="text-end">#</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(model, index) in models" :key="model.id">
                  <th>
                    <label>
                      <input
                        v-model="model.checked"
                        @change="onChangeCheckDelete(index)"
                        type="checkbox"
                        class="checkbox checkbox-primary"
                      />
                    </label>
                  </th>
                  <td>
                    {{ model.name }}
                  </td>
                  <td>
                    {{ getTypeName(model.type) }}
                  </td>
                  <td>{{ getFriendlyDate(model.startDate) }}</td>
                  <td>{{ getFriendlyDate(model.endDate) }}</td>
                  <td>
                    <div :class="getBadgeStatus(model.active)">
                      {{ model.active ? 'แสดงผลงาน' : 'ไม่แสดงผลงาน' }}
                    </div>
                  </td>
                  <td>
                    <div class="flex justify-end">
                      <RouterLink
                        :to="{ name: 'detail', params: { id: model.id } }"
                        class="link-warning link"
                      >
                        <IconDetail class="w-6 text-primary" />
                      </RouterLink>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Pagination
          :page-sizes="[2, 5, 10, 20]"
          :page="page"
          :page-size="pageSize"
          :total-page="totalPage"
          :total-item="totalItems.length"
          @page-change="onPageChange"
          @size-change="onPageSizeChange"
        />
      </div>
    </div>

    <!-- The button to open modal -->
    <label ref="openModalRef" for="my_modal_6" class="btn hidden">open modal</label>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my_modal_6" class="modal-toggle" />
    <div class="modal" role="dialog">
      <div class="modal-box">
        <h3 class="font-bold text-lg">ลบผลงาน</h3>
        <p class="py-4">ยืนยันที่จะลบผลงานที่เลือกจำนวน {{ countSelectedToDelete }} รายการนี้</p>
        <div class="modal-action">
          <label for="my_modal_6" class="btn">ยกเลิก</label>
          <label for="my_modal_6" class="btn btn-primary" @click="deleteItem()">ตกลง</label>
        </div>
      </div>
    </div>
  </div>
</template>
