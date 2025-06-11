import type { AuthError } from '@supabase/supabase-js'

type LoginCredentials = {
  email: string
  password: string
}

type RegisterCredentials = {
  options: {
    data: {
      name: string
    }
  }
} & LoginCredentials

export function useAuth() {
  const supabaseClient = useSupabaseClient()
  const user = useSupabaseUser()

  const loading = ref(false)
  const error = ref<AuthError | null>(null)

  async function login(credentials: LoginCredentials) {
    loading.value = true
    const { error: newError } = await supabaseClient.auth.signInWithPassword(credentials)
    error.value = newError
    loading.value = false
  }

  async function register(credentials: RegisterCredentials) {
    loading.value = true
    const { error: newError } = await supabaseClient.auth.signUp(credentials)
    error.value = newError
    loading.value = false
  }

  watchEffect(() => {
    if (user.value) {
      return navigateTo('/')
    }
  })

  return { loading, error, login, register }
}
