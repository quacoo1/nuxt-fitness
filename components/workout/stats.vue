<script setup lang="ts">
const fitnessStore = useFitnessStore()

await callOnce('dashboard', () => fitnessStore.getDashboard())

const daysSinceLastWorkout = computed(() => {
  if (!fitnessStore.dashboard)
    return 0
  const lastWorkout = new Date(fitnessStore.dashboard.last_workout_date)
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - lastWorkout.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
})
</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    <UCard variant="subtle">
      <h3 class="text-6xl font-light">
        {{ daysSinceLastWorkout }}
      </h3>
      <span class="text-muted text-sm">Days since last workout</span>
    </UCard>
    <UCard variant="subtle">
      <h3 class="text-6xl font-light">
        {{ fitnessStore.dashboard?.total_workouts || 0 }}
      </h3>
      <span class="text-muted text-sm">Total Workouts</span>
    </UCard>
    <UCard variant="subtle">
      <h3 class="text-6xl font-light">
        {{ fitnessStore.dashboard?.cumulative_weight || 0 }}
      </h3>
      <span class="text-muted text-sm">Cumulative Weights Moved</span>
    </UCard>
    <UCard variant="subtle">
      <h3 class="text-6xl font-light">
        {{ fitnessStore.dashboard?.most_weight_single_workout || 0 }}
      </h3>
      <span class="text-muted text-sm">Most weight in a single workout</span>
    </UCard>
  </div>
</template>
