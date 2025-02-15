<template>
  <div class="search">
    <!-- 1.1.表单输入 -->
    <el-form
      :model="userSearchForm"
      ref="formRef"
      label-width="120px"
      size="large"
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="userSearchForm.name"
              placeholder="请输入用户名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="userSearchForm.realname"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="userSearchForm.cellphone"
              placeholder="请输入手机号码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="userSearchForm.enable"
              placeholder="请选择状态"
              style="width: 100%"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="userSearchForm.createAt"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 1.2.搜索按钮  -->
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleResetClick"
        >重置</el-button
      >
      <el-button
        size="large"
        icon="Search"
        type="primary"
        @click="handleQueryClick"
      >
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="page-search">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
// 声明可触发的事件
const emit = defineEmits(['queryClick', 'resetClick'])

// 1.创建表单的数据
const userSearchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})

// 2.监听按钮的点击
const formRef = ref<InstanceType<typeof ElForm>>()
// 当点击重置按钮的时候，触发resetClick事件，父组件中的handleResetClick方法会被调用。
function handleResetClick() {
  // 获取表单实例对象formRef，调用其resetFields方法进行重置，需要注意的是，需要给props添加一个name属性
  formRef.value?.resetFields()
  // emit的第一个参数是事件名，第二个参数是传递的参数。
  // emit的作用是触发父组件中的事件，这里触发的是父组件中的resetClick事件。
  emit('resetClick')
}
function handleQueryClick() {
  emit('queryClick', userSearchForm)
  // console.log(userSearchForm)
}
</script>

<style scoped lang="less">
.search {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;

  .el-form-item {
    padding: 20px 40px;
    margin-bottom: 0;
  }
}

.btns {
  text-align: right;
  padding: 0 50px 10px 0;
}
</style>
