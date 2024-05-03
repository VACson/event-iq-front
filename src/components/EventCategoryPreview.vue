<template>
  <div class="card-container">
    <div class="event-header">
      <img
        v-if="props.event?.creator?.avatar"
        :src="getImageUrl(props.event.creator.avatar)"
        class="creator-avatar"
      />

      <div>
        {{ props.event?.creator?.username }}
      </div>

      <div>
        {{ props.event.date }}
      </div>
    </div>

    <img
      v-if="props.event?.image"
      :src="getImageUrl(props.event.image as string)"
      class="card-image"
    />

    <div class="card-footer">
      <div class="card-footer__main">
        <div class="card-footer__name">{{ props.event.name }}</div>
        <div class="card-footer__location">{{ props.event.location }}</div>
      </div>

      <BaseButton
        :className="isJoinedToEvent ? 'light' : 'dark'"
        style="
          width: fit-content;
          height: fit-content;
          padding: 4px 8px;
          text-transform: unset;
          font-size: 12px;
        "
        @click="handleJoinActivity"
      >
        {{ isJoinedToEvent ? "Joined" : "Join" }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Activity, joinActivity } from "@/api/activities"
import { imagesUrl } from "@/utils/http"
import { onMounted, ref } from "vue"
import { BaseButton } from "./Base"
import { getUserFromStorage } from "@/utils/auth"

type Props = {
  event: Activity
}

const props = defineProps<Props>()

const isJoinedToEvent = ref<Boolean>(false)

const getImageUrl = (image: string): string => {
  return `${imagesUrl}/${image}`
}

const handleJoinActivity = async () => {
  if (isJoinedToEvent.value) return

  try {
    await joinActivity({ uuid: props.event.uuid })
    isJoinedToEvent.value = true
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  const user = await getUserFromStorage()

  if (props.event.creator?.uuid === user?.uuid) {
    isJoinedToEvent.value = true
    return
  }

  if (props.event.members?.some(({ uuid }) => uuid === user?.uuid)) {
    isJoinedToEvent.value = true
  }
})
</script>

<style lang="scss">
.card-container {
  display: flex;
  flex-flow: column nowrap;
  box-shadow: 0 0 4px var(--ion-color-medium);
}
.event-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;

  padding: 12px;
}
.creator-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border-radius: 50%;

  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50% !important;
  }
}

.card-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  padding: 12px;

  &__name {
    font-size: 16px;
  }

  &__location {
    font-size: 16px;
    color: var(--ion-color-medium);
  }
}
</style>
