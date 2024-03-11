<template>
  <IonApp color="light">
    <IonRouterOutlet />
  </IonApp>
</template>

<script setup lang="ts">
import { IonApp } from "@ionic/vue"
import { IonRouterOutlet } from "@ionic/vue"
import { computed, provide, ref } from "vue"

type User = { id?: number; name?: string; token?: string }

const user = ref<User>({ id: undefined, name: undefined, token: undefined })
const isAuthenticated = computed(() => Boolean(user.value.token))

const setUser = (payload: User) => {
  user.value = { ...user.value, ...payload }
}

provide("isAuthenticated", isAuthenticated)
provide("setUser", setUser)
</script>
