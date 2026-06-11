<script setup lang="ts">
import { onMounted } from 'vue'
import { Badge } from '@/components/ui/badge'
import { useHealth } from '@/composables/useHealth'

const { execute, data, loading, error } = useHealth()

onMounted(() => {
  execute()
})
</script>

<template>
  <Badge :variant="data?.status === 'ok' ? 'default' : 'destructive'">
    <span
      class="mr-1.5 h-2 w-2 rounded-full"
      :class="data?.status === 'ok' ? 'bg-green-500' : 'bg-red-500'"
    />
    {{ loading ? 'Checking...' : data?.status === 'ok' ? 'Healthy' : 'Error' }}
  </Badge>
</template>