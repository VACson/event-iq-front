<template>
  <IonPage>
    <IonContent>
      <div>
        <img :src="activity?.creator?.avatar" />
        <span>{{ activity?.creator?.username }}</span>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { fetchActivity } from "@/api/activities"
import { IonContent, IonPage, onIonViewDidEnter } from "@ionic/vue"
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"

const activity = ref()
const isPending = ref(true)
const isFetching = ref(false)

const vueRouter = useRouter()
const getActivity = async () => {
  try {
    isFetching.value = true
    isPending.value = false
    const { data } = await fetchActivity({
      uuid: vueRouter.currentRoute.value.params.uuid as string
    })
    activity.value = data
  } catch {
    isPending.value = true
  } finally {
    isFetching.value = false
  }
}

onMounted(getActivity)
onIonViewDidEnter(getActivity)
</script>
