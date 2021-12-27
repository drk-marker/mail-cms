<template>
  <div class="dashboard">
    <div ref="divRef" :style="{ width: '600px', height: '500px' }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
// 1.安装echarts，2.导入
import * as echarts from 'echarts'
export default defineComponent({
  name: 'dashboard',
  setup() {
    // 初始化echarts实例
    const divRef = ref<HTMLElement>()
    onMounted(() => {
      // 直接setup里写有可能模版还没编译出来,init,第一个是绑定元素，第二个参数是主题
      // 第三个参数选择用什么技术进行渲染，般来说，Canvas更适合绘制图形元素数量非常大(这一般是由数据量大导致）的图表（如热力图、地理坐标系或平行坐标系上的大规模线图或散点图等），也利于实现某些视觉特效;
      // 但是，在不少场景中，SVG具有重要的优势:它的内存占用更低（这对移动端尤其重要)、渲染性能略高、并且用户使用浏览器内置的缩放功能时不会模糊;
      const echartInstance = echarts.init(divRef.value!, 'dark', {
        renderer: 'svg'
      })
      // 2.指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例',
          // 小标题
          subtext: '哈哈哈'
        },
        // 鼠标放在图像上触发，item适用于一个个小点的散点图，axis是显示线
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // axis显示线的样式
            type: 'cross'
          }
        },
        // 图例，点击可显示或消失图例，不写的话会从series里去找
        legend: {
          data: ['销量']
        },
        // 多个x轴就用数组，y轴也一样，但y轴最多设置两个
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        // yAxis可以不写，y轴刻度可以根据series的data数据自己判断
        yAxis: {},
        series: [
          {
            name: '销量',
            // 图形类型
            type: 'bar',
            // 对应的xAxis的data里的每个值
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
      // 3.设置配置并开始绘制
      echartInstance.setOption(option)
    })
    return {
      divRef
    }
  }
})
</script>

<style scoped></style>
