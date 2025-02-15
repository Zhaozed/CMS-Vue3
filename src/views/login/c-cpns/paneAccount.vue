<template>
  <div class="pane-account">
    <el-form
      :model="useraccount"
      label-width="60px"
      :rules="accountRules"
      status-icon
      ref="userForm"
    >
      <el-form-item label="账号" label-width="60px" prop="account">
        <el-input v-model="useraccount.name" />
      </el-form-item>
      <el-form-item label="密码" label-width="60px" prop="password">
        <el-input v-model="useraccount.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
// 表单校验的实现
import { reactive, ref } from 'vue'
import type { ElForm, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/type'
import { localCache } from '@/utils/cache'

const useraccount = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('pwd') ?? ''
})

const accountRules = reactive<FormRules<IAccount>>({
  name: [
    // 必填校验
    { required: true, message: '请输入账号', trigger: 'blur' },
    // 长度校验
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    // 正则表达式校验
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: '只能输入字母、数字、下划线',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为 6 个字符', trigger: 'blur' }
  ]
})

// 3.具体的登录逻辑
const userForm = ref<InstanceType<typeof ElForm>>()
// 获取登录store对象
const loginStore = useLoginStore()
function handleLogin(isRememberPwd: boolean) {
  // 通过ref属性获取到表单实例,调用validate方法进行表单校验,校验成功则登录成功,否则登录失败
  userForm.value?.validate((valid) => {
    if (valid) {
      loginStore.loginAccountAction(useraccount).then((res) => {
        if (isRememberPwd) {
          localCache.setCache('username', useraccount.name)
          localCache.setCache('pwd', useraccount.password)
        } else {
          localCache.removeCache('username')
          localCache.removeCache('pwd')
        }
      })
      console.log('调用完成')
    } else {
      ElMessage.error('123登录失败')
    }
  })
}

// 4.暴露数据
defineExpose({ handleLogin })
</script>

<style scoped lang="less">
.pane-account {
  color: red;
}
</style>
