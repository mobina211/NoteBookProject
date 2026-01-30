<template>
  <div class="p-6 max-w-6xl mx-auto">
    <!-- Title -->
    <h1
      class="text-3xl font-extrabold mb-10 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
    >
      گزارش عملکرد کاربران
    </h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      <!-- Total Users -->
      <div
        class="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-[1.02] transition"
      >
        <div class="absolute top-0 right-0 opacity-20 text-8xl">👤</div>
        <p class="text-sm opacity-80 mb-2">کل کاربران</p>
        <p class="text-4xl font-extrabold tracking-tight">
          {{ report.totalUsers }}
        </p>
      </div>

      <!-- Total Notes -->
      <div
        class="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-cyan-500 to-indigo-600 text-white shadow-lg hover:scale-[1.02] transition"
      >
        <div class="absolute top-0 right-0 opacity-20 text-8xl">📝</div>
        <p class="text-sm opacity-80 mb-2">کل یادداشت‌ها</p>
        <p class="text-4xl font-extrabold tracking-tight">
          {{ report.totalNotes }}
        </p>
      </div>
    </div>

    <!-- Chart -->
    <div
      class="bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-lg p-6 h-[420px]"
    >
      <NotesChart
        :labels="report.labels"
        :data="report.notesPerUser"
      />
    </div>

    <!-- States -->
    <div v-if="loading" class="text-center mt-6 text-indigo-600 font-medium">
      در حال بارگذاری گزارش...
    </div>

    <div v-if="error" class="text-center mt-6 text-red-600 font-medium">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePerformanceReportStore } from '@/store/performanceReport'
import NotesChart from '@/components/charts/NotesChart.vue'

const reportStore = usePerformanceReportStore()
const { report, loading, error, fetchReport } = reportStore

onMounted(() => {
  fetchReport()
})
</script>

