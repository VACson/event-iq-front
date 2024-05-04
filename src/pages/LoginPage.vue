<template>
  <IonPage>
    <IonContent class="ion-padding">
      <IonButton
        routerLink="/"
        routerDirection="back"
        class="return-back"
      >
        <IonIcon :icon="returnUpBack" />
      </IonButton>

      <BasePageTitle class="label">{{ $t("auth.login_title") }}</BasePageTitle>

      <BaseForm>
        <BaseInput
          type="email"
          v-model="form.email"
          placeholder="Email"
        />
        <BaseInput
          type="password"
          v-model="form.password"
          placeholder="Password"
        />

        <BaseButton
          className="dark"
          :loading="isFetching"
          @click="onSubmit"
        >
          {{ $t("auth.login") }}
        </BaseButton>
      </BaseForm>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { returnUpBack } from "ionicons/icons"
import { inject, reactive, ref } from "vue"
import { IonPage, IonContent, IonIcon, IonButton, useIonRouter } from "@ionic/vue"
import * as authApi from "../api/auth"
import { saveUserToStorage } from "../utils/auth"
import { useRouter } from "vue-router"
import { BaseInput, BaseButton, BaseForm, BasePageTitle } from "../components/Base/"

const setUser = inject<Function>("setUser")

const router = useIonRouter()
const vueRouter = useRouter()

const isFetching = ref(false)

const form = reactive({
  email: "",
  password: ""
})

const onSubmit = async () => {
  try {
    isFetching.value = true

    const { data } = await authApi.login(form)
    if (!setUser) return

    saveUserToStorage(data)
    setUser(data)
    router.push({ name: "Discover" })
    vueRouter.go(0)
  } catch {
  } finally {
    isFetching.value = false
  }
}
</script>

<style scoped>
.label {
  font-size: 36px;
  font-weight: 500;

  display: flex;
  flex-flow: row wrap;
  gap: 16px;

  margin-top: 60px;
}

.return-back {
  cursor: pointer;
  --background: transparent;
  --background-hover: transparent;
  --background-activated: transparent;
  --background-focused: transparent;
  --box-shadow: none;
  color: var(--ion-color-dark);
}
</style>
