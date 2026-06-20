import type { Currency, ConvertedValue } from '@/types/currencies.type'
import type {
  CurrencybeaconCurrencyResponse,
  CurrencybeaconConvertResponse,
} from './mapperCurrencybeacon.type'

function mapCurrenciesResponseToPlainConvertValue(
  data: CurrencybeaconCurrencyResponse,
): Currency[] {
  return data.response.map((currency) => {
    return {
      name: currency.name,
      shortCode: currency.short_code,
      symbol: currency.symbol,
    }
  })
}

function mapConvertResponseToPlainConvertValue(
  data: CurrencybeaconConvertResponse,
): ConvertedValue {
  return {
    timestamp: data.response.timestamp,
    date: data.response.date,
    from: data.response.from,
    to: data.response.to,
    amount: data.response.amount,
    value: data.response.value,
  }
}

export { mapCurrenciesResponseToPlainConvertValue, mapConvertResponseToPlainConvertValue }
