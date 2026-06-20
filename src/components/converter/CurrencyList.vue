<template>
  <div class="currency-list">
    <!-- <div class="currency-list__search">
      <UiInput />
    </div> -->
    <div class="currency-list__currencies">
      <div
        class="currencie-container"
        v-for="currency in currencies"
        @click="$emit('resolve', currency.currencieCode)"
      >
        {{ currency.currencieCode }} - {{ currency.currencieFullName }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import UiInput from '@/components/Ui/UiInput/UiInput.vue'

const currencies = [
  {
    currencieCode: 'USD',
    currencieFullName: 'United State dolar',
  },
  {
    currencieCode: 'EUR',
    currencieFullName: 'Euro',
  },
]
</script>

<style scoped>
.currency-list__search,
.currency-list__currencies {
  padding: 20px;
}
.currency-list__search {
  border-bottom: 1px solid var(--border-color);
}
</style>
