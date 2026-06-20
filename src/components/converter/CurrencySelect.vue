<template>
  <div class="currency-select">
    <AmountInput :data="propsData1" label="Amount" :is-active="isInputActive('input-one')" />
    <ArrowSwap class="currency-select__arrow-swap" @click="reverseActiveElement()" />
    <AmountInput :data="propsData2" label="Converted To" :is-active="isInputActive('input-two')" />
    <Button @click="convert()">convert</Button>
    {{ convertedValue }}
  </div>
</template>

<script setup lang="ts">
import AmountInput from './AmountInput.vue'
import ArrowSwap from '../../assets/ArrowSwap.svg'
import { onMounted, ref } from 'vue'
import useCurrencieConverter from '@/composables/useCurrencieConvert.ts'

const { convertCurrencies, convertedValue } = useCurrencieConverter()

function convert() {
  convertCurrencies({
    from: 'USD',
    to: 'EUR',
    amount: 100,
  })
}

const activeElement = ref({
  name: 'input-one',
})

const propsData1 = {
  currencyCode: 'USD',
}

const propsData2 = {
  currencyCode: 'USD',
}

function isInputActive(name: string): boolean {
  if (activeElement.value.name === name) {
    return true
  }
  return false
}

function reverseActiveElement(): void {
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
  top: 48%;
  transform: translate(0, -40%);
}
</style>
