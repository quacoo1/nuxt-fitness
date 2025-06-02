<script setup lang="ts">
import type { Routine } from '~/types/fitness.types'

const selectedDate = ref('')

const routines = ref<Routine[]>([])
function addRoutineToExercise(newRoutine: Routine) {
  routines.value.push(newRoutine)
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-end space-x-4 justify-between">
      <div>
        <h2 class="text-4xl font-light lg:text-5xl">
          {{ selectedDate || 'Choose a date' }}
        </h2>
      </div>
      <div class="flex gap-2 items-center">
        <TrackDateInput v-model="selectedDate" />
        <UButton v-if="selectedDate" trailing-icon="i-hugeicons-floppy-disk">
          Save
        </UButton>
      </div>
    </div>
    <USeparator />
    <div v-if="selectedDate" class="grid grid-cols-4 gap-4">
      <!-- <div v-for="item in left" :key="item">
        <UCard>
          item
        </UCard>
      </div> -->

      {{ routines }}
      <div>
        <AddRoutine @new-routine="addRoutineToExercise" />
      </div>
    </div>
  </div>
</template>
