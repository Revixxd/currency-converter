import { getCurrencies } from '@/services/currencybeacon/currencybeacon'
import type { Currency } from '@/types/currencies.type'
import { ref } from 'vue'

export default function useCurrencies() {
  const currencies = ref<Currency[]>([])

  getCurrencies().then((result) => {
    currencies.value = result
  })

  return { currencies }
}
