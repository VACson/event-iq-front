<template>
  <IonApp
    color="light"
    class="ion-padding"
  >
    <IonRouterOutlet />
  </IonApp>
</template>

<script setup lang="ts">
import { IonApp, useIonRouter } from "@ionic/vue"
import { IonRouterOutlet } from "@ionic/vue"
import { computed, onBeforeMount, provide, ref } from "vue"
import { User, getUserFromStorage } from "./utils/auth"
import { API } from "./utils/http"
import { useRouter } from "vue-router"
import { StatusBar } from "@capacitor/status-bar"
import { Capacitor } from "@capacitor/core"

// iOS only
window.addEventListener("statusTap", function () {
  // console.log("statusbar tapped")
})

const setStatusBarStyleDark = async () => {
  if (!Capacitor.isNativePlatform()) return
  await StatusBar.hide()
}

const router = useIonRouter()
const vueRouter = useRouter()

const user = ref<User>({ email: undefined, username: undefined, token: undefined })
const userInfo = computed(() => user.value)

const setUser = (payload: User) => {
  user.value = { ...user.value, ...payload }
  onAuthSuccess(payload)
}

const onAuthSuccess = (payload: User) => {
  API.defaults.headers.common["Authorization"] = "Bearer " + payload.token

  if (
    vueRouter?.currentRoute?.value?.path &&
    vueRouter.currentRoute.value.path.startsWith("/login")
  ) {
    router.navigate({ name: "Discover" })
  }
}

onBeforeMount(async () => {
  setStatusBarStyleDark()
  if (user.value.token) {
    onAuthSuccess(user.value)
    return
  }

  const userInfo = await getUserFromStorage()

  if (userInfo) {
    setUser(userInfo)
    return
  }

  router.push({ name: "Welcome" })
})

provide("userInfo", userInfo)
provide("setUser", setUser)
</script>
