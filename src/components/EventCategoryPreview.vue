<template>
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>Title</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <IonButton
        ariaLabel="Favorite"
        class="event-icon"
      >
        <IonIcon
          :name="props.icon"
          ariaHidden
        />
      </IonButton>
    </IonCardContent>
  </IonCard>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonButton
} from "@ionic/vue"

type Props = {
  icon?: string
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
