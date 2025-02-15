<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <h4 class="title" v-show="!isFold">后台管理-CMS</h4>
    </div>
    <div class="menu">
      <el-menu
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :default-active="defaultValue"
      >
        <template v-for="item in menuList" :key="item.id">
          <!-- 1.系统总览 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon
                ><component :is="item.icon.split('el-icon-')[1]"></component
              ></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
              >
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useLoginStore from '@/store/login/login'
import { computed, defineProps, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menu'
const loginstore = useLoginStore()
const menuList = loginstore.userMenus
// 通过props接收父组件传递过来的isFold
const props = defineProps({
  isFold: {
    type: Boolean,
    required: true,
    default: false
  }
})
// // 2.默认值的问题,默认值是当前路由对应的菜单id
const route = useRoute()
// currentMenu是一个对象，里面包含了当前路由对应的菜单信息。根据url路径，使用mapPathToMenu函数，从menuList中找到对应的菜单信息
const defaultValue = computed(() => {
  // 只要route.path变化，就会重新计算
  const currentMenu = mapPathToMenu(menuList, route.path)
  return currentMenu ? currentMenu.id + '' : '1'
})

// 2.监听item点击
const router = useRouter()
function handleItemClick(item: any) {
  router.push(item.url)
}
</script>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
