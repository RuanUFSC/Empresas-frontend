import Vue from 'vue'
import VueRouter from 'vue-router'
import Edit from '../views/Edit.vue'
import Register from '../views/Register.vue'
import Companies from '../views/Companies.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/edit',
    name: 'edit',
    component: Edit
  },
  {
    path: '/companies',
    name: 'companies',
    component: Companies
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
