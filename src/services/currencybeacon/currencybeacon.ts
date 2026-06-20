import type { ConvertCurrencies } from '@/types/currencies.type'
import type { FetchDataType } from './currencybeacon.types'
import { ofetch } from 'ofetch'
import currenciesListJson from '@/mock/currencybeacon.ts/currencies.json'
import ConvertedValuesMock from '@/mock/currencybeacon.ts/convert.json'
import {
  mapConvertResponseToPlainConvertValue,
  mapCurrenciesResponseToPlainConvertValue,
} from './mapperCurrencybeacon'

const apiKey = import.meta.env.VITE_CURRENCYBEACON_TOKEN
const version = import.meta.env.VITE_CURRENCYBEACON_API_VERSION
const isDev = import.meta.env.DEV

// TODO: refactor params passing based on request rather than setting all possible props
async function request(options: FetchDataType) {
  let response
  let error

  try {
    const request = await ofetch(`/api/v${options.version}/${options.endpoint}`, {
      query: {
        api_key: options.apiKey,
        from: options.from ?? '',
        to: options.to ?? '',
        amount: options.amount ?? '',
      },
    })
    response = request
  } catch (fetchError) {
    error = fetchError
  }

  return {
    response,
    error,
  }
}
// TODO: Error handling
async function getCurrencies() {
  if (isDev) {
    return mapCurrenciesResponseToPlainConvertValue(currenciesListJson)
  } else {
    const requestData = {
      source: 'Currencybeacon',
      version: version,
      endpoint: 'currencies',
      apiKey: apiKey,
    }

    const { response, error } = await request(requestData)

    // if(error) {
    // throw error
    // popup -> error
    // }
    return mapCurrenciesResponseToPlainConvertValue(response)
  }
}

// TODO: Error handling
async function convertValues(obj: ConvertCurrencies) {
  if (isDev) {
    return mapConvertResponseToPlainConvertValue(ConvertedValuesMock)
  } else {
    const requestData = {
      source: 'Currencybeacon',
      version: version,
      endpoint: 'convert',
      apiKey: apiKey,
      from: obj.from ?? '',
      to: obj.to ?? '',
      amount: obj.amount ?? '',
    }

    const { response, error } = await request(requestData)

    // if(error) {
    // throw error
    // popup -> error
    // }

    return mapConvertResponseToPlainConvertValue(response)
  }
}

export { getCurrencies, convertValues }
