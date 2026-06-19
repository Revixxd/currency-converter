<template>
  <div class="currency-select">
    <AmountInput :data="propsData1" :is-active="isInputActive('input-one')" />
    <ArrowSwap class="currency-select__arrow-swap" @click="reverseActiveElement()" />
    <AmountInput :data="propsData2" :is-active="isInputActive('input-two')" />
  </div>
</template>

<script setup lang="ts">
import AmountInput from './AmountInput.vue'
import ArrowSwap from '../../assets/ArrowSwap.svg'
import { ref } from 'vue'

const activeElement = ref({
  name: 'input-one',
})

const propsData1 = {
  label: 'Amount',
  currencyCode: 'USD',
  currencyList: ['USD', 'EUR'],
}

const propsData2 = {
  label: 'Converted To',
  currencyCode: 'USD',
  currencyList: ['USD', 'EUR'],
}

function isInputActive(name: string): boolean {
  if (activeElement.value.name === name) {
    return true
  }
  return false
}

function reverseActiveElement(): void {
  console.log(activeElement.value)
  if (activeElement.value.name === 'input-one') {
    activeElement.value.name = 'input-two'
    return
  }
  if (activeElement.value.name === 'input-two') {
    activeElement.value.name = 'input-one'
    return
  }
}
</script>

<style scoped>
.currency-select {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.currency-select__arrow-swap {
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  color: var(--main-color);
  background: white;
  border-radius: 50%;
  border: solid 1px gray;
  padding: 4px;
  position: absolute;
  top: 49%;
  transform: translate(0, -40%);
}
</style>
