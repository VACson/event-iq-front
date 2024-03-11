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
            <IonButton
              size="large"
              color="light"
              expand="block"
              @click="test()"
            >
              Log in
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              size="large"
              fill="outline"
              color="light"
              expand="block"
            >
              SignUp
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { useIonRouter } from "@ionic/vue"
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton } from "@ionic/vue"

const router = useIonRouter()

const test = () => {
  router.push("/login")
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
