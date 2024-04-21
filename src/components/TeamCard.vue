<template>
  <div class="team-block">
    <div>
      {{ props.team.name }}
    </div>

    <div>
      {{ props.team.description }}
    </div>

    <div>
      {{ props.team.creator?.username }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Team } from "../api/teams"
type Props = {
  team: Team
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.team-block {
  width: calc(50% - 8px);
  aspect-ratio: 1;

  border: 2px solid var(--ion-color-secondary);
  border-radius: 8px;

  padding: 8px 12px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 8px;
}
</style>
