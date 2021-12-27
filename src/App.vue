<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 这里的element组件是对英文内容进行汉化，虽然复制的是英文但是在该组件包裹的情况下，自动进行汉化
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// element局部引用
// import 'element-plus/es/components/button/style/css'
// js只是导出一个对象，ts用defineComponent包裹着对象导出，好处是可以对值做更多的类型推导，保证安全性
export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
  },
  setup() {
    return {
      locale: zhCn
    }
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
