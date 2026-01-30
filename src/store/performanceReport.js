import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePerformanceReportStore = defineStore('performanceReport', () => {
  const report = ref({
    totalUsers: 5,
    totalNotes: 48,
    labels: ['User1', 'User2', 'User3', 'User4', 'User5'],
    notesPerUser: [5, 12, 8, 20, 3]
  })

  const loading = ref(false)
  const error = ref(null)

  async function fetchReport() {
    loading.value = true
    error.value = null
    try {
      // فقط شبیه‌سازی تاخیر
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (e) {
      error.value = 'خطا در دریافت گزارش'
    } finally {
      loading.value = false
    }
  }

  return {
    report,
    loading,
    error,
    fetchReport
  }
})

