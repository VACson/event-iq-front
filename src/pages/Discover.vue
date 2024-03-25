<template>
  <IonPage>
    <IonContent>
      <IonRefresher
        slot="fixed"
        @ionRefresh="handleRefresh($event)"
      >
        <IonRefresherContent />
      </IonRefresher>
      <!-- 
      <IonButton @click="onCreateActivity()">{{ $t("activities.createNew") }}</IonButton> -->

      <div class="categories-tiles">
        <EventCategoryPreview
          v-for="event in fetchedActivities"
          :icon="event.activity_type"
          :key="event.activity_id"
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
  useIonRouter,
  onIonViewDidEnter
} from "@ionic/vue"
import EventCategoryPreview from "../components/EventCategoryPreview.vue"
import { Activity, createNewActivity, fetchActivities } from "../api/activities"

interface RefresherEventDetail {
  complete(): void
}
interface RefresherCustomEvent extends CustomEvent {
  detail: RefresherEventDetail
  target: HTMLIonRefresherElement
}

const fetchedActivities = ref<Array<Activity>>([])
// const icons = ["heart", "accessibility", "airplane", "bag", "basketball", "brush"]

const handleRefresh = (event: RefresherCustomEvent) => {
  // Any calls to load data go here
  try {
    getActivities()
    event.target.complete()
  } catch (e) {
    alert(e)
  }
}

const onCreateActivity = async () => {
  const { data } = await createNewActivity({
    activity_name: "airplane",
    activity_participants: 1,
    activity_type: "airplane"
  })
}

const getActivities = async () => {
  try {
    const { data } = await fetchActivities({ queryParams: { limit: 10, offset: 10 } })
    fetchedActivities.value = data.results
  } catch (e: any) {
    fetchedActivities.value = e.response.data
  }
}

onIonViewDidEnter(() => {
  getActivities()
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
