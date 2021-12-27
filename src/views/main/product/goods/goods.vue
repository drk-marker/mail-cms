<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" PageName="goods">
      <!-- 这种属于goods特有的，page-content里放的都是公共插槽，现在其实是四层封装
      goods-pagecontent-hytable-tableitem,要把goods里的插槽传给hytable里的插槽，采用在
      pagecontent里设置动态插槽的方法 -->
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
      <template #oldPrice="scope">
        {{ '￥' + scope.row.oldPrice }}
      </template>
      <template #status="scope">
        <el-button
          size="mini"
          :type="scope.row.status ? 'success' : 'danger'"
          plain
          >{{ scope.row.status ? '启用' : '禁用' }}</el-button
        >
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  name: 'goods',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
