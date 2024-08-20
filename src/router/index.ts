import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SigninPage from '@/views/SigninPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import PlanSelectionPage from '@/views/PlanSelectionPage.vue'
import NutritionistPlanPage from '@/views/NutritionistPlanPage.vue'
import NutritionistPlanDetailPage from '@/views/NutritionistPlanDetailPage.vue'
import MealboxlistPage from '@/views/MealboxlistPage.vue'
import MemberPage from '@/views/MemberPage.vue'
import CheckoutPage from '@/views/checkout-page/CheckoutPage.vue'
import OrderConfirmationPage from '@/views/checkout-page/OrderConfirmationPage.vue'
import ShippingPaymentPage from '@/views/checkout-page/ShippingPaymentPage.vue'
import OrderInformationPage from '@/views/checkout-page/OrderInformationPage.vue'
import OrderCompletePage from '@/views/checkout-page/OrderCompletePage.vue'

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
    {
      //串API時改為動態路由
      path:'/nutritionist-plan-detail',
      name: 'NutritionistPlanDetail',
      component: NutritionistPlanDetailPage
    },
    {
      path:'/mealboxlist',
      name:'Mealboxlist',
      component: MealboxlistPage,
      children:[
        {
          //沒有配置  /mealboxlist 下 的 RouterView預設頁面，當進入/mealboxlist後，重新導向到 /mealboxlist/mealgeneral
          path: '',
          name: 'MealboxlistIndex',
          redirect: { name: 'MealGeneral' }
        },
        {
          path:'mealgeneral',
          name:'MealGeneral',
          component:()=>import("@/views/mealbox-list-page/MealGeneralPage.vue")
        },
        {
          path:'mealcustomized',
          name:'MealCustomized',
          component:()=>import("@/views/mealbox-list-page/MealCustomizedPage.vue")
        }
      ]
    },
    {
      path:'/singlemeal/:id',
      name: 'SingleMeal',
      component:()=>import("@/views/SingleMealPage.vue")
    },
    {
      path:'/member',
      name:'Member',
      component: MemberPage,
      children:[
        {
          path: '',
          name: 'MemberIndex',
          component:()=>import('@/views/member-page/IndexPage.vue')
        },
        {
          path: 'editmember',
          name: 'EditMember',
          component:()=>import('@/views/member-page/EditMemberPage.vue')
        },
        {
          path: 'orderhistory',
          name: 'OrderHistory',
          component:()=>import('@/views/member-page/OrderHistoryPage.vue')
        },
        {
          path: 'custommeal',
          name: 'CustomMeal',
          component:()=>import('@/views/member-page/CustomMealPage.vue')
        }
      ]
    },
    {
      path: '/checkout',
      name:'Checkout',
      component: CheckoutPage,
      children: [
        {
          path: '',
          name: 'OrderConfirmation',
          component: OrderConfirmationPage
        },
        {
          path: 'shipping-payment',
          name: 'ShippingPayment',
          component: ShippingPaymentPage
        },
        {
          path: 'order-information',
          name: 'OrderInformation',
          component: OrderInformationPage
        },
        {
          path: 'order-complete',
          name: 'OrderComplete',
          component: OrderCompletePage
        }
      ]
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
