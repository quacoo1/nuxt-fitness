<script lang="ts" setup>
const session = useSupabaseSession()
const user = useSupabaseUser()
const supabaseClient = useSupabaseClient()
const { alertError } = useAlert()

const title = 'Nuxt Fitness'
const description = 'Demo of a fitness  app using Nuxt and Supabase.'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})

onMounted(async () => {
  if (session.value && user.value) {
    const { error } = await supabaseClient.from('profiles')
      .upsert({ id: user.value.id, email_address: user.value.email, updated_at: (new Date()).toISOString() })
      .select()

    if (error) {
      alertError(error)
    }
  }
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
