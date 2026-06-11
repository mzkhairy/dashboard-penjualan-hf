<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BarChart3, ShoppingCart } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

function isActive(path: string): boolean {
  return route.path === path
}
</script>

<template>
  <aside class="flex h-screen w-64 flex-col border-r border-border bg-card">
    <div class="flex h-16 items-center border-b border-border px-6">
      <BarChart3 class="h-6 w-6 text-primary" />
      <span class="ml-2 text-lg font-bold text-foreground">Retail Dashboard</span>
    </div>
    
    <nav class="flex-1 space-y-1 p-4">
      <button
        class="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
        :class="isActive('/') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent hover:text-accent-foreground'"
        @click="router.push('/')"
      >
        <BarChart3 class="h-5 w-5" />
        <span class="ml-3">Dashboard</span>
      </button>
      
      <button
        class="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
        :class="isActive('/sales') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent hover:text-accent-foreground'"
        @click="router.push('/sales')"
      >
        <ShoppingCart class="h-5 w-5" />
        <span class="ml-3">Sales Explorer</span>
      </button>
    </nav>
  </aside>
</template>
