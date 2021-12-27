// config里放的是一般不会用到响应式的写死的静态文件
// hooks里放的一般用到reactive/ref/useState/onMounted的响应式数据
export const rules = {
  name: [
    {
      required: true,
      message: '请输入账号！！！',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '账号要5-10个字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码！！！',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '密码要5-10位',
      trigger: 'blur'
    }
  ]
}
