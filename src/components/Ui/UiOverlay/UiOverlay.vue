<template>
  <Teleport to="body">
    <Transition name="ui-overlay">
      <div v-if="open" class="overlay">
        <div class="overlay__background"></div>
        <div ref="overlayContentRef" class="overlay__content">
          <div class="overlay__content__topbar">
            <!-- <slot name="topbar-slot"/> -->
            <button @click="emit('close')">X</button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { ref, Teleport } from 'vue'

const props = withDefaults(
  defineProps<{
    open?: boolean
  }>(),
  {
    open: true,
  },
)

const emit = defineEmits<{ close: [] }>()

const overlayContentRef = ref<HTMLElement | null>(null)

onClickOutside(overlayContentRef, () => {
  emit('close')
})
onKeyStroke('Escape', () => emit('close'))
</script>

<style scoped>
.overlay {
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
}
.overlay__background {
  opacity: 50%;
  height: 100%;
  background-color: var(--overlay-background);
}
.overlay__content {
  width: 100%;
  height: 60vh;
  top: 40vh;
  z-index: 100;
  border-radius: var(--border-radius);
  background: var(--white);
  position: absolute;
}
.overlay__content__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}
</style>
