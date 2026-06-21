<template>
  <div v-if="isLoading">LOADING</div>
  <div v-else class="currency-select">
    <AmountInput
      :data="inputOne"
      :is-active="isInputActive('input-one')"
      @updateCurrency="(currency: string) => updateRefParam(inputOne, 'currency', currency)"
      @updateAmount="(amount: number) => updateRefParam(inputOne, 'amount', amount)"
      label="Amount"
    />
    <ArrowSwap class="currency-select__arrow-swap" @click="reverseActiveElement()" />
    <AmountInput
      :data="inputTwo"
      :is-active="isInputActive('input-two')"
      @updateCurrency="(currency: string) => updateRefParam(inputTwo, 'currency', currency)"
      @updateAmount="(amount: number) => updateRefParam(inputTwo, 'amount', amount)"
      label="Amount"
    />
    <button @click="convert()">convert</button>
  </div>
</template>

<script setup lang="ts">
import AmountInput from './AmountInput.vue'
import ArrowSwap from '../../assets/ArrowSwap.svg'
import { computed, onMounted, ref, type Ref } from 'vue'
import useCurrencieConverter from '@/composables/useCurrencieConvert.ts'
import type { ConvertCurrencies } from '@/types/currencies.type.ts'

const { convertCurrencies, isLoading } = useCurrencieConverter()

const inputOne = ref({
  currency: 'USD',
  amount: 100,
})

const inputTwo = ref({
  currency: 'EUR',
  amount: undefined as number | undefined,
})

const activeElement = ref<'input-one' | 'input-two'>('input-one')

const sourceInput = computed(() => (activeElement.value === 'input-one' ? inputOne : inputTwo))
const targetInput = computed(() => (activeElement.value === 'input-one' ? inputTwo : inputOne))

function convert() {
  convertCurrencies({
    from: sourceInput.value.value.currency,
    to: targetInput.value.value.currency,
    amount: sourceInput.value.value.amount,
  }).then((result) => {
    syncInputsFromResult(result)
  })
}

onMounted(async () => {
  convert()
})

function syncInputsFromResult(result: ConvertCurrencies) {
  sourceInput.value.value = {
    currency: result.from,
    amount: result.amount,
  }
  targetInput.value.value = {
    currency: result.to,
    amount: result.value,
  }
}

function updateRefParam(
  input: Ref<{ currency: string; amount?: number }>,
  type: 'currency' | 'amount',
  value: string | number,
) {
  if (type === 'currency') {
    input.currency = value as string
  } else {
    input.amount = value as number
  }
}

function isInputActive(name: string): boolean {
  return activeElement.value === name
}

function reverseActiveElement(): void {
  activeElement.value = activeElement.value === 'input-one' ? 'input-two' : 'input-one'
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
