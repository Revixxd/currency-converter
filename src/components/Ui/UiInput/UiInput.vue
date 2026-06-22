<template>
  <input
    v-model="model"
    :disabled="props.isDisable"
    :type="props.numeric ? 'text' : props.type"
    :inputmode="props.numeric ? 'numeric' : undefined"
    class="ui-input"
    @input="onInput"
    :aria-label="props.label ? label : ''"
  />
</template>

<script setup lang="ts">
import type { InputType } from './UiInput.type'

const props = withDefaults(
  defineProps<{
    type?: InputType
    numeric?: boolean
    label: string
    isDisable: boolean
  }>(),
  {
    type: 'text',
    numeric: false,
    isDisable: false,
  },
)

const model = defineModel<string | number>({ default: '' })

function onInput(e: Event) {
  if (!props.numeric) return
  const el = e.target as HTMLInputElement
  const cleaned = el.value.replace(/\D/g, '')
  el.value = cleaned
  model.value = cleaned
}
</script>

<style scoped>
.ui-input {
  all: unset;
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
}

/* Chrome, Safari, Edge */
.ui-input::-webkit-outer-spin-button,
.ui-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.ui-input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
