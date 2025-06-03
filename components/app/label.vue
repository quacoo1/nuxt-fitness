<script setup lang="ts">
const props = defineProps<{
  for?: string
}>()
</script>

<template>
  <label class="block font-medium text-default" :for="props.for">
    <slot />
  </label>
</template>
