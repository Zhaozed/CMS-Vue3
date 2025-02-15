<template>
  <div>
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-data-click="handleNewDataClick"
      @edit-data-click="handleEditDataClick"
    />
    <page-modal
      :modal-config="modalConfig"
      ref="modalRef"
      :other-info="otherInfo"
    >
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus.list"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handelCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="role">
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
import usePageContent from '@/hooks/usePageContent'

import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'
import usePageModal from '@/hooks/usePageModal'

import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const mainstore = useMainStore()
// 使用storetoref保证响应式
const { entireMenus } = storeToRefs(mainstore)

// content的逻辑处理
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// modal的逻辑处理
const { modalRef, handleNewDataClick, handleEditDataClick } = usePageModal()
const otherInfo = ref({})
function handelCheck(data1: any, data2: any) {
  // console.log(data1, data2)
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = menuList
}
</script>

<style scoped></style>
