<script setup lang="ts">
import type { DateValue } from '@internationalized/date'

import { DateFormatter, getLocalTimeZone } from '@internationalized/date'

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const modelValue = defineModel<string>()
const date = shallowRef<DateValue | null>(null)
const showModal = ref(false)

function updateSelectedDate() {
  modelValue.value = date.value ? df.format(date.value.toDate(getLocalTimeZone())) : ''
  showModal.value = false
}
</script>

<template>
  <UModal v-model:open="showModal" :ui="{ header: 'hidden', footer: 'justify-end' }">
    <UButton color="neutral" variant="subtle" trailing-icon="i-hugeicons-calendar-setting-01">
      {{ modelValue ? 'Update' : 'Choose Date' }}
    </UButton>
    <template #body>
      <UCalendar v-model="date" class="p-2" />
    </template>

    <template #footer>
      <UButton variant="ghost" size="lg" @click="showModal = !showModal">
        Cancel
      </UButton>
      <UButton tab-index="1" trailing-icon="i-hugeicons-checkmark-circle-01" @click="updateSelectedDate">
        Confirm
      </UButton>
    </template>
  </UModal>
</template>
