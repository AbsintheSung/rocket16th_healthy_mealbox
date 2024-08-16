import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SigninPage from '@/views/SigninPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import PlanSelectionPage from '@/views/PlanSelectionPage.vue'
import NutritionistPlanPage from '@/views/NutritionistPlanPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/signin',
      name: 'Signin',
      component: SigninPage
    },
    {
      path:'/register',
      name: 'Register',
      component: RegisterPage
    },
    {
      path:'/plan-selection',
      name: 'PlanSelection',
      component: PlanSelectionPage
    },    
    {
      path:'/nutritionist-plan',
      name: 'NutritionistPlan',
      component: NutritionistPlanPage
    },

    //配置404 ( 此配置在最下面，之後新增的路由請新增在此路由設定上面 )
    {
      //因為此頁面不太容易進入，除非使用者輸入網址錯誤，所以採用懶加載
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('@/views/NotFoundPage.vue')
    }
  ]
})

export default router
