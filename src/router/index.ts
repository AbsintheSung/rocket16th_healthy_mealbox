import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SigninPage from '@/views/SigninPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import PlanSelectionPage from '@/views/PlanSelectionPage.vue'
import NutritionistPlanPage from '@/views/NutritionistPlanPage.vue'
import MealboxlistPage from '@/views/MealboxlistPage.vue'
import MemberPage from '@/views/MemberPage.vue'
import CheckoutPage from '@/views/CheckoutPage.vue'
import Customized from '@/views/CustomizedMealPage.vue'
import EditCustomMealPage from '@/views/EditCustomMealPage.vue'
import CustomSinglePage from '@/views/CustomSinglePage.vue'
import FqaPage from '@/views/FqaPage.vue'
import HowToUsePage from '@/views/HowToUsePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/signin',
      name: 'Signin',
      component: SigninPage
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage
    },
    {
      path: '/plan-selection',
      name: 'PlanSelection',
      component: PlanSelectionPage
    },
    {
      path: '/nutritionist-plan',
      name: 'NutritionistPlan',
      component: NutritionistPlanPage
    },
    {
      path: '/nutritionist-plan/:id',
      name: 'NutritionistPlanDetail',
      component: () => import('@/views/NutritionistPlanDetailPage.vue')
    },
    {
      path: '/mealboxlist',
      name: 'Mealboxlist',
      component: MealboxlistPage,
      children: [
        {
          //沒有配置  /mealboxlist 下 的 RouterView預設頁面，當進入/mealboxlist後，重新導向到 /mealboxlist/mealgeneral
          path: '',
          name: 'MealboxlistIndex',
          redirect: { name: 'MealGeneral' }
        },
        {
          path: 'mealgeneral',
          name: 'MealGeneral',
          component: () => import('@/views/mealbox-list-page/MealGeneralPage.vue')
        },
        {
          path: 'mealcustomized',
          name: 'MealCustomized',
          component: () => import('@/views/mealbox-list-page/MealCustomizedPage.vue')
        }
      ]
    },
    {
      path: '/singlemeal/:id',
      name: 'SingleMeal',
      component: () => import('@/views/SingleMealPage.vue')
    },
    {
      path: '/member',
      name: 'Member',
      component: MemberPage,
      children: [
        {
          path: '',
          name: 'EditMember',
          component: () => import('@/views/member-page/EditMemberPage.vue')
        },
        {
          path: 'orderhistory',
          name: 'OrderHistory',
          component: () => import('@/views/member-page/OrderHistoryPage.vue')
        },
        {
          path: 'custommeal',
          name: 'CustomMeal',
          component: () => import('@/views/member-page/CustomMealPage.vue')
        }
      ]
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: CheckoutPage,
      children: [
        {
          // 沒有配置 /checkout 下的 RouterView 預設頁面，當進入 /checkout 後，重新導向到 /checkout/order-confirmation
          path: '',
          name: 'CheckoutIndex',
          redirect: { name: 'OrderConfirmation' }
        },
        {
          path: 'order-confirmation',
          name: 'OrderConfirmation',
          component: () => import('@/views/checkout-page/OrderConfirmationPage.vue')
        },
        {
          path: 'shipping-payment',
          name: 'ShippingPayment',
          component: () => import('@/views/checkout-page/ShippingPaymentPage.vue')
        },
        {
          path: 'order-information',
          name: 'OrderInformation',
          component: () => import('@/views/checkout-page/OrderInformationPage.vue')
        },
        {
          path: 'order-complete',
          name: 'OrderComplete',
          component: () => import('@/views/checkout-page/OrderCompletePage.vue')
        },
        {
          path: 'linepay-redirect',
          name: 'LinePayRedirect',
          component: () => import('@/views/LinepayRedirect.vue')
        },
      ]
    },
    {
      path: '/customized',
      name: 'Customized',
      component: Customized
    },
    {
      path: '/editcustommeal/:id',
      name: 'EditCustomMeal',
      component: EditCustomMealPage
    },
    {
      path: '/customsingle/:id',
      name: 'CustomSingle',
      component: CustomSinglePage
    },
    {
      path: '/fqa',
      name: 'fqa',
      component: FqaPage
    },
    {
      path: '/how-to-use',
      name: 'HowToUse',
      component: HowToUsePage
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
