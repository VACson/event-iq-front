<template>
  <IonPage>
    <IonContent class="ion-padding create-team-page">
      <BasePageTitle>
        {{ $t("teams.create_new") }}
      </BasePageTitle>
      <BaseForm>
        <BaseInput
          v-model="form.name"
          :placeholder="$t('teams.name')"
        />
        <BaseInput
          v-model="form.description"
          :placeholder="$t('teams.description')"
        />

        <BaseButton
          className="dark"
          @click="onSubmit"
        >
          {{ $t("teams.create_new") }}
        </BaseButton>
      </BaseForm>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { createNewTeam } from "@/api/teams"
import { BaseButton, BaseForm, BaseInput, BasePageTitle } from "@/components/Base"
import { IonContent, IonPage } from "@ionic/vue"
import { reactive } from "vue"

const form = reactive({
  name: "",
  description: ""
})

const onSubmit = () => {
  createNewTeam(form)
}
</script>
