<template>
  <div
    class="  relative
  bg-gradient-to-br from-white/80 to-purple-50
  backdrop-blur-xl
  rounded-3xl
  p-6
  transition-all duration-300 ease-out
  hover:-translate-y-2
  hover:shadow-[0_25px_50px_rgba(124,58,237,0.25)]
"
  >
    <!-- Edited Badge -->
    <span
      v-if="note.updatedAt"
      class="absolute top-3 right-3 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full"
    >
      ✏️ ویرایش شده
    </span>

    <!-- Title -->
    <input
      v-if="editing"
      v-model="title"
      class="w-full text-lg font-bold border-b focus:outline-none"
    />
    <h3 v-else class="text-lg font-bold">
      {{ note.title }}
    </h3>

    <!-- Content -->
    <textarea
      v-if="editing"
      v-model="content"
      class="w-full mt-2 border rounded p-2 focus:outline-none"
    />
    <p v-else class="mt-2 text-gray-600 whitespace-pre-line">
      {{ note.content }}
    </p>

    <!-- Date -->
    <p class="text-xs text-gray-400 mt-2">
      🕒
      <span v-if="note.updatedAt">
        ویرایش: {{ note.updatedAt }}
      </span>
      <span v-else>
        ایجاد: {{ note.createdAt }}
      </span>
    </p>

    <!-- Actions -->
    <div class="flex justify-end gap-2 mt-3">
      <button
        v-if="!editing"
        @click="startEdit"
        class="text-indigo-600 hover:underline"
      >
        ویرایش
      </button>

      <button
        v-if="editing"
        @click="save"
        class="text-green-600 hover:underline"
      >
        ذخیره
      </button>

      <button
        @click="remove"
        class="text-red-600 hover:underline"
      >
        حذف
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNotesStore } from '@/store/notes'

const props = defineProps({
  note: Object
})

const store = useNotesStore()

const editing = ref(false)
const title = ref(props.note.title)
const content = ref(props.note.content)

const startEdit = () => {
  editing.value = true
}

const save = () => {
  store.update({
    id: props.note.id,
    title: title.value,
    content: content.value
  })
  editing.value = false
}

const remove = () => {
  store.remove(props.note.id)
}
</script>
