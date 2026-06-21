import { convertValues } from '@/services/currencybeacon/currencybeacon'
import type { ConvertCurrencies, ConvertedValue } from '@/types/currencies.type'
import type { FetchDataRequestType } from '@/services/currencybeacon/currencybeacon.types'
import { ref } from 'vue'

type ConvertCurrenciesExtented = {
  convertedValues: ConvertCurrencies
  convertedCurrencyBase: ConvertedValue | undefined
}

export default function useCurrencieConverter() {
  const isLoading = ref<boolean>(false)

  async function convertCurrencies(
    obj: FetchDataRequestType,
    getBaseCurrencyInfo: boolean,
  ): Promise<ConvertCurrenciesExtented> {
    isLoading.value = true

    let convertedValues: ConvertCurrencies = await convertValues(obj)
    let convertedCurrencyBase: ConvertedValue | undefined

    if (getBaseCurrencyInfo) {
      convertedCurrencyBase = await convertValues({
        ...obj,
        amount: 1,
      })
    }

    isLoading.value = false

    return { convertedValues, convertedCurrencyBase }
  }

  return { convertCurrencies, isLoading }
}
