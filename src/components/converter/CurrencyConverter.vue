<template>
  <div class="converter">
    <h2>Currency Converter</h2>
    <div class="container">
      <CurrencySelect @updateBaseCurrencyInfo="baseCurrencyInfo = $event" />
      <span class="converter__divider" />
      <CurrencyCurrentPrice :baseCurrencyInfo="baseCurrencyInfo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ConvertedValue } from '@/types/currencies.type.ts'
import { ref } from 'vue'
import CurrencySelect from './CurrencySelect.vue'
import CurrencyCurrentPrice from './CurrencyCurrentPrice.vue'

const baseCurrencyInfo = ref<ConvertedValue>()
</script>

<style scoped>
.converter {
  width: 90vw;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.container {
  padding: 16px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.converter__divider {
  height: 1px;
  background-color: var(--divider-color);
}
</style>
