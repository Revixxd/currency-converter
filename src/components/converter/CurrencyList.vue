<template>
  <div class="currency-list">
    <!-- <div class="currency-list__search">
      <UiInput />
    </div> -->
    <div class="currency-list__currencies">
      <div
        class="currencie-container"
        v-for="currency in props.currencies"
        @click="$emit('resolve', currency.shortCode)"
      >
        {{ currency.shortCode }} - {{ currency.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import UiInput from '@/components/Ui/UiInput/UiInput.vue'
import type { currency } from '@/types/currencies.type'

const props = defineProps<{
  currencies?: currency[]
}>()
</script>

<style scoped>
.currency-list {
  height: 300px;
  width: 330px;
  overflow: auto;
}
.currency-list__search,
.currency-list__currencies {
  padding: 20px;
}
.currency-list__search {
  border-bottom: 1px solid var(--border-color);
}
</style>
