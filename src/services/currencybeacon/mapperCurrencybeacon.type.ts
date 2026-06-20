// Mutual

type CurrencybeaconResponseMeta = {
  meta: {
    code: number
    disclaimer: string
  }
}

// Currencies
type CurrencybeaconCurrenciesResponseContent = {
  id: number
  name: string
  short_code: string
  code: number
  precision: number
  subunit: number
  symbol: string
  symbol_first: boolean
  decimal_mark: string
  thousands_separator: string
}

type CurrencybeaconCurrencyResponse = {
  meta: CurrencybeaconResponseMeta
  response: CurrencybeaconCurrenciesResponseContent[]
} & {
  [key: string]: CurrencybeaconCurrenciesResponseContent
}

// Convert

type CurrencybeaconConvertResponseContent = {
  timestamp: string
  date: Date
  from: string
  to: string
  amount: number
  value: number
}

type CurrencybeaconConvertResponse = {
  meta: CurrencybeaconResponseMeta
  response: CurrencybeaconConvertResponseContent
} & CurrencybeaconConvertResponseContent

export type { CurrencybeaconCurrencyResponse, CurrencybeaconConvertResponse }
