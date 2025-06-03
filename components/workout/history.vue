<script setup lang="ts">
/* Refactor this component */
import { DateFormatter } from '@internationalized/date'

import type { WorkoutViewFromDatasource } from '~/types/fitness.types'

const df = new DateFormatter('en-US', {
  dateStyle: 'full',
})
const fitnessStore = useFitnessStore()

await callOnce('workouts', () => fitnessStore.getWorkouts())

type Set = {
  profile_id: string
  workout_id: string
  workout_created_at: string
  exercise_name: string
  sets_weight: number
  sets_repetitions: number
}

type Workouts = {
  workout_id: string
  workout_created_at: string
  sets: Set[]
}

function workoutsById(workouts: WorkoutViewFromDatasource[]) {
  return workouts.reduce((acc: { [key: string]: Workouts }, curr: Set) => {
    if (!acc[curr.workout_id]) {
      acc[curr.workout_id] = {
        workout_id: curr.workout_id,
        workout_created_at: curr.workout_created_at,
        sets: [],
      }
    }
    acc[curr.workout_id].sets.push(curr)
    return acc
  }, {})
}

function setsByExerciseName(sets: Set[]) {
  return sets.reduce((acc: { [key: string]: Set[] }, curr: Set) => {
    if (!acc[curr.exercise_name])
      acc[curr.exercise_name] = []
    acc[curr.exercise_name].push(curr)
    return acc
  }, {})
}

const workoutIds = computed(() => Object.keys(workoutsById(fitnessStore.workouts)))

const workoutsGroupedById = computed(() => workoutsById(fitnessStore.workouts))
</script>

<template>
  <div class="space-y-16">
    <WorkoutStats />
    <UCard :ui="{ body: ' md:px-16' }">
      <template #header>
        Past Workouts
      </template>
      <ol class="relative border-s border-muted">
        <li v-for="id in workoutIds" :key="id" class="mb-10 ms-8">
          <span class="absolute flex items-center justify-center w-6 h-6 text-primary-900 bg-primary rounded-full -start-3 ring-8 ring-primary/20">
            <UIcon name="i-hugeicons-calendar-04" />
          </span>
          <time class="flex items-center mb-1 text-lg font-semibold">
            {{ df.format(new Date(workoutsGroupedById[id].workout_created_at)) }}
          </time>

          <template v-for="(sets, name) in setsByExerciseName(workoutsGroupedById[id].sets) " :key="name">
            <h3 class="block mb-2 text-sm font-normal leading-none text-primary">
              {{ name }}
            </h3>
            <div class="mb-4 text-base font-normal text-muted">
              <div class="border w-full max-w-lg border-muted rounded-sm overflow-hidden grid grid-cols-2">
                <div class="px-4 py-2 font-normal bg-muted">
                  Repetitions
                </div>
                <div class="px-4 py-2 font-normal bg-muted border-l border-muted">
                  Weight
                </div>
                <template v-for="set in sets" :key="set.workout_id">
                  <div class="px-4 py-2">
                    {{ set.sets_repetitions }}
                  </div>
                  <div class="px-4 py-2  border-l border-muted">
                    {{ set.sets_weight }}
                  </div>
                </template>
              </div>
            </div>
          </template>
        </li>
      </ol>
    </UCard>
  </div>
</template>
