<script setup lang="ts">
import type { Routine } from '~/types/fitness.types'

const props = defineProps<{ hasRoutines: boolean }>()
const emit = defineEmits<{ newRoutine: [routine: Routine] }>()
const isModalOpen = ref(false)

const routine = ref<Routine>({ exercise: '', routines: [] })

const currentRoutine = ref({ weight: 1, repetitions: 1 })

const canGotoNext = computed(() => !!routine.value.exercise)

const isNextPage = ref<boolean>(false)
function goToNext() {
  if (canGotoNext.value) {
    isNextPage.value = true
  }
}
const modalTitle = computed(() => (isNextPage.value) ? 'Add Routine' : 'Choose Exercise')

const canSubmit = computed(() => routine.value.routines.length !== 0)
function submit() {
  if (canSubmit.value) {
    emit('newRoutine', routine.value)
    isModalOpen.value = false
  }
}

function shallowReset() {
  currentRoutine.value.repetitions = 1
  currentRoutine.value.weight = 1
}

function reset() {
  shallowReset()
  routine.value = { exercise: '', routines: [] }
  isNextPage.value = false
}

watch(isNextPage, () => {
  if (!isNextPage.value) {
    shallowReset()
  }
})

watch(isModalOpen, () => {
  if (isModalOpen.value) {
    reset()
  }
})
</script>

<template>
  <UModal v-model:open="isModalOpen" :title="modalTitle" :ui="{ footer: 'justify-end' }">
    <UButton variant="subtle" icon="i-hugeicons-add-01" block :ui="{ leadingIcon: props.hasRoutines ? 'size-8' : 'size-4' }">
      {{ props.hasRoutines ? '' : 'Add New Routine' }}
    </UButton>
    <template #body>
      <SelectExercise v-if="!isNextPage" v-model="routine.exercise" />
      <AddRoutineForm v-else v-model:routine-items="routine.routines" v-model:current-routine-item="currentRoutine" />
    </template>
    <template #footer>
      <div>
        <UButton v-if="isNextPage" variant="ghost" size="lg" @click="isNextPage = false">
          Previous
        </UButton>
      </div>
      <div>
        <UButton v-if="!isNextPage" size="lg" :disabled="!canGotoNext" @click="goToNext">
          Next
        </UButton>
        <UButton v-if="isNextPage" :disabled="!canSubmit" size="lg" @click="submit">
          Submit
        </UButton>
      </div>
    </template>
  </UModal>
</template>
