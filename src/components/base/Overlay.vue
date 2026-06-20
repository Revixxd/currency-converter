<template>
  <UiOverlay v-if="overlay" open @close="close()">
    <component :is="overlay.component" @resolve="(value: unknown) => close(value)" />
  </UiOverlay>
</template>

<script setup lang="ts">
import UiOverlay from '../Ui/UiOverlay/UiOverlay.vue'
import useOverlay from '@/composables/useOverlay.ts'

const { overlay, close } = useOverlay()
</script>

<style scoped></style>
