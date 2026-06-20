<template>
  <Teleport to="body">
    <Transition name="ui-popup">
      <div v-if="open" ref="popupRef" class="ui-popup" :style="style" role="dialog">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, toRef, type CSSProperties } from 'vue'
import { onClickOutside, useElementBounding, onKeyStroke } from '@vueuse/core'

type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

const props = withDefaults(
  defineProps<{
    anchor: HTMLElement | null
    open?: boolean
    placement?: Placement
    offset?: number
    closable?: boolean
  }>(),
  {
    open: true,
    placement: 'bottom-start',
    offset: 8,
    closable: true,
  },
)

const emit = defineEmits<{ close: [] }>()

const popupRef = ref<HTMLElement | null>(null)
const anchorRef = toRef(props, 'anchor')
const { top, bottom, left, right } = useElementBounding(anchorRef)

onClickOutside(
  popupRef,
  () => {
    if (props.closable) emit('close')
  },
  { ignore: [anchorRef] },
)

onKeyStroke('Escape', () => props.closable && emit('close'))

const style = computed<CSSProperties>(() => {
  const s: CSSProperties = { position: 'fixed' }
  s[props.placement.startsWith('bottom') ? 'top' : 'bottom'] = props.placement.startsWith('bottom')
    ? `${bottom.value + props.offset}px`
    : `${window.innerHeight - top.value + props.offset}px`
  s[props.placement.endsWith('start') ? 'left' : 'right'] = props.placement.endsWith('start')
    ? `${left.value}px`
    : `${window.innerWidth - right.value}px`
  return s
})
</script>

<style scoped>
.ui-popup {
  border: 1px solid var(--border-color);
  background-color: white;
  border-radius: var(--border-radius);
}
</style>
