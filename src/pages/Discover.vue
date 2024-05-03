<template>
  <IonPage>
    <IonContent>
      <IonRefresher
        slot="fixed"
        @ionRefresh="handleRefresh($event)"
      >
        <IonRefresherContent />
      </IonRefresher>

      <div class="categories-tiles">
        <EventCategoryPreview
          v-for="event in fetchedActivities"
          :key="event.uuid"
          :event="event"
          class="categories-tiles__item"
        />
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import {
  IonPage,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  onIonViewDidEnter
} from "@ionic/vue"
import EventCategoryPreview from "../components/EventCategoryPreview.vue"
import { Activity, fetchActivities } from "../api/activities"

interface RefresherEventDetail {
  complete(): void
}
interface RefresherCustomEvent extends CustomEvent {
  detail: RefresherEventDetail
  target: HTMLIonRefresherElement
}

const fetchedActivities = ref<Array<Activity>>([])

const handleRefresh = (event: RefresherCustomEvent) => {
  try {
    getActivities()
    event.target.complete()
  } catch (e) {
    alert(e)
  }
}

const getActivities = async () => {
  try {
    const { data } = await fetchActivities({ queryParams: { limit: 10, offset: 10 } })
    fetchedActivities.value = data.results
  } catch (e: any) {
    fetchedActivities.value = e.response.data
  }
}

onMounted(getActivities)
onIonViewDidEnter(getActivities)
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
