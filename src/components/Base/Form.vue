<template>
  <div class="base-form">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-form {
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;

  margin-top: 16px;
}
</style>
