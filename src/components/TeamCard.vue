<template>
  <div class="team-block">
    <div class="team-header">
      <div class="team-name">
        {{ props.team.name }}
      </div>
    </div>

    <img
      v-if="props.team?.avatar"
      :src="getImageUrl(props.team?.avatar as string)"
      class="team-avatar"
    />

    <div class="team-footer">
      <div class="team-footer__main">
        <div class="team-footer__name">{{ props.team.description }}</div>
      </div>

      <BaseButton
        :className="isJoinedTeam ? 'light' : 'dark'"
        style="
          width: fit-content;
          height: fit-content;
          padding: 4px 8px;
          text-transform: unset;
          font-size: 12px;
        "
        @click="handleJoinTeam"
      >
        {{ isJoinedTeam ? "Joined" : "Join" }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { imagesUrl } from "@/utils/http"
import { Team, joinTeam } from "../api/teams"
import { BaseButton } from "./Base"
import { ComputedRef, inject, onMounted, ref } from "vue"
import { User } from "@/utils/auth"
type Props = {
  team: Team
}

const props = defineProps<Props>()
const userInfo = inject<ComputedRef<User>>("userInfo")

const isJoinedTeam = ref<boolean>(false)

const getImageUrl = (image: string): string => {
  return `${imagesUrl}/${image}`
}

const handleJoinTeam = async () => {
  const res = await joinTeam({ uuid: props.team.uuid! })

  isJoinedTeam.value = true
}

onMounted(() => {
  if (props.team.creator?.uuid === userInfo?.value?.uuid) {
    isJoinedTeam.value = true
    return
  }

  if (props.team.members?.some(({ uuid }) => uuid === userInfo?.value?.uuid)) {
    isJoinedTeam.value = true
  }
})
</script>

<style lang="scss" scoped>
.team-block {
  width: 100%;

  box-shadow: 0 0 4px var(--ion-color-medium);
  border-radius: 8px;

  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
}

.team-header {
  padding: 12px;

  display: flex;
  justify-content: space-between;
}

.team-name {
  font-size: 16px;
  text-transform: uppercase;
}

.team-avatar {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.team-footer {
  display: flex;
  justify-content: space-between;

  padding: 12px;
}
</style>
