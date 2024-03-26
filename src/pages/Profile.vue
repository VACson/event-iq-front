<template>
  <IonPage fullscreen>
    <IonProgressBar
      v-if="isPending"
      type="indeterminate"
    />
    <IonContent class="ion-padding">
      <div class="profile-page">
        <IonIcon
          color="dark"
          :icon="logOutOutline"
          class="profile-page__logout-button"
          @click="onLogout"
        />

        <div @click="fileInputRef?.click()">
          <IonSkeletonText
            v-if="isPending"
            animated
            class="profile-page__avatar"
            style="border-radius: 50%"
          />
          <IonAvatar
            v-else-if="userData?.avatar"
            class="profile-page__avatar"
          >
            <img :src="getImageUrl(userData.avatar)" />
          </IonAvatar>
          <IonIcon
            v-else
            class="profile-page__avatar profile-page__avatar--placeholder"
            color="medium"
            :icon="person"
          />
          <input
            ref="fileInputRef"
            type="file"
            accept="image/*"
            style="display: none"
            @change="onPhotoChange"
          />
        </div>

        <IonText color="dark">
          <IonSkeletonText
            v-if="isPending"
            animated
            style="min-width: 100px"
          />
          <b v-else>
            {{ userData?.fullname }}
          </b>
        </IonText>

        <IonText color="dark">
          <IonSkeletonText
            v-if="isPending"
            animated
            style="min-width: 100px"
          />
          <span v-else>
            {{ userData?.description }}
          </span>
        </IonText>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonPage,
  useIonRouter,
  IonProgressBar,
  IonIcon,
  IonText,
  IonSkeletonText,
  IonAvatar,
  onIonViewWillEnter
} from "@ionic/vue"
import { ref } from "vue"
import { nextTick } from "vue"
import { logOutOutline, person } from "ionicons/icons"
import { User, getUserFromStorage, removeUserFromStorage, saveUserToStorage } from "@/utils/auth"
import { imagesUrl } from "../utils/http"
import { onMounted } from "vue"
import { updateProfilePhoto } from "../api/users"

const fileInputRef = ref<HTMLInputElement>()

const userData = ref<User>()
const router = useIonRouter()

const isPending = ref<boolean>(true)

const getUserData = async (firstFetch: boolean = true) => {
  try {
    const userInfo = await getUserFromStorage()
    userData.value = userInfo
    isPending.value = false
  } catch (error: any) {
    if (error?.response?.status !== 401 || !firstFetch) {
      router.push({ name: "Discover" })
      return
    }

    setTimeout(getUserData, 1000)
  }
}

const onLogout = () => {
  removeUserFromStorage()
  router.push({ name: "Welcome" })
}

const onPhotoChange = async (e: Event) => {
  const { files } = e.target as HTMLInputElement
  if (!files?.length) return

  console.log(files)

  const payload = new FormData()
  payload.append("file", files[0])

  const { data } = await updateProfilePhoto({ payload })

  saveUserToStorage(data)
  userData.value = data
}

const getImageUrl = (image: string): string => {
  return `${imagesUrl}/${image}`
}

onMounted(() => nextTick(getUserData))
onIonViewWillEnter(() => nextTick(getUserData))
</script>

<style scoped lang="scss">
.profile-page {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 16px;

  &__avatar {
    border: 2px solid red;
    width: 128px;
    height: 128px;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &--placeholder {
      padding: 24px;
      width: 76px;
      height: 76px;
      margin: 0;
    }
  }

  &__logout-button {
    position: absolute;
    top: 24px;
    right: 16px;
    font-size: 32px;
  }
}
</style>
