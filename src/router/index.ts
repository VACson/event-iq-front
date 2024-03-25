import { createRouter, createWebHistory } from "@ionic/vue-router"
import { RouteRecordRaw } from "vue-router"
import MainView from "../views/MainView.vue"
import WelcomeView from "../views/WelcomeView.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/discover"
  },
  {
    path: "/welcome",
    component: WelcomeView,
    children: [
      {
        path: "",
        name: "Welcome",
        component: () => import("../pages/StartPage.vue")
      },
      {
        path: "login",
        name: "Login",
        component: () => import("../pages/LoginPage.vue")
      },
      {
        path: "register",
        name: "Register",
        component: () => import("../pages/RegisterPage.vue")
      }
    ]
  },
  {
    path: "/",
    component: MainView,
    children: [
      {
        path: "discover",
        name: "Discover",
        component: () => import("../pages/Discover.vue")
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("../pages/Profile.vue")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory("/"),
  routes
})

export default router
