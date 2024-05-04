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

        <img
          v-if="imageSrc"
          :src="imageSrc"
          class="image-preview"
        />

        <BaseButton
          className="dark"
          :loading="isFetching"
          @click="onSubmit"
        >
          {{ $t("teams.create_new") }}
        </BaseButton>
      </BaseForm>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { uploadNewImage } from "@/api/images"
import { Team, createNewTeam, updateTeam } from "@/api/teams"
import { BaseButton, BaseForm, BaseInput, BasePageTitle } from "@/components/Base"
import { IonContent, IonPage, useIonRouter } from "@ionic/vue"
import { computed, reactive, ref } from "vue"

const router = useIonRouter()

const photoInputRef = ref()
const isFetching = ref<boolean>(false)

const form = reactive<Team>({
  name: "",
  description: "",
  avatar: undefined
})

const imageSrc = computed<string>(() => {
  if (!form.avatar) return ""
  return URL.createObjectURL(form.avatar as File)
})

const onChooseImage = () => {
  photoInputRef.value.click()
}

const onPhotoChange = (e: Event) => {
  const { files } = e.target as HTMLInputElement
  if (!files) return

  form.avatar = files[0]
}

const onSubmit = async () => {
  try {
    isFetching.value = true

    const { avatar, ...payload } = form
    const teamResponse = await createNewTeam(payload)

    if (avatar && teamResponse.data.uuid) {
      const { data } = await uploadNewImage(avatar as File)

      await updateTeam(teamResponse.data.uuid, { avatar: data.filename })
    }

    resetForm()
    router.navigate({ name: "Discover" })
  } finally {
    isFetching.value = false
  }
  try {
    await createNewTeam(form)
  } catch {}
}

const resetForm = () => {
  form.name = ""
  form.description = ""
  form.avatar = undefined
}
</script>

<style scoped lang="scss">
.label {
  font-size: 24px;
  font-weight: medium;
}

.image-preview {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 4px;
}
</style>
