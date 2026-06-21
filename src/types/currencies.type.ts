type Currency = {
  name: string
  shortCode: string
  symbol: string
}

type ConvertedValue = {
  timestamp: number
  from: string
  to: string
  amount: number
  value: number
}

type ConvertCurrencies = {
  to: string
  from: string
  amount: number
  value: number
}

export type { Currency, ConvertedValue, ConvertCurrencies }
