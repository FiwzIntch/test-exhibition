<script setup lang="ts">
import dayjs from 'dayjs'
import IconCalendar from '@/components/icons/IconCalendar.vue'
import { computed, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    format?: string
    minDate?: Date
    customWidth?: string
  }>(),
  {
    format: 'DD/MM/YYYY'
  }
)
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const mask = {
  L: 'DD/MM/YYYY',
  modelValue: 'YYYY-MM-DD'
}

const date = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
  }
})
</script>
<template>
  <VDatePicker v-model.string="date" :masks="mask" :min-date="props.minDate">
    <template #default="{ inputValue, togglePopover }">
      <div class="join" :class="props.customWidth" @click="togglePopover">
        <input :value="inputValue" class="input join-item input-bordered w-full" readonly />
        <button class="btn join-item btn-active btn-ghost">
          <IconCalendar class="w-6" />
        </button>
      </div>
    </template>
  </VDatePicker>
</template>
