<template>
  <IonPage>
    <IonContent class="ion-padding">
      <IonLabel class="label">{{ $t("create_page.title") }}</IonLabel>
      <BaseForm>
        <BaseInput
          :placeholder="$t('create_page.activity_category')"
          v-model="form.activity_category"
        />

        <BaseInput
          :placeholder="$t('create_page.activity_name')"
          v-model="form.activity_name"
        />

        <BaseInput
          type="number"
          :placeholder="$t('create_page.activity_participants')"
          v-model="form.activity_participants"
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
import { Activity, createNewActivity, fetchActivities } from "../api/activities"
import { BaseButton, BaseForm, BaseInput } from "@/components/Base"

const form = reactive<Activity>({
  activity_category: "",
  activity_name: "",
  activity_participants: undefined
})
const isFetching = ref(false)
const router = useIonRouter()

const onCreateActivity = async () => {
  try {
    isFetching.value = true
    await createNewActivity(form)

    resetForm()
    router.navigate({ name: "Discover" })
  } finally {
    isFetching.value = false
  }
}

const resetForm = () => {
  form.activity_category = ""
  form.activity_name = ""
  form.activity_participants = undefined
}
</script>

<style scoped lang="scss">
.label {
  font-size: 24px;
  font-weight: medium;
}
</style>
