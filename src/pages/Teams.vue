<template>
  <IonPage>
    <IonContent class="ion-padding">
      <IonTitle>
        {{ $t("teams.title") }}
      </IonTitle>

      <BaseInputSearch
        v-model="form.search"
        :placeholder="$t('common.search')"
        @search="onTeamsSearch"
      />

      <div class="teams-list">
        <TeamCard
          v-for="team in dataSource"
          :key="team.uuid"
          :team="team"
        />
      </div>

      <IonInfiniteScroll @ionInfinite="ionInfinite">
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { Team, fetchTeams } from "@/api/teams"
import { BaseInputSearch } from "@/components/Base"
import TeamCard from "@/components/TeamCard.vue"
import {
  InfiniteScrollCustomEvent,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonTitle,
  onIonViewDidEnter
} from "@ionic/vue"
import { reactive, ref } from "vue"

const form = reactive({
  search: "",
  limit: 10,
  offset: 0
})

const dataSource = ref<Array<Team>>([])

const getInitialTeams = async () => {
  try {
    const { data } = await fetchTeams({ queryParams: form })
    dataSource.value = data.results
    form.offset = form.offset + data.results.length
  } catch (e: any) {
    console.log(e)
  }
}

const getTeams = async (queryParams = form) => {
  try {
    const { data } = await fetchTeams({ queryParams })
    dataSource.value = data.results
    form.offset = form.offset + data.results.length
  } catch (e: any) {
    console.log(e)
  }
}

const onTeamsSearch = () => {
  getTeams(form)
}

const ionInfinite = (ev: InfiniteScrollCustomEvent) => {
  getTeams()
  setTimeout(() => ev.target.complete(), 500)
}
onIonViewDidEnter(getInitialTeams)
</script>

<style lang="scss" scoped>
.teams-list {
  display: flex;
  flex-flow: row wrap;
  gap: 16px;

  width: 100%;

  margin-top: 16px;
}
</style>
