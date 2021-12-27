<template>
  <div class="pie-chart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, withDefaults } from 'vue'
import BaseEchart from '@/base-ui/echart'
const props = withDefaults(
  defineProps<{
    title?: string
    // x坐标轴展示
    xLabels: string[]
    // x对应的y轴数值
    values: any[]
  }>(),
  {
    title: ''
  }
)
const options = computed(() => {
  return {
    title: {
      text: props.title
    },
    legend: {
      top: 'top'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabels
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      // 离各个方向的距离
      left: '3%',
      right: '4%',
      bottom: '3%',
      // 是否包含文本来计算百分比
      containLabel: true
    },
    series: [
      {
        name: '分别销量',
        data: props.values,
        type: 'line',
        stack: '总量',
        areaStyle: {}
      }
    ]
  }
})
</script>

<style></style>
