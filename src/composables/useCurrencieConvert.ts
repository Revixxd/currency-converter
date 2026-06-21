import { convertValues } from '@/services/currencybeacon/currencybeacon'
import type { ConvertCurrencies } from '@/types/currencies.type'
import { ref } from 'vue'

export default function useCurrencieConverter() {
  const isLoading = ref<boolean>(false)

  async function convertCurrencies(obj: ConvertCurrencies): Promise<ConvertCurrencies> {
    isLoading.value = true
    const data = await convertValues(obj)
    isLoading.value = false
    return data
  }

  return { convertCurrencies, isLoading }
}
