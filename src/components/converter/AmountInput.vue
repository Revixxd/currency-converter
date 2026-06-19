<template>
  <div class="currency-amount" :class="{ active: isActive }">
    <p class="currency-amount__label">{{ props.data.label }}</p>
    <div class="currency-amount__info">
      <div class="container">
        <p>{{ currencySign }}</p>
        <UiInput type="number" :numeric="true" />
        <div class="container__select-currency">
          <span class="container__select-currency__divider"> </span>
          <div class="container__select-currency__curencyCode">
            {{ props.data.currencyCode }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiInput from '../Ui/UiInput/UiInput.vue'

export interface UiInputProps {
  data: {
    label: string
    currencyCode: string
    currencyList: string[]
  }
  isActive: boolean
}

const props = withDefaults(defineProps<UiInputProps>(), {
  isActive: () => false,
})

// const currencySign = composable(getCurrencySignBasedOnCode(props.currency))
const currencySign = '$'

// const model = defineModel
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
  border: var(--border) solid 1px;
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
