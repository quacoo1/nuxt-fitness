<script lang="ts" setup>
import ColorModeButton from './color-mode-button.vue'

const user = useSupabaseUser()
</script>

<template>
  <nav class="bg-default">
    <UContainer>
      <div class="flex h-16 items-center justify-between">
        <div class="flex space-x-2 ">
          <AppSidebar v-if="user" />
        </div>

        <div class="flex items-center space-x-2">
          <Icon name="hugeicons:equipment-gym-03" class="text-primary size-6" />
          <span class="font-mono">Fitness</span>
        </div>

        <ColorModeButton />
      </div>
    </UContainer>
  </nav>
</template>
