<template>
  <IonPage>
    <IonContent class="ion-padding">
      <IonLabel class="label">{{ $t("create_page.title") }}</IonLabel>
      <BaseForm>
        <BaseInput
          :placeholder="$t('create_page.activity_name')"
          v-model="form.name"
        />

        <BaseInput
          :placeholder="$t('create_page.activity_placement')"
          v-model="form.location"
        />

        <BaseInput
          :placeholder="$t('create_page.activity_date')"
          v-model="form.date"
        />

        <BaseInput
          :placeholder="$t('create_page.activity_notes')"
          v-model="form.description"
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
          :loading="isFetching"
          @click="onCreateActivity()"
        >
          {{ $t("create_page.create_new") }}
        </BaseButton>
      </BaseForm>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { IonPage, IonContent, IonLabel, useIonRouter } from "@ionic/vue"
import { Activity, createNewActivity, updateActivity } from "../api/activities"
import { BaseButton, BaseForm, BaseInput } from "@/components/Base"
import { uploadNewImage } from "@/api/images"

const router = useIonRouter()

const photoInputRef = ref()

const form = reactive<Activity>({
  name: "",
  location: "",
  date: "",
  description: "",
  image: undefined
})

const isFetching = ref(false)

const onCreateActivity = async () => {
  try {
    isFetching.value = true

    const { image, ...payload } = form
    const activityResponse = await createNewActivity(payload)

    if (image && activityResponse.data.uuid) {
      const { data } = await uploadNewImage(image as File)

      await updateActivity(activityResponse.data.uuid, { image: data.filename })
    }

    resetForm()
    router.navigate({ name: "Discover" })
  } finally {
    isFetching.value = false
  }
}

const resetForm = () => {
  form.name = ""
}

const onChooseImage = () => {
  photoInputRef.value.click()
}

const onPhotoChange = (e: Event) => {
  const { files } = e.target as HTMLInputElement
  if (!files) return

  form.image = files[0]
}
</script>

<style scoped lang="scss">
.label {
  font-size: 24px;
  font-weight: medium;
}
</style>
