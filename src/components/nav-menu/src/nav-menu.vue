<template>
  <div class="nav-menu">
    <div class="logo">
      <!-- 在template里使用别名先加一个~ -->
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-if="!collapse">vue3+ts</span>
    </div>
    <!-- el-menu是整个菜单，el-sub-menu是可以展开的包含子菜单的，el-menu-item-group不能选择的
     el-menu-item可以选中，不能展开-->
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <!-- vue3中template上可以加key了  -->
      <template v-for="item in userMenus" :key="item.id">
        <!-- type为1时可以展开 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单，菜单有两级 -->
          <!-- :index="item.id+ ''",因为要记录展开和选中所以每个sub-menu和menu-item都要有自己的唯一标识
          index要绑字符串类型-->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon class="icon"><avatar /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <el-icon><location /></el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单，只有一级 -->
        <!-- 不为1时是可以点击切换的按钮 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id">
            <!-- 有item.icon的时候才显示 -->
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { Avatar, Location } from '@element-plus/icons'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Avatar,
    Location
  },
  setup() {
    const store = useStore()
    // 如果用vuex里根的useStore,store.state后面只能跟IRootState类型里的值，所以要定义一个也可以
    // store.state后面跟模块的一个类型,也就是对store里的state做了一个类型限制
    // store.state.login.userMenus比较长，所以放在计算属性里
    const userMenus = computed(() => store.state.login.userMenus)
    const router = useRouter()
    const route = useRoute()
    // 拿到当前路径，然后去和userMenu里面menu.url去匹配
    const currentPath = route.path
    // computed拿到的是ref对象
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const defaultValue = ref(menu.id + '')
    const handleMenuItemClick = (item: any) => {
      router.push({ path: item.url ?? '/not-found' })
    }
    return {
      userMenus,
      handleMenuItemClick,
      defaultValue
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
  }
  // 二级菜单 ( 默认背景 )
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135 !important;
  }
  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical {
  border: 0;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
