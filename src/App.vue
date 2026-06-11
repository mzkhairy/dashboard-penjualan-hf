<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <div class="flex h-screen w-full bg-background">
    <AppSidebar />
    <div class="flex flex-1 flex-col overflow-y-auto">
      <AppHeader />
      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
