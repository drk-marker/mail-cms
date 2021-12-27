<template>
  <div class="pie-chart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import BaseEchart from '@/base-ui/echart'
import { IDataType } from '../types'
const props = defineProps<{
  pieData: IDataType
}>()
// computed里会手机props里的依赖,防止options里的属性发生变化时达不到响应式
const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      // vertical垂直展示图例,horizontal水平展示图例
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        //   展示的数据请求来的是不固定的,需要从组件传来
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style></style>
