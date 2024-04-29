<template>
  <input
    type="text"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    class="base-input"
    @input="onChange"
    @keyup.enter="onEnterPressed()"
  />
</template>

<script setup lang="ts">
type Props = {
  modelValue: string | number | undefined
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: ""
})

const onChange = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    emit("update:modelValue", event.target.value)
  }
}

const onEnterPressed = () => {
  emit("search")
}

const emit = defineEmits(["update:modelValue", "search"])
</script>

<style scoped lang="scss">
.base-input {
  width: 100%;
  height: 50px;
  box-sizing: border-box;

  background: transparent;
  background-color: transparent;
  outline: none;
  border: 1px solid var(--ion-color-dark);

  border-radius: 5px;
  padding: 4px 16px;
  line-height: 1;
}
input {
  &:focus,
  &:active,
  &:hover,
  &:visited,
  &:-ms-input-placeholder {
    background: transparent;
    background-color: transparent;
  }
}
</style>
