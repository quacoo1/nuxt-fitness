export type Exercise = {
  id: string
  name: string
}

export type Routine = {
  id?: string
  exercise: string
  routines: {
    weight: number
    repetitions: number
  }[]
}

export type Workout = {
  date: Date | any
  routines: Routine[]
}

export type Set = {
  exercise_id: string
  workout_id: string
  profile_id: string
  weight: number
  repetitions: number
}

export type ExercisesWithWorkouts = {
  exercises: Exercise[]
  workouts: Workout[]
}

export type WorkoutFromDatasource = {
  id: string
  created_at: string
  sets: {
    workout_id: string
    weight: number
    repetitions: number
    exercises: {
      name: string
      color: string
    }
  }[]
}[]

export type WorkoutViewFromDatasource = {
  profile_id: string
  workout_id: string
  workout_created_at: string
  exercise_name: string
  sets_weight: number
  sets_repetitions: number
}

export type Dashboard = {
  profile_id: string
  last_workout_date: string
  total_workouts: number
  most_weight_single_workout: number
  cumulative_weight: number
}
