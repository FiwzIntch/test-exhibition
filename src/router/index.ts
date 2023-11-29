import { createRouter, createWebHistory } from 'vue-router'
import ExhibitionList from '@/pages/exhibitionList.vue'
import ExhibitionDetail from '@/pages/exhibitionDetail.vue'
import ExhibitionEdit from '@/pages/exhibitionEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: ExhibitionList
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: ExhibitionDetail
    },
    {
      path: '/:id',
      name: 'edit',
      component: ExhibitionEdit
    }
  ]
})

export default router
