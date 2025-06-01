<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Home',
      icon: 'i-hugeicons-home-09',
      to: '/',
    },
  ],
])
</script>

<template>
  <USlideover side="left" title="Menu" :ui="{ content: 'max-w-sm' }">
    <UButton icon="i-hugeicons-menu-11" color="neutral" variant="ghost" />

    <template #body>
      <UNavigationMenu orientation="vertical" :items="items" />
    </template>
  </USlideover>
</template>
