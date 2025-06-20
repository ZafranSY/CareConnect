import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/HomePage.vue"
import Dashboard from "../views/DashboardPage.vue"
import Articles from "../views/ArticlesPage.vue"
import Feedback from "../views/FeedbackPage.vue"
// import Login from "../views/Login.vue"
// import Register from "../views/Register.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    // meta: { requiresAuth: true },
  },
  {
    path: "/articles",
    name: "Articles",
    component: Articles,
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: Feedback,
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: Login,
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   component: Register,
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const isAuthenticated = localStorage.getItem("token")

  if (requiresAuth && !isAuthenticated) {
    next("/login")
  } else {
    next()
  }
})

export default router
