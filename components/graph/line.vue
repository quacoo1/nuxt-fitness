<script setup lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'vue-chartjs'

import type { GraphData } from '~/types/graph.types'

const graphStore = useGraphStore()

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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
    <Line
      v-if="chartData && chartData.datasets"
      id="line-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </UCard>
</template>
