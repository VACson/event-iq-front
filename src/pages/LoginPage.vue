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

      <IonList>
        <IonListHeader>
          <IonLabel class="label">{{ $t("auth.login_title") }}</IonLabel>
        </IonListHeader>
      </IonList>
      <IonInput
        class="form-item"
        type="email"
        v-model="form.email"
        placeholder="Email"
      />
      <IonInput
        class="form-item"
        type="password"
        v-model="form.password"
        placeholder="Password"
      />

      <IonButton
        class="form-item--button"
        color="dark"
        @click="onSubmit"
      >
        <IonSpinner
          v-if="isFetching"
          style="height: 16px"
        />
        {{ $t("auth.login") }}
      </IonButton>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { returnUpBack } from "ionicons/icons"
import { inject, reactive, ref } from "vue"
import {
  IonPage,
  IonContent,
  IonIcon,
  IonList,
  IonListHeader,
  IonLabel,
  IonButton,
  IonInput,
  useIonRouter,
  IonSpinner
} from "@ionic/vue"
import * as authApi from "../api/auth"
import { saveUserToStorage } from "../utils/auth"
import { useRouter } from "vue-router"

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
  display: flex;
  flex-flow: row wrap;
  gap: 16px;

  margin-top: 60px;
}

.form-item {
  border: 2px solid var(--ion-color-dark) !important;
  border-radius: 5px;
  margin: 16px 0 0 0;
  padding: 4px 16px !important;
  box-sizing: border-box;
  box-shadow: inset 10px white;
  line-height: 1;
}

.form-item--button {
  margin: 16px 0 0 0;
  border-radius: 5px;
  width: 100%;
  height: 56px;
  background: var(--ion-color-dark);
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
.item-inner {
  border: none !important;
}

.login-form {
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;
}
</style>
