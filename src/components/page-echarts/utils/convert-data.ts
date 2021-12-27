// 导入全国各地的经纬度
import { coordinateData } from './coordinate-data'
// 传入data,最后value的值应该是[经纬度,数据值]的样式
export const convertData = function (data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    //   获取指定城市的经纬度
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        // 把经纬度和数据拼接
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}
