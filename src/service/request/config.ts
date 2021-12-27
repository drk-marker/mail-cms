// 1.全部写，通过注释的方法切换不同环境。不推荐，打包时忘记改了，在错误的环境里可能会有错
// const BASE_URL = 'http://coderwhy.org/dev'
// const BASE_NAME = 'coder1'

// const BASE_URL = 'http://coderwhy.org/prod'
// const BASE_NAME = 'coder2'

// const BASE_URL = 'http://coderwhy.org/test'
// const BASE_NAME = 'coder3'

// 2.根据process.env.NODE_ENV,会根据不同的状态拿到不同的值，
// process.env.NODE_ENV在开发环境就是develop,在生产环境就是production,在测试环境就是test
// ES6导出变量的时候应在定义的时候用let,然后再export{}导出
let BASE_URL = ''
const TIME_OUT = 10000

// console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
  // BASE_URL = 'http://123.207.32.32:8000/'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy.org/prod'
} else {
  BASE_URL = 'http://coderwhy.org/test'
}
export { BASE_URL, TIME_OUT }

//3.vue-cli支持的方式,直接在src里创建.env.(环境)文件，里面的数据会自动加到代码里
// 且只能在文件里注入固定内容，如果想自己定义前面先写VUE_APP_随便写
