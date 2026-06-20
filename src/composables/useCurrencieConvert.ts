import { convertValues } from '@/services/currencybeacon/currencybeacon'
import type { ConvertCurrencies, ConvertedValue } from '@/types/currencies.type'
import { ref } from 'vue'

export default function useCurrencieConverter() {
  const convertedValue = ref<ConvertedValue>()

  // on first init here should be caclutated values for default setup
  // convertCurrencies()

  function convertCurrencies(obj: ConvertCurrencies): void {
    convertValues(obj).then((ConvertedValue) => {
      convertedValue.value = ConvertedValue
    })
  }

  return { convertCurrencies, convertedValue }
}
