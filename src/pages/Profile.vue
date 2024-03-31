<template>
  <IonPage>
    <IonMenu
      contentId="main-content"
      side="end"
    >
      <IonContent class="ion-padding">
        <div class="lang-switcher">
          <div
            class="lang-switcher__item"
            :class="{ 'lang-switcher__item--active': $i18n.locale === 'en' }"
            @click="() => ($i18n.locale = 'en')"
          >
            EN
          </div>
          <div
            class="lang-switcher__item"
            :class="{ 'lang-switcher__item--active': $i18n.locale === 'uk' }"
            @click="() => ($i18n.locale = 'uk')"
          >
            UA
          </div>
        </div>

        <IonIcon
          color="dark"
          :icon="logOutOutline"
          class="profile-page__logout-button"
          @click.stop="onLogout"
        />
      </IonContent>
    </IonMenu>

    <IonProgressBar
      v-if="isPending"
      type="indeterminate"
    />
    <IonContent>
      <div id="main-content">
        <div class="profile-page">
          <div @click="fileInputRef?.click()">
            <IonSkeletonText
              v-if="isPending"
              animated
              class="profile-page__avatar"
            />
            <IonImg
              v-else-if="userData?.avatar"
              class="profile-page__avatar"
              :src="getImageUrl(userData.avatar)"
            />
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
          <IonMenuButton class="menu-button"></IonMenuButton>

          <IonText color="dark">
            <IonSkeletonText
              v-if="isPending"
              animated
              style="min-width: 100px"
            />
            <b v-else>
              {{ userData?.username }}
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
  onIonViewWillEnter,
  IonImg,
  IonMenuButton,
  IonMenu
} from "@ionic/vue"
import { inject, ref } from "vue"
import { nextTick } from "vue"
import { logOutOutline, person } from "ionicons/icons"
import { User, getUserFromStorage, removeUserFromStorage, saveUserToStorage } from "@/utils/auth"
import { imagesUrl } from "../utils/http"
import { onMounted } from "vue"
import { updateProfilePhoto } from "../api/users"
import { i18n } from "../locales/utils"

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
      router.navigate({ name: "Discover" })
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

  const payload = new FormData()
  payload.append("file", files[0])

  const { data } = await updateProfilePhoto({ payload })

  saveUserToStorage({ ...userData.value, ...data })
  userData.value = data
}

const getImageUrl = (image: string): string => {
  return `${imagesUrl}/${image}`
}

const changeLang = () => {
  console.log(i18n)
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
    position: relative;
    width: 100dvw;
    height: 100dvw;

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
      margin: 0;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100dvw;
      height: 100dvw;
      background: linear-gradient(0deg, var(--background) 0%, transparent 50%);
    }
  }

  &__logout-button {
    position: absolute;
    top: 24px;
    right: 16px;
    font-size: 32px;
  }
}

.lang-switcher {
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;

  &__item {
    color: var(--ion-color-dark);
    transition: color 0.3s;

    &--active {
      color: var(--ion-color-primary);
    }
  }
}

.menu-button {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
