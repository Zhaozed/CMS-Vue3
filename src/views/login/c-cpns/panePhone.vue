<template>
  <div class="pane-phone">
    <div class="pane-account">
      <el-form>
        <el-form-item label="手机号" label-width="60px">
          <el-input />
        </el-form-item>
        <el-form-item label="验证码" label-width="60px">
          <el-input />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.pane-phone {
  color: red;
}
</style>
