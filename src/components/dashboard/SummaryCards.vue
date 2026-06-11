<script setup lang="ts">
import { computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { SummaryResponse } from '@/types/api'

defineProps<{
  data?: SummaryResponse | null
  loading: boolean
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <template v-if="loading">
      <Card v-for="i in 4" :key="'sk-' + i">
        <CardHeader class="pb-2">
          <Skeleton class="h-4 w-28" />
        </CardHeader>
        <CardContent>
          <Skeleton class="h-8 w-32" />
        </CardContent>
      </Card>
    </template>
    <template v-else-if="data">
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm text-muted-foreground">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-foreground">${{ data.totalRevenue.toLocaleString() }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm text-muted-foreground">Total Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-foreground">{{ data.totalTransactions.toLocaleString() }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm text-muted-foreground">Average Order Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-foreground">${{ data.averageOrderValue.toLocaleString() }}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="pb-2">
          <CardTitle class="text-sm text-muted-foreground">Total Items Sold</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-foreground">{{ data.totalItemsSold.toLocaleString() }}</div>
        </CardContent>
      </Card>
    </template>
  </div>
</template>
