<template>
  <div class="nav-header">
    <el-icon class="fold" v-if="!isFold" @click="handleFold">
      <folder-opened />
    </el-icon>
    <el-icon class="fold" v-else @click="handleFold">
      <folder />
    </el-icon>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs"></hy-breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { FolderOpened, Folder } from '@element-plus/icons'
import UserInfo from './cpns/user-info.vue'
import HyBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
export default defineComponent({
  emits: ['foldChange'],
  components: {
    FolderOpened,
    Folder,
    UserInfo,
    HyBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFold = () => {
      isFold.value = !isFold.value
      // 点击折叠和张开同时也把isFold这个值传给nav-menu,采用的方式就是先传给父组件main.vue然后再传给nav-main
      // 这样的好处就是不仅nav-menu里的menu宽度需要控制，main.vue里的menu也需要控制
      emit('foldChange', isFold.value)
    }
    // 面包屑数据
    const store = useStore()
    // 用计算属性可以使其路径发生改变或者userMenus发生改变时候对breadcrumbs更改
    // 计算属性如果对某个属性有依赖，当某个属性发生改变的时候会进行重新计算
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      handleFold,
      isFold,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 60px 0 30px;
  }
}
</style>
