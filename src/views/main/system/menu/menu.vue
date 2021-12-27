<template>
  <div class="menu">
    <page-content
      :contentTableConfig="contentTableConfig"
      PageName="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content/index'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  name: 'hy-menu',
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
