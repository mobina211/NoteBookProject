<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-10">
    <div class="max-w-5xl mx-auto px-4">
      <h1 class="text-3xl font-extrabold text-center mb-8 text-indigo-700">
        📒 یادداشت‌های من
      </h1>

      <!-- Add Note -->
      <div class="bg-white rounded-2xl shadow p-4 mb-6">
        <input
          v-model="title"
          placeholder="عنوان یادداشت"
          class="input mb-2"
        />
        <textarea
          v-model="content"
          placeholder="متن یادداشت"
          class="input h-24"
        />
        <button
          @click="add"
          class="mt-3 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          ➕ افزودن یادداشت
        </button>
      </div>

      <!-- Search -->
      <input
        v-model="q"
        placeholder="🔍 جستجو..."
        class="input mb-6"
      />

      <!-- Notes -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NoteCard
          v-for="n in filtered"
          :key="n.id"
          :note="n"
        />
      </div>
    </div>

    <!-- دکمه شناور گزارش آماری -->
<router-link
  to="/performance-report"
  class="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition"
  title="گزارش عملکرد"
>
  📊 گزارش عملکرد
</router-link>


  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useNotesStore } from '@/store/notes'
import NoteCard from '@/components/NoteCard.vue'

const store = useNotesStore()

const title = ref('')
const content = ref('')
const q = ref('')

const add = () => {
  if (!title.value || !content.value) return

  store.add({
    id: Date.now(),
    title: title.value,
    content: content.value
  })

  title.value = ''
  content.value = ''
}

const filtered = computed(() => store.search(q.value))
</script>

<style scoped>
.input {
  @apply w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400;
}
</style>
