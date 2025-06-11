<script lang="ts" setup>
import ColorModeButton from './color-mode-button.vue'

const user = useSupabaseUser()
</script>

<template>
  <header class="bg-default/75 backdrop-blur border-b border-default sticky top-0 z-50">
    <nav class="px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center space-x-2">
          <AppSidebar v-if="user" />
          <AppLogo />
        </div>
        <div class="flex space-x-2 ">
          <ColorModeButton />
          <UButton v-if="user" variant="subtle">
            {{ user.user_metadata.name }}
          </UButton>
        </div>
      </div>
    </nav>
  </header>
</template>
