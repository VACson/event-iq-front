<template>
  <IonPage>
    <IonContent>
      <div class="categories-tiles">
        <EventCategoryPreview
          v-for="event in fetchedActivities"
          :key="event.uuid"
          :event="event"
          class="categories-tiles__item"
          @click="goToActivityPage(event)"
        />
      </div>

      <IonInfiniteScroll @ionInfinite="ionInfinite">
        <IonInfiniteScrollContent />
      </IonInfiniteScroll>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, ComputedRef } from "vue"
import {
  IonPage,
  IonContent,
  onIonViewDidEnter,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonRouter
} from "@ionic/vue"
import EventCategoryPreview from "../components/EventCategoryPreview.vue"
import { Activity, fetchActivities } from "../api/activities"

const router = useIonRouter()
const userInfo = inject<ComputedRef>("userInfo")

const fetchedActivities = ref<Array<Activity>>([])

const ionInfinite = async (event: any) => {
  getActivities()
  setTimeout(() => event.target.complete(), 500)
}

const getActivities = async () => {
  if (!userInfo?.value?.token) return setTimeout(() => getActivities(), 500)
  try {
    const { data } = await fetchActivities({ queryParams: { limit: 10, offset: 10 } })
    fetchedActivities.value = data.results
    return Promise.resolve(data)
  } catch (e: any) {
    fetchedActivities.value = e.response.data
  }
}

const goToActivityPage = (event: Activity) => {
  router.push({ name: "ActivityPage", params: { uuid: event.uuid } })
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
