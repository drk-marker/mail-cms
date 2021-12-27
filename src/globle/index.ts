import { App } from 'vue'
import registerElement from './register-element'
import registerProperties from './register-properties'
export function registerApp(app: App): void {
  // 注册element
  registerElement(app)
  // 原型链的设置全局的方法
  registerProperties(app)
}
