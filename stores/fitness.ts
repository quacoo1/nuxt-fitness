import { defineStore } from 'pinia'

import type { Exercise } from '~/types/fitness.types'

export const useFitnessStore = defineStore('fitness', () => {
  const supabaseClient = useSupabaseClient()
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

  return { exercises, getExercises }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFitnessStore, import.meta.hot))
}
