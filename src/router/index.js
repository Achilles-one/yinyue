import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import listView from '../views/listView.vue'
import Search from '../views/Search.vue'
import Login from '../views/Login.vue'
import My from '../views/My.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/listview',
    name: 'listView',
    component: listView
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/my',
    name: 'My',
    component: My,
    beforeEnter: (to, from, next) => {
      console.log(store.state.user);
      if(store.state.user.isLogin) {
        next()
      }else {
        next("/login")
      }
    }
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
