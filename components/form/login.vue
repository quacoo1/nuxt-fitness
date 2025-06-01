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

  <UModal v-model:open="showModal" title="One Time Password login" fullscreen>
    <template #body>
      <div class="flex h-full items-center">
        <div>
          <h2 class="text-4xl font-light">
            We've sent a one time password login to:
            <br>
            <span class="text-primary font-medium">{{ state.email }}</span>.
          </h2>
          <p class="mt-8 pb-2 text-muted max-w-2xl">
            Using the link in the email, you can proceed to the app and you can close this browser window. If this is not the correct email address, please try again.
          </p>
        </div>
      </div>
    </template>
    <template #footer>
      <UButton @click="showModal = !showModal">
        Close
      </UButton>
    </template>
  </UModal>
</template>
