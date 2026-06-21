type FetchDataType = {
  source: string
  version: string
  endpoint: string
  apiKey: string
  query?: Record<string, string>
  headers?: Record<string, string>
  from?: string
  to?: string
  amount: number
}

type FetchDataRequestType = {
  from: string
  to: string
  amount: number
}

export type { FetchDataType, FetchDataRequestType }
