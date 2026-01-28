import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import NotesView from '@/views/NotesView.vue'


const router = createRouter({
history: createWebHistory(),
routes: [
{ path: '/', component: AuthView },
{ path: '/notes', component: NotesView }
]
})


export default router
