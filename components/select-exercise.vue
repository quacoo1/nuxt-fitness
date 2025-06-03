<script setup lang="ts">
const fitnessStore = useFitnessStore()
const modelValue = defineModel<string>({ required: true })
// await callOnce('exercises', () => fitnessStore.getExercises())
</script>

<template>
  <div class="flex flex-col gap-1">
    <AppLabel for="exercise">
      Exercise
    </AppLabel>
    <USelect
      id="exercise" v-model="modelValue"
      placeholder="Select Exercise" :items="fitnessStore.exercises" value-key="id" label-key="name" size="lg"
    />
  </div>
</template>
