<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Discover</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <IonRefresher
        slot="fixed"
        @ionRefresh="handleRefresh($event)"
      >
        <IonRefresherContent />
      </IonRefresher>

      <div class="categories-tiles">
        <EventCategoryPreview
          v-for="event in icons"
          :icon="event"
          :key="event"
          class="categories-tiles__item"
        />
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { Ref, inject, onMounted, ref } from "vue"
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonButton,
  useIonRouter
} from "@ionic/vue"
import EventCategoryPreview from "../components/EventCategoryPreview.vue"

interface RefresherEventDetail {
  complete(): void
}
interface RefresherCustomEvent extends CustomEvent {
  detail: RefresherEventDetail
  target: HTMLIonRefresherElement
}

const icons = ["heart", "accessibility", "airplane", "bag", "basketball", "brush"]

const router = useIonRouter()
const handleRefresh = (event: RefresherCustomEvent) => {
  // Any calls to load data go here
  event.target.complete()
}

const isAuthenticated = inject<Ref>("isAuthenticated")

onMounted(() => {
  if (!isAuthenticated?.value) {
    router.push("/welcome")
  }
})
</script>

<style scoped lang="scss">
.categories-tiles {
  display: flex;
  flex-flow: row wrap;
  gap: 12px;

  padding: 24px 16px;
}

.categories-tiles__item {
  width: 100%;
  margin: 0;

  @media screen and (min-width: 768px) {
    width: calc(50% - 6px);
  }

  @media screen and (min-width: 1200px) {
    width: calc(33% - 4px);
  }
}
</style>
