<template>
  <div class="app">
    <Popup />
    <Overlay />
    <CurrencyConverter />
  </div>
</template>

<script setup lang="ts">
import Overlay from './components/base/Overlay.vue'
import Popup from './components/base/popup.vue'
import CurrencyConverter from './components/converter/CurrencyConverter.vue'
</script>
