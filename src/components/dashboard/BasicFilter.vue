<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter } from 'lucide-vue-next'

const emit = defineEmits<{
  (e: 'update:filters', payload: { search?: string | null; category?: string | null; gender?: string | null }): void
}>()

const search = ref<string | null>(null)
const category = ref<string | null>(null)
const gender = ref<string | null>(null)
const categories = ref<string[]>([])
const categoriesLoading = ref(false)

onMounted(async () => {
  categoriesLoading.value = true
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    const apiKey = import.meta.env.VITE_API_KEY
    const res = await fetch(`${baseUrl}/categories`, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    })
    if (res.ok) {
      const json = await res.json()
      categories.value = json.data
    }
  } catch {
    console.error('Failed to fetch categories')
  } finally {
    categoriesLoading.value = false
  }
})

const emitFilters = () => {
  emit('update:filters', {
    search: search.value,
    category: category.value,
    gender: gender.value,
  })
}

function onCategoryChange(val: string | undefined) {
  category.value = val === 'all' ? null : val || null
  emitFilters()
}

function onGenderChange(val: string | undefined) {
  gender.value = val === 'all' ? null : val || null
  emitFilters()
}

watch(search, () => {
  useDebounceFn(emitFilters, 400)()
})
</script>

<template>
  <Card class="mb-6">
    <CardHeader>
      <CardTitle class="flex items-center gap-2 text-lg">
        <Filter class="h-4 w-4" />
        Filters
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="flex flex-wrap items-end gap-4">
        <div class="relative min-w-[200px] flex-1">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input v-model="search" placeholder="Search product, transaction..." class="pl-8" />
        </div>

        <Select @update:model-value="onCategoryChange">
          <SelectTrigger class="min-w-[160px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select @update:model-value="onGenderChange">
          <SelectTrigger class="min-w-[140px]">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
</template>
