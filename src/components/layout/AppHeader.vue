<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HealthBadge from './HealthBadge.vue'

const route = useRoute()

const pageTitle = computed(() => {
  switch (route.name) {
    case 'home':
      return 'Dashboard'
    case 'sales':
      return 'Sales Explorer'
    default:
      return 'Dashboard'
  }
})
</script>

<template>
  <header class="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background px-6">
    <h1 class="text-2xl font-bold text-primary">{{ pageTitle }}</h1>
    <HealthBadge />
  </header>
</template>
