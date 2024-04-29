<template>
  <IonPage>
    <IonContent class="ion-padding">
      <IonLabel class="label">{{ $t("create_page.title") }}</IonLabel>
      <BaseForm>
        <BaseInput
          :placeholder="$t('create_page.activity_name')"
          v-model="form.activity_name"
        />

        <BaseInput
          :placeholder="$t('create_page.activity_placement')"
          v-model="form.activity_placement"
        />

        <BaseInput
          :placeholder="$t('create_page.activity_date')"
          v-model="form.activity_date"
        />

        <BaseInput
          :placeholder="$t('create_page.activity_notes')"
          v-model="form.activity_notes"
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
  activity_name: "",
  activity_placement: "",
  activity_date: "",
  activity_notes: "",
  activity_avatar: undefined
})

const isFetching = ref(false)

const onCreateActivity = async () => {
  try {
    isFetching.value = true

    const { activity_avatar, ...payload } = form
    const activityResponse = await createNewActivity(payload)

    if (activity_avatar) {
      const { data } = await uploadNewImage(activity_avatar as File)
      console.log(data)

      await updateActivity(activityResponse.data.activity_uuid, { activity_avatar: data.filename })
    }

    resetForm()
    router.navigate({ name: "Discover" })
  } finally {
    isFetching.value = false
  }
}

const resetForm = () => {
  form.activity_name = ""
}

const onChooseImage = () => {
  photoInputRef.value.click()
}

const onPhotoChange = (e: Event) => {
  const { files } = e.target as HTMLInputElement
  if (!files) return

  form.activity_avatar = files[0]
}
</script>

<style scoped lang="scss">
.label {
  font-size: 24px;
  font-weight: medium;
}
</style>
