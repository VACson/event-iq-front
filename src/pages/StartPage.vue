<template>
  <IonPage>
    <IonContent
      :fullscreen="true"
      color="dark"
    >
      <IonGrid>
        <IonRow class="name">
          <h1>acti</h1>
        </IonRow>

        <IonRow class="login-buttons">
          <IonCol>
            <BaseButton
              className="light"
              @click="onLoginClick()"
            >
              {{ $t("auth.login") }}
            </BaseButton>
          </IonCol>
          <IonCol>
            <BaseButton
              className="outline"
              @click="onRegisterClick()"
            >
              {{ $t("auth.signup") }}
            </BaseButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, useIonRouter } from "@ionic/vue"

import { BaseInput, BaseButton, BaseForm } from "../components/Base/"

const router = useIonRouter()

const onLoginClick = () => {
  router.navigate({ name: "Login" })
}

const onRegisterClick = () => {
  router.navigate({ name: "Register" })
}
</script>

<style scoped>
.name {
  height: 85dvh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-buttons {
  height: 10dvh;
  display: flex;
  align-items: center;
}
</style>
