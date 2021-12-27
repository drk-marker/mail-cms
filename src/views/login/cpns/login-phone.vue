<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="phone"
      label-width="60px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-row :gutter="6">
          <el-col :span="12">
            <el-input v-model="phone.code"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = () => {
      console.log('登陆')
    }
    return {
      phone,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped></style>
