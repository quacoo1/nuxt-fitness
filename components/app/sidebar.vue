<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const isOpen = ref(false)
const route = useRoute()

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Home',
      icon: 'i-hugeicons-home-09',
      to: '/',
    },
    {
      label: 'Track',
      icon: 'i-hugeicons-dumbbell-02',
      to: '/track',
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
  </USlideover>
</template>
