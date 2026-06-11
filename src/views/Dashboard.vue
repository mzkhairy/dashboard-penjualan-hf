<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import SummaryCards from '@/components/dashboard/SummaryCards.vue'
import BasicFilter from '@/components/dashboard/BasicFilter.vue'
import { useFetch } from '@/composables/useFetch'
import type { SummaryResponse } from '@/types/api'

const filters = ref<{ search?: string | null; category?: string | null; gender?: string | null }>({})

function buildSummaryUrl(f: typeof filters.value): string {
  const params = new URLSearchParams()
  if (f.search) params.set('search', f.search)
  if (f.category) params.set('category', f.category)
  if (f.gender) params.set('gender', f.gender)
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

const { data, loading, error, execute } = useFetch<SummaryResponse>(() => {
  const qs = buildSummaryUrl(filters.value)
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/summary${qs}`, {
    headers: { 'x-api-key': import.meta.env.VITE_API_KEY, 'Content-Type': 'application/json' },
  }).then(res => { if (!res.ok) throw new Error('Failed to fetch summary'); return res.json() })
})

onMounted(() => execute())
watch(filters, () => execute())
</script>

<template>
  <div class="space-y-6">
    <BasicFilter @update:filters="(payload) => (filters = payload)" />
    <div v-if="error" class="rounded-md border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
      {{ error }}
    </div>
    <SummaryCards :data="data" :loading="loading" />
  </div>
</template>
