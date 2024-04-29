<template>
  <div class="card-container">
    <div class="event-header">
      <img
        v-if="props.event?.activity_creator?.avatar"
        :src="getImageUrl(props.event.activity_creator.avatar)"
        class="creator-avatar"
      />

      <div>
        {{ props.event?.activity_creator?.username }}
      </div>
    </div>

    <img
      v-if="props.event?.activity_images?.length"
      :src="getImageUrl(props.event.activity_images[0])"
      class="card-image"
    />

    <div class="card-footer">
      <div class="card-footer__main">
        <div class="card-footer__name">{{ props.event.activity_name }}</div>
        <div class="card-footer__location"></div>
      </div>

      <BaseButton
        className="dark"
        style="
          width: fit-content;
          height: fit-content;
          padding: 4px 8px;
          text-transform: unset;
          font-size: 12px;
        "
      >
        Join
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Activity } from "@/api/activities"
import { imagesUrl } from "@/utils/http"
import { onMounted } from "vue"
import { BaseButton } from "./Base"

type Props = {
  event: Activity
}

const props = defineProps<Props>()

const getImageUrl = (image: string): string => {
  return `${imagesUrl}/${image}`
}

onMounted(() => {
  console.log(props.event)
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
