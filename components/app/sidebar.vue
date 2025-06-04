<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const isOpen = ref(false)
const route = useRoute()

const user = useSupabaseUser()
const supabaseClient = useSupabaseClient()
const { alertError } = useAlert()
const isLoggingOut = ref(false)

async function logout() {
  isLoggingOut.value = true
  const { error } = await supabaseClient.auth.signOut()
  navigateTo('/login')
  if (error) {
    alertError(error.message)
  }
  isLoggingOut.value = false
}

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Dashboard',
      icon: 'i-hugeicons-home-09',
      to: '/',
    },
    {
      label: 'Track',
      icon: 'i-hugeicons-dumbbell-02',
      to: '/track',
    },
    {
      label: 'Graph',
      icon: 'i-hugeicons-chart-up',
      to: '/graph',
    },
  ],
])

watch(() => route.path, () => {
  isOpen.value = false
})
</script>

<template>
  <USlideover v-model:open="isOpen" side="left" title="Menu" :ui="{ content: 'md:max-w-80' }">
    <UButton icon="i-hugeicons-menu-11" color="neutral" variant="ghost" />

    <template #body>
      <UNavigationMenu orientation="vertical" :items="items" />
    </template>

    <template #footer>
      <UButton
        v-if="user" color="neutral" variant="ghost" icon="i-hugeicons-logout-03" block :ui="{ base: 'justify-start' }"
        @click="logout"
      >
        Logout
      </UButton>
    </template>
  </USlideover>
</template>
