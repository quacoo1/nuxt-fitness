<script setup lang="ts">
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

import type { GraphData } from '~/types/graph.types'

const graphStore = useGraphStore()

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
)
const chartData: Ref<GraphData> = ref({ labels: [], datasets: [] })

const chartOptions = {
  responsive: true,
}

onMounted(async () => {
  const res = await graphStore.getGraphMonthlyAverage()
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
    <Bar
      v-if="chartData && chartData.datasets"
      id="bar-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </UCard>
</template>
