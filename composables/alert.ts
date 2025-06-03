export function useAlert() {
  const toast = useToast()

  function alertError(message: string) {
    toast.add({
      title: 'Error',
      description: message,
      icon: 'i-hugeicons-alert-01',
      color: 'error',
    })
  }

  function alertSuccess(message: string) {
    toast.add({
      title: 'Success',
      description: message,
      icon: 'i-hugeicons-information-diamond',
      color: 'info',
    })
  }
  return { alertError, alertSuccess }
}
