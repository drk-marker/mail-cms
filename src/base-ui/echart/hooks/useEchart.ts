import * as echarts from 'echarts'

// ts中不识别json文件,要先在.d.ts文件声明declare module '*.js'
import ChinaMapData from '../data/china.json'
// 注册中国地图
echarts.registerMap('china', ChinaMapData)

// 把echarts的init和setoption的逻辑再抽离出来,以防以后换框架的时候封装组件base-echart
// 和echart过高的耦合度,而且这段逻辑可能其他地方也会用到,所以抽离到这个hooks里面
export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  // 除了浏览器发生变化如果其他发生变化想改变echart实例大小时,可以直接调用这个函数
  // 所以把这个方法抽离出来
  const updateSize = () => {
    echartInstance.resize()
  }
  //   监听浏览器宽度的变化,对echart这个实例进行重绘
  window.addEventListener('resize', () => {
    // echartInstance.resize()
    updateSize()
  })
  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
