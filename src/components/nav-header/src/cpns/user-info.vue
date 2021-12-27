<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="small" :src="circleUrl"></el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { useStore } from '@/store'
import localCache from '@/utils/cache'
import router from '@/router'
export default defineComponent({
  setup() {
    const state = reactive({
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    })
    // useStore只能在compositionAPI的setup里面使用
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.push('/main')
    }
    return {
      ...toRefs(state),
      name,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    margin-left: 10px;
  }
}
</style>
