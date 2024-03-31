<template>
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>{{ props.event?.activity_name }}</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <IonButton
        ariaLabel="Favorite"
        class="event-icon"
      >
      </IonButton>
    </IonCardContent>
  </IonCard>
</template>

<script setup lang="ts">
import { Activity } from "@/api/activities"
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton } from "@ionic/vue"

type Props = {
  event?: Activity
}

const props = defineProps<Props>()
</script>

<style scoped>
.event-icon {
  width: 100%;
  aspect-ratio: 2;
  font-size: 64px;
}
</style>
