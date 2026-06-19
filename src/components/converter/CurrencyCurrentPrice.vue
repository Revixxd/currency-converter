<template>
  <div class="curreny-current-price">
    <p class="curreny-current-price__price">1 USD = 0.92 EUR</p>
    <p class="curreny-current-price__date">as of Jun 18, 11:44 PM</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.curreny-current-price {
  display: flex;
  justify-content: space-between;
}

.curreny-current-price .curreny-current-price__date {
  color: var(--secondary-text);
}
</style>
