<script setup lang="ts">
const modelValue = defineModel<string>()
const show = ref(false)
</script>

<template>
  <UInput
    v-model="modelValue"
    :type="show ? 'text' : 'password'"
    class="w-full"
    :ui="{ trailing: 'pe-1' }"
  >
    <template #trailing>
      <UButton
        color="neutral"
        variant="link"
        :icon="show ? 'hugeicons:view-off-slash' : 'hugeicons:view'"
        :aria-label="show ? 'Hide password' : 'Show password'"
        :aria-pressed="show"
        aria-controls="password"
        @click="show = !show"
      />
    </template>
  </UInput>
</template>
