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
    alertError(error.message)
  }
  isLoggingOut.value = false
}
</script>

<template>
  <nav class="bg-default">
    <UContainer>
      <div class="flex h-16 items-center justify-between">
        <div class="flex space-x-2 ">
          <AppSidebar v-if="user" />
          <div class="flex items-center space-x-2">
            <Icon name="hugeicons:equipment-gym-03" class="text-primary size-6" />
            <span class="font-mono">Fitness</span>
          </div>
        </div>

        <div class="flex">
          <ColorModeButton />
          <UButton v-if="user" color="neutral" variant="ghost" icon="i-hugeicons-logout-03" :loading="isLoggingOut" @click="logout">
            Logout
          </UButton>
        </div>
      </div>
    </UContainer>
  </nav>
</template>
