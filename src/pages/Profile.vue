<template>
  <IonPage>
    <IonMenu
      ref="menuRef"
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

        <IonList>
          <div @click="onSettingsClick">
            {{ $t("profile.settings") }}
          </div>
        </IonList>
      </IonContent>
    </IonMenu>

    <IonContent>
      <div id="main-content">
        <div class="profile-page">
          <IonMenuButton class="menu-button"></IonMenuButton>
          <div>
            <IonSkeletonText
              v-if="isPending"
              animated
              class="profile-page__avatar"
            />
            <img
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
          </div>

          <div class="profile-info">
            <div class="profile-info__name">
              <div>@{{ userData?.username }}</div>
              <!-- <IonText color="medium"> {{ userData?.location }} </IonText> -->
            </div>

            <IonText color="medium"> {{ userData?.description }} </IonText>

            <div class="counters">
              <div class="info-counter">
                <div>{{ userData?.joined_activities?.length || 0 }}</div>
                <IonText color="medium"> {{ $t("activities.joined_activities") }} </IonText>
              </div>

              <div class="info-counter">
                <div>{{ userData?.created_activities?.length || 0 }}</div>
                <IonText color="medium"> {{ $t("activities.created_activities") }} </IonText>
              </div>

              <div class="info-counter">
                <div>{{ userData?.joined_teams?.length || 0 }}</div>
                <IonText color="medium"> {{ $t("teams.joined_teams") }} </IonText>
              </div>
            </div>
          </div>
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
  IonMenu,
  IonList
} from "@ionic/vue"
import { menuController } from "@ionic/vue"
import { ref } from "vue"
import { nextTick } from "vue"
import { logOutOutline, person } from "ionicons/icons"
import { User, getUserFromStorage, removeUserFromStorage, saveUserToStorage } from "@/utils/auth"
import { imagesUrl } from "../utils/http"
import { onMounted } from "vue"
import { getProfile } from "@/api/users"

const menuRef = ref<HTMLIonMenuElement>()

const userData = ref<User>()
const router = useIonRouter()

const isPending = ref<boolean>(true)

const getUserData = async (firstFetch: boolean = true) => {
  try {
    const userInfo = await getUserFromStorage()
    const me = await getProfile()

    userData.value = { ...userInfo, ...me }
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
  onMenuClose()
  router.push({ name: "Welcome" })
}

const getImageUrl = (image: string): string => {
  return `${imagesUrl}/${image}`
}

const onSettingsClick = () => {
  onMenuClose()

  router.push({ name: "Settings" })
}

const onMenuClose = () => {
  menuController.close()
}

onMounted(() => nextTick(getUserData))
onIonViewWillEnter(() => nextTick(getUserData))
</script>

<style scoped lang="scss">
.profile-page {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 16px;

  &__avatar {
    position: relative;
    width: 100dvw;
    aspect-ratio: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &--placeholder {
      padding: 24px;
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

.lang-switcher {
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;

  margin-top: 16px;

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
  z-index: 6;
}

.profile-info {
  padding: 12px;

  &__name {
    font-size: 24px;
  }
}

.counters {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  margin-bottom: 12px;

  & > * {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    max-width: 100px;
    text-align: center;
  }
}
</style>
