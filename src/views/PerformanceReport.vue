<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-center text-indigo-700">
      گزارش عملکرد کاربران
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6 text-center">
        <p class="text-gray-500 mb-2">کل کاربران</p>
        <p class="text-4xl font-extrabold">{{ report.totalUsers }}</p>
      </div>

      <div class="bg-white rounded-lg shadow p-6 text-center">
        <p class="text-gray-500 mb-2">کل یادداشت‌ها</p>
        <p class="text-4xl font-extrabold">{{ report.totalNotes }}</p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-4 h-96">
      <NotesChart
        :labels="report.labels"
        :data="report.notesPerUser"
      />
    </div>

    <div v-if="loading" class="text-center mt-4 text-indigo-600">
      در حال بارگذاری گزارش...
    </div>

    <div v-if="error" class="text-center mt-4 text-red-600">
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

<style scoped></style>
