import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          meta: {
            guest: true,
          },
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          name: 'register',
          meta: {
            guest: true,
          },
          component: () => import('../pages/register.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          meta: {
            guest: true,
          },
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from) => {
  const store = userStore()
  const { isAuthenticated } = storeToRefs(store)

  if (!isAuthenticated.value &&  !to.meta?.guest) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router
