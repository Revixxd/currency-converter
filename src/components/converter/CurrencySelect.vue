<template>
  <div class="currency-select">
    <AmountInput
      :data="inputOne"
      :is-active="isInputActive('input-one')"
      :is-disable="!isInputActive('input-one') || isLoading"
      @updateCurrency="(currency: string) => updateOneRefParam(inputOne, 'currency', currency)"
      @updateAmount="(amount: number) => updateRefParamWithDebounce(inputOne, 'amount', amount)"
      label="Amount"
    />
    <ArrowSwap class="currency-select__arrow-swap" @click="reverseValues()" />
    <AmountInput
      :data="inputTwo"
      :is-active="isInputActive('input-two')"
      :is-disable="!isInputActive('input-two') || isLoading"
      @updateCurrency="(currency: string) => updateOneRefParam(inputTwo, 'currency', currency)"
      @updateAmount="(amount: number) => updateRefParamWithDebounce(inputTwo, 'amount', amount)"
      label="Amount"
    />
  </div>
</template>

<script setup lang="ts">
import AmountInput from './AmountInput.vue'
import ArrowSwap from '../../assets/ArrowSwap.svg'
import { computed, onMounted, ref, toRaw, type Ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import useCurrencieConverter from '@/composables/useCurrencieConvert.ts'
import type { ConvertCurrencies, ConvertedValue } from '@/types/currencies.type.ts'

const emit = defineEmits<{
  updateBaseCurrencyInfo: [ConvertedValue]
}>()

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
  convertCurrencies(
    {
      from: sourceInput.value.value.currency,
      to: targetInput.value.value.currency,
      amount: sourceInput.value.value.amount,
    },
    true,
  ).then((result) => {
    const { convertedValues, convertedCurrencyBase } = result
    syncInputsFromResult(convertedValues)
    if (convertedCurrencyBase) {
      emit('updateBaseCurrencyInfo', convertedCurrencyBase)
    }
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

const updateRefParamWithDebounce = useDebounceFn(
  (
    input: Ref<{ currency: string; amount?: number }>,
    type: 'currency' | 'amount',
    value: string | number,
  ) => {
    updateOneRefParam(input, type, value)
  },
  1000,
)

function updateRefParam(
  input: Ref<{ currency: string; amount?: number }>,
  value: {
    currency: string
    amount: number
  },
  refatch: boolean = true,
) {
  input.value = value
  if (refatch) {
    convert()
  }
}

function updateOneRefParam(
  input: Ref<{ currency: string; amount?: number }>,
  type: 'currency' | 'amount',
  value: number | string,
  refatch: boolean = true,
) {
  if (type === 'currency') {
    input.currency = value as string
  } else {
    input.amount = value as number
  }
  if (refatch) {
    convert()
  }
}

function isInputActive(name: string): boolean {
  return activeElement.value === name
}

function reverseValues(): void {
  reverseActiveElement()
  const inputsTempStorage = {
    source: toRaw(sourceInput.value.value),
    target: toRaw(targetInput.value.value),
  }

  updateRefParam(sourceInput.value, inputsTempStorage.target, false)
  updateRefParam(targetInput.value, inputsTempStorage.source, false)
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
}
</style>
