import { defineStore } from 'pinia'

import type { Dashboard, Exercise, Set, Workout, WorkoutFromDatasource, WorkoutViewFromDatasource } from '@/types/fitness.types'

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

  getExercises()

  const workouts: Ref<WorkoutViewFromDatasource[] | []> = ref([])

    type GetWorkoutsOptions = {
      order: string
    }
    async function getWorkouts(options: GetWorkoutsOptions = { order: 'ascending' }) {
      try {
        if (!user.value)
          return
        const { id } = user.value

        const order = { ascending: options.order === 'ascending' }

        const { data, error, status }: any = await supabaseClient
          .from('workout_history_view')
          .select()
          .eq('profile_id', id)
          .order('workout_created_at', order)

        if (error && status !== 406)
          throw error

        if (data) {
          workouts.value = data
        }
      } catch (error: any) {
        console.error(error.message)
      }
    }
    getWorkouts({ order: 'descending' })

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

    const workoutsWithSets = ref<WorkoutFromDatasource | []>([])
    async function getWorkoutsWithSets(options: GetWorkoutsOptions = { order: 'ascending' }) {
      try {
        if (!user.value)
          return
        const { id } = user.value

        const order = { ascending: options.order === 'ascending' }

        const { data, error, status }: any = await supabaseClient
          .from('workouts')
          .select(`id, created_at,
                  sets (
                    workout_id, weight, repetitions,
                    exercises ( name, color ) 
                  )`)
          .eq('profile_id', id)
          .order('created_at', order)

        if (error && status !== 406)
          throw error

        if (data) {
          workoutsWithSets.value = data
          return data
        }
      } catch (error) {
        console.error(error)
      }
    }
    getWorkouts()

    const dashboard = ref<Dashboard>()
    async function getDashboard() {
      try {
        if (!user.value)
          return
        const { id } = user.value
        const { data, error, status } = await supabaseClient.from('workout_dashboard_view')
          .select()
          .eq('profile_id', id)

        if (error && status !== 406)
          throw error
        if (data && data.length === 1) {
          dashboard.value = data[0]
        }
      } catch (error) {
        console.error(error)
      }
    }
    getDashboard()

    return {
      exercises,
      getExercises,
      workouts,
      getWorkouts,
      saveWorkout,
      workoutsWithSets,
      getWorkoutsWithSets,
      dashboard,
      getDashboard,
    }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFitnessStore, import.meta.hot))
}
