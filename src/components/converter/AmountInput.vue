<template>
  <div class="currency-amount" :class="{ active: isActive }">
    <p class="currency-amount__label">{{ props.data.label }}</p>
    <div class="currency-amount__info">
      <div class="container">
        <!-- {{ currenCurrency }} -->
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
  </div>
</template>

<script setup lang="ts">
import UiInput from '../Ui/UiInput/UiInput.vue'
import { usePopup } from '@/composables/usePopup'
import { defineAsyncComponent, ref } from 'vue'

export interface UiInputProps {
  label: string
  data: currency
  isActive: boolean
}

interface currency {
  currencyCode: string
}

const { open } = usePopup()

const props = withDefaults(defineProps<UiInputProps>(), {
  isActive: () => false,
})

const currenCurrency = ref<currency>(props.data)

// const currencySign = composable(getCurrencySignBasedOnCode(props.currency))
const currencySign = '$'

async function pickCurrency(e: MouseEvent) {
  const chosenCode = await open<string>({
    component: defineAsyncComponent(() => import('./CurrencyList.vue')),
    anchor: e.currentTarget as HTMLElement,
    placement: 'bottom-end',
    closable: true,
  })

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
</style>
