<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string(),
  password: z.string().min(6, 'Must be at least 8 characters'),
  confirmPassword: z.string().min(6, 'Must be at least 8 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not much',
  path: ['confirmPassword'],
})

type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({
  email: undefined,
  name: undefined,
  password: undefined,
  confirmPassword: undefined,
})

const { alertError, alertSuccess } = useAlert()

const { loading, error, register, login } = useAuth()

if (error.value) {
  alertError(error.value.message)
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const credentials = {
    email: event.data.email,
    password: event.data.password,
    options: {
      data: {
        name: event.data.name,
      },
    },
  }
  register(credentials)
  if (error.value) {
    alertError(error.value.message)
  } else {
    alertSuccess('Created account')
    await login({ email: credentials.email, password: credentials.password })
  }
}
</script>

<template>
  <AuthCard title="Register" alt-page="login">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" type="email" class="w-full" />
      </UFormField>
      <UFormField label="Name" name="name">
        <UInput v-model="state.name" class="w-full" />
      </UFormField>
      <UFormField label="Password" name="password">
        <AppPassword v-model="state.password" />
      </UFormField>
      <UFormField label="Confirm Password" name="confirmPassword">
        <AppPassword v-model="state.confirmPassword" />
      </UFormField>
      <UButton type="submit" block :loading="loading">
        Submit
      </UButton>
    </UForm>
  </AuthCard>
</template>
