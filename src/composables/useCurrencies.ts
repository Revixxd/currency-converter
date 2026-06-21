import { getCurrencies } from '@/services/currencybeacon/currencybeacon'
import type { Currency } from '@/types/currencies.type'
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'

const currencies = ref<Currency[]>([])
const currenciesListCache = useStorage<Currency[]>('currenciesListCache', [], sessionStorage)
let currenciesLoadingPromise: Promise<Currency[]> | null = null

async function ensureCurrenciesLoaded() {
  if (currencies.value.length > 0) {
    return currencies.value
  }

  if (currenciesListCache.value.length > 0) {
    currencies.value = currenciesListCache.value
    return currencies.value
  }

  if (!currenciesLoadingPromise) {
    currenciesLoadingPromise = getCurrencies()
      .then((result) => {
        currencies.value = result
        currenciesListCache.value = result
        return result
      })
      .finally(() => {
        currenciesLoadingPromise = null
      })
  }

  return currenciesLoadingPromise
}

export default function useCurrencies() {
  void ensureCurrenciesLoaded()

  return { currencies }
}
