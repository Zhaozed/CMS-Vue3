<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { mapPathToBreadcrumbs } from '@/utils/map-menu'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { computed } from 'vue'
const route = useRoute()
// 使用computed的目的是为了让面包屑随着路由的变化而变化，因为这个组件只会渲染一次，所以需要使用computed
const breadcrumbs = computed(() => {
  // 获取当前路由
  // console.log('route', route)
  if (!route || !route.path) return []
  // 获取登录用户的菜单
  const loginStore = useLoginStore()
  // 根据当前路由获取面包屑, 例如: /main/system/role => ['首页', '系统管理', '角色管理']
  const breadcrumbs = mapPathToBreadcrumbs(loginStore.userMenus, route.path)
  return breadcrumbs
})
</script>

<style scoped lang="less">
.header-crumb {
  color: red;
}
</style>
