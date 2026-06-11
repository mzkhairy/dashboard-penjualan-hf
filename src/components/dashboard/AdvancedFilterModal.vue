<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Filter } from 'lucide-vue-next'
import { useMetadata } from '@/composables/useMetadata'

const emit = defineEmits<{
  (e: 'update:filters', payload: Record<string, any>): void
}>()

const open = ref(false)
const search = ref('')
const category = ref<string | null>(null)
const gender = ref<string | null>(null)
const ageMin = ref('')
const ageMax = ref('')
const quantityMin = ref('')
const quantityMax = ref('')
const priceMin = ref('')
const priceMax = ref('')
const dateFrom = ref('')
const dateTo = ref('')

const { data: metadata, loading: metadataLoading, execute: fetchMetadata } = useMetadata()

fetchMetadata()

const emitFilters = () => {
  const filters: Record<string, any> = {}
  if (search.value.trim()) filters.search = search.value.trim()
  if (category.value && category.value !== 'all') filters.category = category.value
  if (gender.value && gender.value !== 'all') filters.gender = gender.value
  if (ageMin.value !== '') filters.ageMin = Number(ageMin.value)
  if (ageMax.value !== '') filters.ageMax = Number(ageMax.value)
  if (quantityMin.value !== '') filters.quantityMin = Number(quantityMin.value)
  if (quantityMax.value !== '') filters.quantityMax = Number(quantityMax.value)
  if (priceMin.value !== '') filters.priceMin = Number(priceMin.value)
  if (priceMax.value !== '') filters.priceMax = Number(priceMax.value)
  if (dateFrom.value) filters.dateFrom = dateFrom.value
  if (dateTo.value) filters.dateTo = dateTo.value
  emit('update:filters', filters)
}

const applyFilters = () => {
  emitFilters()
  open.value = false
}

const resetFilters = () => {
  search.value = ''
  category.value = null
  gender.value = null
  ageMin.value = ''
  ageMax.value = ''
  quantityMin.value = ''
  quantityMax.value = ''
  priceMin.value = ''
  priceMax.value = ''
  dateFrom.value = ''
  dateTo.value = ''
  emitFilters()
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline">
        <Filter class="mr-2 h-4 w-4" />
        Filters
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-lg" modal="false">
      <DialogHeader>
        <DialogTitle>Advanced Filters</DialogTitle>
        <DialogDescription>Refine your sales data with specific criteria.</DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-2">
        <div class="grid gap-2">
          <label class="text-sm font-medium">Search</label>
          <Input v-model="search" placeholder="Search product, transaction..." />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <label class="text-sm font-medium">Category</label>
            <Select v-model="category">
              <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem v-for="cat in metadata?.availableCategories" :key="cat" :value="cat">{{ cat }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="grid gap-2">
            <label class="text-sm font-medium">Gender</label>
            <Select v-model="gender">
              <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem v-for="g in metadata?.availableGenders" :key="g" :value="g">{{ g }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <label class="text-sm font-medium">Age Min</label>
            <Input v-model="ageMin" type="number" :placeholder="metadata?.ageRange.min.toString()" />
          </div>
          <div class="grid gap-2">
            <label class="text-sm font-medium">Age Max</label>
            <Input v-model="ageMax" type="number" :placeholder="metadata?.ageRange.max.toString()" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <label class="text-sm font-medium">Quantity Min</label>
            <Input v-model="quantityMin" type="number" :placeholder="metadata?.quantityRange.min.toString()" />
          </div>
          <div class="grid gap-2">
            <label class="text-sm font-medium">Quantity Max</label>
            <Input v-model="quantityMax" type="number" :placeholder="metadata?.quantityRange.max.toString()" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <label class="text-sm font-medium">Price Per Unit Min</label>
            <Input v-model="priceMin" type="number" :placeholder="metadata?.pricePerUnitRange.min.toString()" />
          </div>
          <div class="grid gap-2">
            <label class="text-sm font-medium">Price Per Unit Max</label>
            <Input v-model="priceMax" type="number" :placeholder="metadata?.pricePerUnitRange.max.toString()" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <label class="text-sm font-medium">Date From</label>
            <Input v-model="dateFrom" type="date" />
          </div>
          <div class="grid gap-2">
            <label class="text-sm font-medium">Date To</label>
            <Input v-model="dateTo" type="date" />
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" @click="resetFilters">Reset</Button>
        <Button @click="applyFilters">Apply Filters</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>