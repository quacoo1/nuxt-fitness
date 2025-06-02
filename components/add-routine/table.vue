<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

type RoutineItem = {
  weight: number
  repetitions: number
}
const props = defineProps<{
  data: RoutineItem[]
}>()

const emit = defineEmits<{
  removeItem: [id: number]
}>()

const columns: TableColumn<RoutineItem>[] = [{
  accessorKey: 'weight',
  header: 'weight',
}, {
  accessorKey: 'repetitions',
  header: 'repetitions',
}, {
  id: 'action',
}]

function remove(id: number) {
  emit('removeItem', id)
}
</script>

<template>
  <UCard :ui="{ body: 'sm:pt-0 pt-0 overflow-hidden' }">
    <UTable :columns="columns" :data="props.data" :sticky="true" class="flex-1 max-h-36 no-scrollbar">
      <template #action-cell="{ row }">
        <div class="flex justify-end w-full" @click="remove(row.index)">
          <UButton
            icon="i-hugeicons-delete-02"
            color="error"
            variant="ghost"
            aria-label="Delete"
          />
        </div>
      </template>
    </Utable>
  </UCard>
</template>
