<script setup lang="ts">
type RoutineItem = {
  weight: number
  repetitions: number
}

const currentRoutineItem = defineModel<RoutineItem>('currentRoutineItem', { required: true })
const routineItems = defineModel<RoutineItem[]>('routineItems', { required: true })

function addRoutineItem() {
  routineItems.value.unshift(Object.assign({}, currentRoutineItem.value))
  currentRoutineItem.value.weight = 1
  currentRoutineItem.value.repetitions = 1
}

function removeRoutine(id: number) {
  routineItems.value.splice(id, 1)
}
</script>

<template>
  <!-- <pre>{{ routineItems }}</pre> -->
  <div class="space-y-8">
    <div class="grid grid-cols-[1fr_1fr_auto] gap-4">
      <div class="flex flex-col gap-2">
        <AppLabel for="weight">
          Weight
        </AppLabel>
        <UInputNumber id="weight" v-model="currentRoutineItem.weight" :min="1" size="lg" />
      </div>
      <div class="flex flex-col gap-2">
        <AppLabel for="repitition">
          Repititions
        </AppLabel>
        <UInputNumber id="repitition" v-model="currentRoutineItem.repetitions" :min="1" size="lg" />
      </div>
      <div class="flex items-end">
        <UButton variant="subtle" size="lg" icon="i-hugeicons-add-01" @click="addRoutineItem" />
      </div>
    </div>
    <div class="space-y-2">
      <AppLabel>
        Summary
      </AppLabel>
      <AddRoutineTable :data="routineItems" @remove-item="removeRoutine" />
    </div>
  </div>
</template>
