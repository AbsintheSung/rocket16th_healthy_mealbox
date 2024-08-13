import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MemberAuthPage from '@/views/MemberAuthPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/member',
      name: 'MemberAuth',
      component: MemberAuthPage,
      children: [
          {
              path: '',
              name: 'MemberAuth-login',
              redirect: { name: 'Login' }
          },
          {
              path: 'login',
              name: 'Login',
              component: ()=>import('@/components/member-auth-page/LoginForm.vue'),
              props: true
          },
          {
              path: 'register',
              name: 'Register',
              component: ()=>import('@/components/member-auth-page/RegisterForm.vue'),
              props: true
          }
      ]
  },
  ]
})

export default router
