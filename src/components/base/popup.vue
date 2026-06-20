<script setup lang="ts">
import { usePopup } from '@/composables/usePopup.ts'
import UiPopup from '@/components/Ui/UiPopup/UiPopup.vue'

const { popups, close } = usePopup()

console.log(popups)
</script>

<template>
  <UiPopup
    v-for="popup in popups"
    :key="popup.id"
    :anchor="popup.anchor"
    :placement="popup.placement"
    :closable="popup.closable"
    open
    @close="close(popup.id, null)"
  >
    <component
      :is="popup.component"
      v-bind="popup.props"
      @resolve="(value: unknown) => close(popup.id, value)"
    />
  </UiPopup>
</template>
