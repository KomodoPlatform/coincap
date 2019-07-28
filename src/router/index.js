import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const AssetChain = () => import('@/views/AssetChain')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: DefaultContainer,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/chains',
      name: 'Chain',
      component: DefaultContainer,
      children: [
        {
          path: '/chains/:chain',
          name: 'AssetChain',
          component: AssetChain
        }
      ]
    }
  ]
})
