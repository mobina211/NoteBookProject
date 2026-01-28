import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: JSON.parse(localStorage.getItem('notes')) || []
  }),

  getters: {
    search: (state) => (q) =>
      state.notes.filter(n =>
        (n.title + n.content)
          .toLowerCase()
          .includes(q.toLowerCase())
      )
  },

  actions: {
    save() {
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },

    add(note) {
      this.notes.push({
        ...note,
        createdAt: new Date().toLocaleString(),
        updatedAt: null
      })
      this.save()
    },

    update(note) {
      const i = this.notes.findIndex(n => n.id === note.id)

      if (i !== -1) {
        this.notes[i] = {
          ...this.notes[i],
          title: note.title,
          content: note.content,
          updatedAt: new Date().toLocaleString()
        }
        this.save()
      }
    },

    remove(id) {
      this.notes = this.notes.filter(n => n.id !== id)
      this.save()
    }
  }
})
