<template>
  <div class="h-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
)

const props = defineProps({
  labels: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'تعداد یادداشت‌ها',
      data: props.data,

      // Gradient bars
      backgroundColor: (ctx) => {
        const chart = ctx.chart
        const { ctx: canvasCtx } = chart
        const gradient = canvasCtx.createLinearGradient(0, 0, 0, 350)
        gradient.addColorStop(0, '#818cf8') // indigo-400
        gradient.addColorStop(1, '#312e81') // indigo-900
        return gradient
      },

      // Style
      borderRadius: 12,
      borderSkipped: false,

      //  Hover effect
      hoverBackgroundColor: '#6366f1'
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  // Animation
  animation: {
    duration: 1200,
    easing: 'easeOutQuart'
  },

  plugins: {
    legend: {
      display: false
    },

    //  Numbers on bars
    datalabels: {
      color: '#1e1b4b',
      anchor: 'end',
      align: 'top',
      font: {
        weight: 'bold',
        size: 12
      },
      formatter: (value) => value
    },

    // Tooltip styling
    tooltip: {
      backgroundColor: '#312e81',
      titleColor: '#fff',
      bodyColor: '#fff',
      padding: 10,
      cornerRadius: 8
    }
  },

  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: '#3730a3'
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: '#e0e7ff'
      },
      ticks: {
        precision: 0,
        color: '#3730a3'
      }
    }
  }
}
</script>

<style scoped></style>

