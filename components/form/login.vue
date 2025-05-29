<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
})

type Schema = z.output<typeof schema>

const userStore = useUserStore()
const state = reactive<Partial<Schema>>({
  email: undefined,
})

const showModal = ref(false)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  userStore.login(event.data.email)
  showModal.value = true
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Email" name="email" size="xl">
      <UInput v-model="state.email" class="w-full" />
    </UFormField>

    <UButton type="submit" size="xl" block>
      Submit
    </UButton>
  </UForm>

  <UModal :open="showModal">
    <template #content>
      Hello
    </template>
  </UModal>
</template>
