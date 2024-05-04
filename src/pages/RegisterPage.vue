<template>
  <IonPage>
    <IonContent class="ion-padding">
      <IonButton
        class="return-back"
        routerLink="/"
        routerDirection="back"
      >
        <IonIcon :icon="returnUpBack" />
      </IonButton>

      <BasePageTitle class="label">{{ $t("auth.register_title") }}</BasePageTitle>

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
        <BaseInput
          v-model="form.username"
          placeholder="Username"
        />

        <BaseButton
          className="dark"
          @click="onSubmit"
        >
          <IonSpinner
            v-if="isFetching"
            style="height: 16px"
          />
          {{ $t("auth.signup") }}
        </BaseButton>
      </BaseForm>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { returnUpBack } from "ionicons/icons"
import { inject, reactive, ref } from "vue"
import { IonPage, IonContent, IonIcon, IonButton, useIonRouter, IonSpinner } from "@ionic/vue"
import * as authApi from "../api/auth"
import { saveUserToStorage } from "../utils/auth"
import { BaseInput, BaseButton, BaseForm, BasePageTitle } from "../components/Base/"
import { useRouter } from "vue-router"

const router = useIonRouter()
const vueRouter = useRouter()

const setUser = inject<Function>("setUser")
const isFetching = ref(false)

const form = reactive({
  email: "",
  password: "",
  username: ""
})

const onSubmit = async () => {
  try {
    isFetching.value = true
    const { data } = await authApi.registerUser(form)
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
