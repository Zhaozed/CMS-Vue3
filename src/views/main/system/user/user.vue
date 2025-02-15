<template>
  <div class="user">
    <!-- 1.搜索区域 -->
    <page-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <!-- 就是说当query-click或者reset-click事件触发时，会调用handleQueryClick或者handleResetClick方法，并且自动的把带过来的参数传递下去 -->
    <!-- 2.展示区域 -->
    <page-content
      ref="contentRef"
      @newDataClick="handleNewDataClick"
      @editDataClick="handleEditClick"
    />
    <model ref="modelRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import { ref } from 'vue'
import model from './c-cpns/page-modal.vue'

const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(searchInfo: any) {
  contentRef.value?.fetchUserListData(searchInfo)
}
function handleResetClick() {
  contentRef.value?.handleResetClick()
}
const modelRef = ref<InstanceType<typeof model>>()

function handleNewDataClick() {
  modelRef.value?.setDialogVisible()
}

function handleEditClick(row: any) {
  modelRef.value?.setDialogVisible(false, row)
}
</script>

<style lang="less" scoped></style>
