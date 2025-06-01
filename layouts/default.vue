<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <header>
    <AppNavbar />
  </header>
  <main>
    <UContainer>
      <slot />
    </UContainer>
  </main>
  <footer class="fixed bottom-0 inset-x-0 p-2 text-muted text-sm text-right">
    <UContainer>
      Tracking your fitness💪🏾 &copy; {{ currentYear }}
    </UContainer>
  </footer>
</template>
