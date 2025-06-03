import { defineStore } from 'pinia'

import type { Exercise, Set, Workout } from '@/types/fitness.types'

export const useFitnessStore = defineStore('fitness', () => {
  const supabaseClient = useSupabaseClient()
  const user = useSupabaseUser()
  const exercises = ref<Exercise[]>([])

  async function getExercises() {
    try {
      const { data, error, status } = await supabaseClient.from('exercises').select(`id, name`)
      if (error && status !== 406)
        throw error
      if (data) {
        exercises.value = data
        return data
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function insertWorkout(date: string, profile_id: string): Promise<string> {
    try {
      const { data, error } = await supabaseClient.from('workouts')
        .insert({ created_at: date, profile_id })
        .select()

      if (error)
        throw error
      const workoutId = data?.[0].id
      return workoutId
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async function insertSets(sets: Set[]) {
    try {
      const { error } = await supabaseClient.from('sets')
        .insert(sets)
      if (error)
        throw error
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async function saveWorkout(workout: Workout) {
    if (!user.value)
      return

    const { id } = user.value

    try {
      const workoutId = await insertWorkout(workout.date, id)
      if (workoutId) {
        const sets: Set[] = []

        for (const routine of workout.routines) {
          for (const innerRoutine of routine.routines) {
            sets.push({
              exercise_id: routine.exercise || '',
              workout_id: workoutId,
              profile_id: id,
              weight: innerRoutine.weight,
              repetitions: innerRoutine.repetitions,
            })
          }
        }

        await insertSets(sets)
      }
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return { exercises, getExercises, saveWorkout }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFitnessStore, import.meta.hot))
}
