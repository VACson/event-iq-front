import { createRouter, createMemoryHistory } from "@ionic/vue-router"
import { NavigationGuardNext, RouteRecordRaw } from "vue-router"
import MainView from "../views/MainView.vue"
import WelcomeView from "../views/WelcomeView.vue"
import { getUserFromStorage } from "@/utils/auth"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: WelcomeView,
    children: [
      {
        path: "",
        name: "Welcome",
        meta: { notRequireAuth: true },
        component: () => import("../pages/StartPage.vue")
      },
      {
        path: "login",
        name: "Login",
        meta: { notRequireAuth: true },
        component: () => import("../pages/LoginPage.vue")
      },
      {
        path: "register",
        name: "Register",
        meta: { notRequireAuth: true },
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
        path: "create",
        name: "Create",
        component: () => import("../pages/CreateActivity.vue")
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
  history: createMemoryHistory(),
  routes
})

const authGuard = async (to: any, from: any, next: NavigationGuardNext) => {
  const userData = await getUserFromStorage()
  const isAuthenticated = Boolean(userData?.token)

  if (to.meta.notRequireAuth && isAuthenticated) {
    return next({ name: "Discover" })
  }
  if (to.meta.notRequireAuth || isAuthenticated) {
    return next()
  } else {
    return next({ name: "Welcome" })
  }
}

router.beforeEach(authGuard)

export default router
