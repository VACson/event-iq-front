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

        <BaseButton @click="onChooseImage">
          {{ $t("create_page.activity_avatar") }}
        </BaseButton>

        <input
          ref="photoInputRef"
          type="file"
          accept="image/*"
          style="display: none"
          @change="onPhotoChange"
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
import { Team, createNewTeam } from "@/api/teams"
import { BaseButton, BaseForm, BaseInput, BasePageTitle } from "@/components/Base"
import { IonContent, IonPage } from "@ionic/vue"
import { reactive, ref } from "vue"

const photoInputRef = ref()

const form = reactive<Team>({
  name: "",
  description: "",
  avatar: undefined
})

const onChooseImage = () => {
  photoInputRef.value.click()
}

const onPhotoChange = (e: Event) => {
  const { files } = e.target as HTMLInputElement
  if (!files) return

  form.avatar = files[0]
}

const onSubmit = () => {
  createNewTeam(form)
}
</script>
