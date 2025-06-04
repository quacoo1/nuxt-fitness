<script setup lang="ts">
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Pie } from 'vue-chartjs'

import type { GraphData } from '~/types/graph.types'

const graphStore = useGraphStore()

ChartJS.register(ArcElement, Tooltip, Legend)

const chartData: Ref<GraphData> = ref({ labels: [], datasets: [] })

const chartOptions = {
  responsive: true,
}

onMounted(async () => {
  const res = await graphStore.getGraphPie()

  if (res?.labels && res?.datasets) {
    chartData.value = {
      labels: res.labels,
      datasets: res.datasets,
    }
  }
})
</script>

<template>
  <UCard>
    <Pie
      v-if="chartData.labels && chartData.datasets"
      id="pie-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </UCard>
</template>
