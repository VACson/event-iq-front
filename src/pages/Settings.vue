<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div @click="fileInputRef?.click()">
        {{ $t("settings.change_photo") }}
      </div>

      <input
        ref="fileInputRef"
        type="file"
        accept="image/*"
        style="display: none"
        @change="onPhotoChange"
      />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { updateProfilePhoto } from "@/api/users"
import { getUserFromStorage, saveUserToStorage } from "@/utils/auth"
import { IonContent, IonPage } from "@ionic/vue"
import { ref } from "vue"

const fileInputRef = ref<HTMLInputElement>()

const onPhotoChange = async (e: Event) => {
  const { files } = e.target as HTMLInputElement
  if (!files?.length) return

  const payload = new FormData()
  payload.append("file", files[0])

  const { data } = await updateProfilePhoto({ payload })
  const userInfo = await getUserFromStorage()

  saveUserToStorage({ ...userInfo, ...data })
}
</script>
