import { createRouter, createWebHistory, type RouteMeta } from 'vue-router'
import Wrapper from '@/components/layouts/wrapper.vue'
import { useAppStore } from '@/stores/app'
import Cookies from 'js-cookie'

interface IRouteMeta {
  title: string
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/auth.vue'),
      meta: {
        title: 'Login'
      } as RouteMeta & IRouteMeta
    },
    {
      path: '/',
      component: Wrapper,
      redirect: '/dashboard',
      meta: {
        title: 'Ínicio',
        requiresAuth: true
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/dashboard/dashboard.vue'),
          meta: {
            title: 'Dashboard'
          } as RouteMeta & IRouteMeta
        },
        {
          path: '/prestadores_servicos',
          name: 'prestadores_index',
          component: () => import('@/views/providers/providers.vue'),
          meta: {
            title: 'Prestadores de Serviços'
          } as RouteMeta & IRouteMeta
        },
        {
          path: '/prestadores_servicos/incluir',
          name: 'prestadores_include',
          component: () => import('@/views/providers/provider-details.vue'),
          meta: {
            title: 'Incluir Prestador de Serviço'
          } as RouteMeta & IRouteMeta
        },
        {
          path: '/prestadores_servicos/:id',
          name: 'prestadores_change',
          component: () => import('@/views/providers/provider-details.vue'),
          meta: {
            title: 'Editar Prestador de Serviço'
          } as RouteMeta & IRouteMeta
        },
        {
          path: '/avaliacoes',
          name: 'ratings_index',
          component: () => import('@/views/ratings/ratings.vue'),
          meta: {
            title: 'Avaliações'
          } as RouteMeta & IRouteMeta
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: () => import('@/views/404.vue'),
      meta: {
        title: 'Page Not Found'
      } as RouteMeta & IRouteMeta
    }
  ]
})

router.beforeEach((to, from, next) => {
  const appStore = useAppStore()

  document.title = `CondoIndica | ${to.meta.title as string}`

  const authFromCookie = JSON.parse(Cookies.get('persist:condoindica') || '{}')

  if (authFromCookie?.userData) {
    appStore.setAuth(authFromCookie)
  }

  appStore.supportMode = !!Cookies.get('persist_main:condoindica')

  const isAuthenticated = !!appStore.auth?.userData?.authenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    appStore.logout()
    return next({ name: 'login' })
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    appStore.logout()
    return next({ name: 'login' })
  }

  return next()
})

export default router
