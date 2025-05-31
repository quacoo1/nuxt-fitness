import type { AuthError, PostgrestError } from '@supabase/supabase-js'

export function useAlert() {
  const toast = useToast()

  function alertError(error: AuthError | PostgrestError) {
    toast.add({
      title: 'Error',
      description: error.message,
      icon: 'i-hugeicons-alert-01',
      color: 'error',
    })
  }
  return { alertError }
}
