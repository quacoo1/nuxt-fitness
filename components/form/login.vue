<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

import { z } from 'zod'

const supabaseClient = useSupabaseClient()
const user = useSupabaseUser()
const { alertError } = useAlert()

const isLoggingIn = ref(false)
const showModal = ref(false)

const schema = z.object({
  email: z.string().email('Invalid email'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  login(event.data.email)
}

async function login(email: string) {
  isLoggingIn.value = true
  const { error } = await supabaseClient.auth.signInWithOtp({ email, options: {
    emailRedirectTo: 'http://localhost:3000/confirm',
  } })
  if (error) {
    alertError(error)
  } else {
    showModal.value = true
  }
  isLoggingIn.value = false
}

watchEffect(() => {
  if (user.value) {
    return navigateTo('/')
  }
})
</script>

<template>
  <UCard class="max-w-sm w-full mx-auto">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email" size="xl">
        <UInput v-model="state.email" class="w-full" />
      </UFormField>

      <UButton type="submit" size="xl" block :loading="isLoggingIn">
        Submit
      </UButton>
    </UForm>
  </UCard>

  <UModal v-model:open="showModal" title="One Time Password login">
    <template #body>
      <p>
        We've sent a one time password login the the following email
        address: <strong>{{ state.email }}</strong>.
      </p>
      <p class="mt-4 pb-4 text-muted">
        If this is not the correct email address, please try again.
      </p>
    </template>
  </UModal>
</template>
