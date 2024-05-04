<template>
  <IonPage>
    <IonContent class="ion-padding settings">
      <BasePageTitle>
        {{ $t("profile.settings") }}
      </BasePageTitle>

      <div class="settings__list">
        <div
          class="settings__list__item"
          @click="onChangePhotoClick"
        >
          {{ $t("settings.change_photo") }}
        </div>

        <div
          class="settings__list__item"
          @click="onCreateTeamClick"
        >
          {{ $t("teams.create_new") }}
        </div>
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
import { BasePageTitle } from "@/components/Base"
import { getUserFromStorage, saveUserToStorage } from "@/utils/auth"
import { IonContent, IonPage, useIonRouter } from "@ionic/vue"
import { ref } from "vue"

const router = useIonRouter()

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

const onChangePhotoClick = () => {
  fileInputRef.value?.click()
}

const onCreateTeamClick = () => {
  router.push({ name: "TeamCreation" })
}
</script>

<style lang="scss" scoped>
.settings {
  &__list {
    display: flex;
    flex-flow: column nowrap;
    margin-top: 12px;

    &__item {
      padding: 8px;
      border-radius: 2px;

      background-color: transparent;

      cursor: pointer;
      transition: 0.2s;
      user-select: none;

      &:hover,
      &:focus-within {
        background-color: var(--ion-color-medium-tint);
        color: var(--ion-color-medium-contrast);
      }

      &:active {
        background-color: var(--ion-color-medium);
        box-shadow: 0 2px 10px var(--ion-color-medium-tint);
        color: var(--ion-color-medium-contrast);
      }
    }
  }
}
</style>
