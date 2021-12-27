// 这些是在node的环境下，node支持commonJS导出方式
// ESlint不希望用require引入，但是我们确定要这么做，就把鼠标放上去，复制eslint括号里面的内容，放在eslintrc.js里用off关掉
const path = require('path')
module.exports = {
  // （配置别名）
  // 1.配置方式一：vue-cli提供的属性
  outputDir: './build',
  // 此处publicPath是修改打包后文件路径的
  // publicPath: './',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000/',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  // 2.配置方式二：和webpack属性配置完全一样，最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        // 默认webpack配置别名@就是src
        components: '@/component'
      }
    }
  }
  // config是之前的配置
  // configureWebpack: (config) => {
  //   // 修改的话是完全覆盖，原来webpack里自己定义的@也需要重新配置
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
  // 3.配置方式三：链式配置
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
}
