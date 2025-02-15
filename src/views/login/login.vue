<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<script lang="ts" setup>
import LoginPanel from './c-cpns/loginPanel.vue'
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #f3f4f6;
}
</style>
