// 类具有更强的封装性
class LocalCache {
  setCache(key: string, value: any) {
    // JSON.stringify把其他类型转成字符串类型，localStorage的value要字符串类型
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      // JSON.parse把字符串变成原来的类型
      return JSON.parse(value)
    }
  }
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  clearCache() {
    window.localStorage.clear()
  }
}
export default new LocalCache()
