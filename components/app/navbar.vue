<script lang="ts" setup>
import ColorModeButton from './color-mode-button.vue'

const user = useSupabaseUser()
const supabaseClient = useSupabaseClient()
const { alertError } = useAlert()
const isLoggingOut = ref(false)

async function logout() {
  isLoggingOut.value = true
  const { error } = await supabaseClient.auth.signOut()
  navigateTo('/login')
  if (error) {
    alertError(error)
  }
  isLoggingOut.value = false
}
</script>

<template>
  <nav class="bg-default border-b border-muted">
    <UContainer>
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <UButton size="xl" variant="ghost" color="neutral" icon="hugeicons:equipment-gym-03" :ui="{ base: 'font-mono', leadingIcon: 'text-primary' }">
              Fitness
            </UButton>
          </div>
        </div>
        <div class="flex space-x-4">
          <ColorModeButton />
          <UButton v-if="user" icon="i-hugeicons-logout-03" :loading="isLoggingOut" @click="logout">
            Logout
          </UButton>
        </div>
      </div>
    </UContainer>
  </nav>
</template>
