<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '@/base-ui/echart/hooks/useEchart'
// 想要给props里的值默认值,withDefaults
const props = withDefaults(
  // 在setup中如何去定义props
  defineProps<{
    options: EChartsOption
    // ts中的类型写法
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)
  // watch 能够获取到新值与旧值（更新前的值），而 watchEffect 是拿不到的。
  // watchEffect 在组件初始化的时候就会执行一次用以收集依赖，收集到的依赖发生变化时再执行。而 watch 则是直接指定依赖项。

  // 如果props.options发生变化,直接执行setOptions(props.options)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
