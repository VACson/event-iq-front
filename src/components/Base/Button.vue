<template>
  <button
    v-if="!isPending"
    class="base-button"
    :class="buttonClass"
    @click="emit('click')"
  >
    <IonSpinner
      v-if="props.loading"
      name="circular"
    />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { IonSpinner } from "@ionic/vue"
import { computed, nextTick, ref, watch } from "vue"

type Props = {
  disabled?: boolean
  className?: "disabled" | "danger" | "dark" | "default" | "light" | "outline" | "light-outline"
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  className: "default",
  loading: false
})

const emit = defineEmits(["click"])

const isPending = ref<boolean>(false)

const classes = {
  disabled: "base-button--disabled",
  danger: "base-button--danger",
  dark: "base-button--dark",
  light: "base-button--light",
  outline: "base-button--outline",
  "light-outline": "base-button--light-outline",
  default: "base-button--default"
}

const buttonClass = computed(() => {
  if (props.className === "default") return "base-button"
  return `base-button ${classes[props.className]}`
})
</script>

<style scoped lang="scss">
.base-button {
  width: 100%;
  height: 50px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  background: transparent;
  background-color: transparent;
  outline: none;
  border: 1px solid var(--ion-color-dark);

  border-radius: 5px;
  padding: 4px 16px;
  line-height: 16px;

  color: var(--ion-color-dark);
  font-size: 16px;
  font-weight: medium;
  text-transform: uppercase;

  transition: 1s;

  & * {
    color: inherit;
    font-size: inherit;
    height: 16px;
  }

  &--dark {
    background-color: var(--ion-color-dark);
    color: var(--ion-color-light);
    border: 1px solid var(--ion-color-dark);
  }

  &--outline {
    background-color: var(--ion-color-dark);
    color: var(--ion-color-light);
    border: 1px solid var(--ion-color-light);
  }

  &--light {
    background-color: var(--ion-color-light);
    color: var(--ion-color-dark);
    border: 1px solid var(--ion-color-light);
  }

  &--light-outline {
    background-color: var(--ion-color-light);
    color: var(--ion-color-dark);
    border: 1px solid var(--ion-color-dark);
  }
}
</style>
