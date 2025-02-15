<template>
  <div class="main-header">
    <div class="menu-icon">
      <el-icon size="23px" @click="clickMenuIcon">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <header-crumb />
      </div>
      <header-info />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
import { ref } from 'vue'
const emit = defineEmits(['changeMenuWidth'])
const isFold = ref(false)
function clickMenuIcon() {
  isFold.value = !isFold.value
  // 这里点击以后，要通知main.vue里面的el-aside的宽度变化
  // 知识点是：子组件如何通知父组件，子组件发生改变，父组件要做出相应的改变，通过自定义事件
  // emit('自定义事件名', 参数)
  emit('changeMenuWidth', isFold.value)
}
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
