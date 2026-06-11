<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useFetch } from '@/composables/useFetch'
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Filter, ChevronLeft, ChevronRight, Search } from 'lucide-vue-next'
import type { SalesListResponse, Sale } from '@/types/api'
import AdvancedFilterModal from '@/components/dashboard/AdvancedFilterModal.vue'

const page = ref(1)
const limit = ref(10)
const filters = ref<Record<string, any>>({})
const selectedTransaction = ref<Sale | null>(null)
const dialogOpen = ref(false)
const detailLoading = ref(false)
const detailData = ref<any>(null)

function buildUrl() {
  const params = new URLSearchParams()
  params.set('page', String(page.value))
  params.set('limit', String(limit.value))
  Object.entries(filters.value).forEach(([key, val]) => {
    if (val !== '' && val !== null && val !== undefined) {
      params.set(key, String(val))
    }
  })
  return `${import.meta.env.VITE_API_BASE_URL}/sales?${params.toString()}`
}

const { data, loading, error, execute: fetchSales } = useFetch<SalesListResponse>(() =>
  fetch(buildUrl(), {
    headers: {
      'x-api-key': import.meta.env.VITE_API_KEY,
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch sales')
    return res.json()
  })
)

function updateFilters(newFilters: Record<string, any>) {
  filters.value = newFilters
  page.value = 1
}

watch(filters, () => {
  fetchSales()
})

watch(page, () => {
  fetchSales()
})

onMounted(() => {
  fetchSales()
})

async function openDetail(sale: Sale) {
  selectedTransaction.value = sale
  dialogOpen.value = true
  detailLoading.value = true
  detailData.value = null
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/sales/${sale.transactionId}`,
      {
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    )
    if (res.ok) {
      detailData.value = await res.json()
    }
  } catch {
    console.error('Failed to fetch transaction detail')
  } finally {
    detailLoading.value = false
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value -= 1
  }
}

function nextPage() {
  const totalPages = data.value?.pagination.totalPages ?? 1
  if (page.value < totalPages) {
    page.value += 1
  }
}

const totalPages = computed(() => data.value?.pagination.totalPages ?? 1)
const totalItems = computed(() => data.value?.pagination.totalItems ?? 0)
const startItem = computed(() => (page.value - 1) * limit.value + 1)
const endItem = computed(() => Math.min(page.value * limit.value, totalItems.value))
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <h1 class="text-2xl font-bold text-primary">Transactions</h1>
      <AdvancedFilterModal @update:filters="updateFilters" />
    </div>

    <div v-if="error" class="rounded-md border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
      {{ error }}
    </div>

    <div class="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead>Category</TableHead>
            <TableHead class="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="loading">
            <TableRow v-for="i in limit" :key="'sk-' + i">
              <TableCell><Skeleton class="h-4 w-20" /></TableCell>
              <TableCell><Skeleton class="h-4 w-24" /></TableCell>
              <TableCell><Skeleton class="h-4 w-24" /></TableCell>
              <TableCell><Skeleton class="h-4 w-20" /></TableCell>
              <TableCell class="text-right"><Skeleton class="h-4 w-20 ml-auto" /></TableCell>
            </TableRow>
          </template>
          <template v-else-if="data && data.data.length > 0">
            <TableRow
              v-for="sale in data.data"
              :key="sale.transactionId"
              class="cursor-pointer"
              @click="openDetail(sale)"
            >
              <TableCell class="font-medium">{{ sale.transactionId }}</TableCell>
              <TableCell>{{ sale.date }}</TableCell>
              <TableCell>{{ sale.customerId }}</TableCell>
              <TableCell>{{ sale.productCategory }}</TableCell>
              <TableCell class="text-right">${{ sale.totalAmount.toLocaleString() }}</TableCell>
            </TableRow>
          </template>
          <TableEmpty v-else class="h-32">
            <p class="text-sm text-muted-foreground">No sales data found</p>
          </TableEmpty>
        </TableBody>
        <TableFooter v-if="!loading && data">
          <TableRow>
            <TableCell colspan="5" class="text-center text-sm text-muted-foreground">
              Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} results
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div v-if="!loading && totalPages > 1" class="flex items-center justify-between border-t px-4 py-3">
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          Page {{ page }} of {{ totalPages }}
        </div>
        <div class="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            :disabled="page <= 1"
            @click="prevPage"
          >
            <ChevronLeft class="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            :disabled="page >= totalPages"
            @click="nextPage"
          >
            Next
            <ChevronRight class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>

    <Dialog v-model:open="dialogOpen">
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Transaction Detail</DialogTitle>
        <DialogDescription>
          Transaction ID: {{ selectedTransaction?.transactionId }}
        </DialogDescription>
      </DialogHeader>

      <div v-if="detailLoading" class="space-y-4 py-4">
        <Skeleton class="h-4 w-full" v-for="i in 5" :key="i" />
      </div>

      <!-- Gunakan optional chaining (?.) untuk mencegah error saat data masih null/undefined -->
      <div v-else-if="detailData" class="grid gap-3 py-4 text-sm">
        <div class="flex justify-between">
          <span class="text-muted-foreground">Date</span>
          <span class="font-medium">{{ detailData?.date }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Category</span>
          <span class="font-medium">{{ detailData?.productCategory }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Total Amount</span>
          <span class="font-bold text-primary">${{ detailData?.totalAmount?.toLocaleString() }}</span>
        </div>
        <!-- Tambahkan field lainnya dengan pola detailData?.field -->
      </div>
      
      <div v-else class="py-4 text-center text-sm text-muted-foreground">
        Failed to load detail
      </div>
    </DialogContent>
  </Dialog>
  </div>
</template>
