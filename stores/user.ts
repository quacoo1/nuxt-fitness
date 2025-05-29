import { defineStore } from 'pinia'

import type { UserSession } from '~/types/users'

export const useUserStore = defineStore('user', () => {
  const session = ref<UserSession | null>(null)
  const supabaseClient = useSupabaseClient()

  const login = async (email: string, callback?: () => void): Promise<void> => {
    const { error } = await supabaseClient.auth.signInWithOtp({ email })
    if (error) {
      console.error('login error:', error.message)
      throw new Error('Login Failed')
    }
    if (typeof callback === 'function') {
      callback()
    }
  }

  const logout = async (callback?: () => void): Promise<void> => {
    const { error } = await supabaseClient.auth.signOut()
    if (error) {
      console.error('logout error:', error.message)
      throw new Error('Logout Failed')
    }
    navigateTo('/login')
    if (typeof callback === 'function') {
      callback()
    }
  }

  const insertProfile = async (): Promise<void> => {
    if (session.value !== null) {
      const user = session.value.user

      const { error } = await supabaseClient.from('profiles')
        .upsert({ id: user.id, email_address: user.email, updated_at: new Date() })
        .select()

      if (error) {
        console.error(error.message)
        throw error
      }
    }
  }

  const setUserSession = (data: any): void => {
    session.value = data
  }

  const userIsLoggedIn = computed(() => {
    if (session.value?.expires_at) {
      const expiresAt = new Date(0).setUTCSeconds(session.value.expires_at)
      const now = new Date().getSeconds()
      return now < expiresAt
    }
    return false
  })

  return { session, login, logout, insertProfile, setUserSession, userIsLoggedIn }
})
