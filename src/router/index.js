import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import NotesView from '@/views/NotesView.vue'
import PerformanceReport from '@/views/PerformanceReport.vue'


const router = createRouter({
history: createWebHistory(),
routes: [
{ path: '/', component: AuthView },
{ path: '/notes', component: NotesView },
{
  path: '/performance-report',
  name: 'PerformanceReport',
  component: PerformanceReport
}

]
})


export default router
