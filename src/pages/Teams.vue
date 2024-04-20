<template>
  <IonPage>
    <IonContent>
      <div>
        <div
          v-for="team in dataSource"
          :key="team.uuid"
        >
          {{ team }}
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { Team, fetchTeams } from "@/api/teams"
import { IonContent, IonPage, onIonViewDidEnter } from "@ionic/vue"
import { ref } from "vue"

const dataSource = ref<Array<Team>>([])

const getTeams = async () => {
  try {
    const { data } = await fetchTeams({ queryParams: { limit: 10, offset: 10 } })
    dataSource.value = data.results
  } catch (e: any) {
    dataSource.value = e.response.data
  }
}

onIonViewDidEnter(getTeams)
</script>
