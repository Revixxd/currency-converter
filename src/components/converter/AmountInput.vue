<template>
  <div class="currency-amount" :class="{ active: isActive }">
    <p class="currency-amount__label">{{ props.label }}</p>
    <div class="currency-amount__info" v-if="!isMobile">
      <div class="container">
        <p>{{ currencySign }}</p>
        <UiInput type="number" :numeric="true" />
        <div class="container__select-currency" @click="pickCurrency">
          <span class="container__select-currency__divider"> </span>
          <div class="container__select-currency__curencyCode">
            {{ currenCurrency.currencyCode }}
          </div>
        </div>
      </div>
    </div>
    <div class="currency-amount__info mobile" v-else-if="isMobile">
      <div class="container">
        <div class="container__select-currency" @click="pickCurrency">
          <div class="container__select-currency__curencyCode">
            {{ currenCurrency.currencyCode }}
          </div>
        </div>
        <p>{{ currencySign }}</p>
        <UiInput type="number" :numeric="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { currency } from '@/types/currencies.type.ts'
import UiInput from '../Ui/UiInput/UiInput.vue'
import { usePopup } from '@/composables/usePopup'
import { defineAsyncComponent, ref, toValue, unref } from 'vue'
import { useSize } from '@/composables/useSize.ts'
import useOverlay from '@/composables/useOverlay.ts'
import useCurrencies from '@/composables/useCurrencies.ts'

const { currencies } = useCurrencies()

export interface UiInputProps {
  label: string
  data: {
    currencyCode: string
  }
  isActive: boolean
}

const { isMobile } = useSize()
const { open: openPopup } = usePopup()
const { open: openOverlay } = useOverlay()

const props = withDefaults(defineProps<UiInputProps>(), {
  isActive: () => false,
})

const lazyCurrentListComponent = defineAsyncComponent(() => import('./CurrencyList.vue'))

const currenCurrency = ref<{
  currencyCode: string
}>(props.data)

// const currencySign = composable(getCurrencySignBasedOnCode(props.currency))
const currencySign = '$'

async function pickCurrency(e: MouseEvent) {
  let chosenCode
  if (isMobile.value) {
    chosenCode = await openOverlay<string>({
      component: lazyCurrentListComponent,
      props: { currencies: unref(currencies.value) },
    })
  } else {
    chosenCode = await openPopup<string>({
      component: lazyCurrentListComponent,
      anchor: e.currentTarget as HTMLElement,
      placement: 'bottom-end',
      closable: true,
      props: { currencies: unref(currencies.value) },
    })
  }

  if (chosenCode) {
    currenCurrency.value = {
      currencyCode: chosenCode,
    }
  }
}
</script>

<style scoped>
.currency-amount {
  width: 100%;
  padding-bottom: 20px;
}
.currency-amount__label {
  color: var(--secondary-text);
}

.currency-amount__info {
  border: var(--border-color) solid 1px;
  overflow: hidden;
  border-radius: var(--border-radius);
}

.currency-amount__info .container {
  padding-left: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.container__select-currency {
  max-width: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: var(--bg-secondary);
}

.container__select-currency__divider {
  display: block;
  width: 1px;
  height: 100%;
  height: 4rem;
  background-color: var(--divider-color);
}

.container__select-currency__curencyCode {
  padding: 1rem;
}

/* Active State */

.active .currency-amount__info {
  background-color: var(--accent-main);
}

.active .container__select-currency {
  background-color: var(--accent-secondary);
}

/* MOBILE */

.mobile .container {
  padding: 0.5rem;
}

.mobile .container__select-currency {
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 0.3rem;
}

.mobile .container__select-currency__curencyCode {
  padding: 0;
}
</style>
