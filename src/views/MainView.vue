<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet />
      <IonTabBar>
        <IonTabButton
          tab="discover"
          href="/discover"
        >
          <IonIcon :icon="planetOutline" />
          <IonLabel>{{ $t("discover.title") }}</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="create"
          href="/create"
        >
          <IonIcon :icon="add" />
          <IonLabel>{{ $t("create_page.title") }}</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="teams"
          href="/teams"
        >
          <IonIcon :icon="people" />
          <IonLabel>{{ $t("teams.title") }}</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="profile"
          href="/profile"
        >
          <IonIcon :icon="person" />
          <IonLabel>{{ $t("profile.title") }}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>
<script setup lang="ts">
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet
} from "@ionic/vue"
import { add, person, planetOutline, people } from "ionicons/icons"
</script>
