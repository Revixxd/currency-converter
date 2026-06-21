<template>
  <div v-if="props.baseCurrencyInfo" class="curreny-current-price">
    <p class="curreny-current-price__price">{{ currencyInfo }}</p>
    <p class="curreny-current-price__date">as of {{ currencyDate }}</p>
  </div>
</template>

<script setup lang="ts">
import type { ConvertedValue } from '@/types/currencies.type'
import { computed } from 'vue'
import getMonthBasedOnNumber from '@/helpers/getMonth'
type CurrencyCurrentPriceProps = {
  baseCurrencyInfo: ConvertedValue
}

const props = defineProps<CurrencyCurrentPriceProps>()

const currencyInfo = computed(() => {
  const data = props.baseCurrencyInfo
  return `${data.amount} ${data.from} = ${data.value} ${data.to}`
})
const currencyDate = computed(() => {
  const date = new Date(props.baseCurrencyInfo.timestamp * 1000)

  return `${getMonthBasedOnNumber(date.getMonth()).shortName} ${date.getDay()}, at ${date.getHours()}:${date.getMinutes()}`
})
</script>

<style scoped>
.curreny-current-price {
  display: flex;
  justify-content: space-between;
}

.curreny-current-price .curreny-current-price__date {
  color: var(--secondary-text);
}
</style>
