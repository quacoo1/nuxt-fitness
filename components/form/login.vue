<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

const { alertError, alertSuccess } = useAlert()

const { loading, error, login } = useAuth()

if (error.value) {
  alertError(error.value.message)
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const credentials = event.data
  login(credentials)
  alertSuccess('logged In')
}
</script>

<template>
  <AuthCard title="login" alt-page="register">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" class="w-full" />
      </UFormField>
      <UFormField label="Password" name="password">
        <AppPassword v-model="state.password" />
      </UFormField>
      <UButton type="submit" block :loading="loading">
        Submit
      </UButton>
    </UForm>
  </AuthCard>
</template>
