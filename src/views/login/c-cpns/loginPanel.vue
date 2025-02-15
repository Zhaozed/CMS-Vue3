<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeTab">
        <!-- 账号登录的pane -->
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <span class="custom-tabs-label">
                <el-icon><UserFilled /></el-icon>
                <span class="text">账号登录</span>
              </span>
            </div>
          </template>
          <!--  通过ref属性将组件实例化,使用 ref 可以直接访问子组件的实例，从而调用其属性和方法 -->
          <paneAccount ref="accountRef" />
        </el-tab-pane>
        <!-- 手机登录的pane -->
        <el-tab-pane name="phone">
          <template #label>
            <span class="custom-tabs-label">
              <div class="label">
                <el-icon><Iphone /></el-icon>
                <span class="text">手机登录</span>
              </div>
            </span>
          </template>
          <panePhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRememberPwd" label="记住密码" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      @click="handleTabClick(activeTab)"
      class="login-btn"
      type="primary"
      size="large"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import paneAccount from './paneAccount.vue'
import panePhone from './panePhone.vue'
import { localCache } from '@/utils/cache'
const isRememberPwd = ref<boolean>(localCache.getCache('isRemember') ?? false)
// 监听器，isRemember是啥咱们就监听啥东西。
watch(isRememberPwd, (newValue) => {
  console.log('isRememberPwd 值: ', newValue) // 打印变化的值
  localCache.setCache('isRemember', newValue) // 更新缓存
  console.log('缓存值已设置为: ', localCache.getCache('isRemember')) // 再次验证缓存的值
})
const activeTab = ref('account')
// 实例化账号登录组件，通过实例化的对象来调用组件内部的方法
const accountRef = ref<InstanceType<typeof paneAccount>>()
const handleTabClick = (tab: string) => {
  if (activeTab.value === 'account') {
    // 可选链调用，如果accountRef.value存在，则调用handleLogin方法
    accountRef.value?.handleLogin(isRememberPwd.value)
  } else {
    console.log('用户正在shouji登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
