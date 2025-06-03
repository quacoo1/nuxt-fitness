<script setup lang="ts">
import type { Routine } from '~/types/fitness.types'

const fitnessStore = useFitnessStore()
const { alertError, alertSuccess } = useAlert()

const selectedDate = ref('')

const routines = ref<Routine[]>([])
function addRoutineToExercise(newRoutine: Routine) {
  routines.value.push({ id: `${Date.now()}`, ...newRoutine })
}

const canSaveWorkout = computed(() => {
  return routines.value.length > 0
},
)
function reset() {
  routines.value = []
  selectedDate.value = ''
}

function saveWorkout() {
  if (selectedDate.value && routines.value?.length > 0) {
    fitnessStore.saveWorkout({
      date: selectedDate.value,
      routines: routines.value,
    })
    reset()
    alertSuccess('Workout saved successfully')
  } else {
    alertError('Please select a date and add at least one routine')
  }
}

const hasRoutines = computed(() => routines.value.length > 0)
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
        <UButton v-if="selectedDate" :disabled="!canSaveWorkout" trailing-icon="i-hugeicons-floppy-disk" @click="saveWorkout">
          Save
        </UButton>
      </div>
    </div>
    <USeparator />
    <div v-if="selectedDate" class="pt-8 space-y-4">
      <h2 v-show="hasRoutines" class="font-medium text-primary">
        Routines
      </h2>
      <div class="grid grid-cols-4 gap-4">
        <div v-for="routine in routines" :key="routine.id">
          <UCard>
            <template #header>
              <span>{{ routine.exercise }}</span>
            </template>
            <span>{{ routine.routines.length }} sets</span>
          </UCard>
        </div>
        <AddRoutine :has-routines="hasRoutines" @new-routine="addRoutineToExercise" />
      </div>
    </div>
  </div>
</template>
