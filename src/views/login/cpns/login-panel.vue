<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon><avatar /></el-icon>账号登陆
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><iphone /></el-icon>手机登录
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick()"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Avatar, Iphone } from '@element-plus/icons'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    Avatar,
    Iphone,
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 定义属性
    const isKeepPassword = ref(true)
    // 拿到ref对象,LoginAccount是对对象的描述{name:'123'},但并不是类型{name:string},此处要放的事含有构造函数的实例，就通过先取类型再拿实例的方式，<login-account />时才算创建了一个实例，LoginAccount只是导出的对象的描述
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref<string>('account')
    // 定义方法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        // 有可能没传值的情况，所以要加上可选链
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        phoneRef.value?.loginAction()
      }
    }
    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      currentTab,
      phoneRef
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  h1 {
    text-align: center;
  }
  .title {
    text-align: center;
  }
  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
