<script lang="ts" setup>
const props = defineProps<{
  title: string
  altPage?: string
}>()
</script>

<template>
  <div class="max-w-md w-full mx-auto space-y-4 items-end">
    <div class="flex items-end justify-between">
      <h1 class="scroll-m-20 text-xl font-semibold tracking-tight capitalize">
        {{ props.title }}
      </h1>

      <UButton v-if="altPage" variant="link" trailing-icon="hugeicons:arrow-right-02" :to="`/${props.altPage}`">
        {{ props.altPage }}
      </UButton>
    </div>
    <UCard>
      <slot />
    </UCard>
  </div>
</template>
