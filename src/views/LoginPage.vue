<template>
  <IonPage>
    <IonContent class="ion-padding">
      <IonButton
        @click="onReturn"
        class="return-back"
      >
        <IonIcon :icon="returnUpBack" />
      </IonButton>

      <IonList>
        <IonListHeader>
          <IonLabel class="label">Log in to your account</IonLabel>
        </IonListHeader>
      </IonList>
      <IonInput
        class="form-item"
        type="email"
        v-model="form.email"
        placeholder="Username"
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
        LOG IN
      </IonButton>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { returnUpBack } from "ionicons/icons"
import { inject, reactive } from "vue"
import {
  IonPage,
  IonContent,
  IonIcon,
  IonList,
  IonListHeader,
  IonLabel,
  IonButton,
  IonInput,
  useIonRouter
} from "@ionic/vue"
import * as authApi from "../api/auth"

const setUser = inject<Function>("setUser")

const router = useIonRouter()

const form = reactive({
  email: "",
  password: ""
})

const onSubmit = async () => {
  const { data } = await authApi.login(form)
  if (!setUser) return
  setUser(data)
  router.push("/discover")
}

const onReturn = () => {
  router.push("/welcome")
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
