const path = require('path')

function resolve(p) {
  return path.resolve(__dirname, p)
}

// 判断当前环境
const isDev = process.env.NODE_ENV === 'development'

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  // 部署应用打包时的基本路径
  publicPath: isDev ? '/' : '/vue-cars-web',
  // 构建输出目录
  outputDir: 'dist',
  // 放置生成静态资源文件的目录
  assetsDir: 'static',
  // weppack配置对最终会被webpack-merge合并到配置项中
  configureWebpack: {
    resolve: {
      // 设置常用的路径别名
      alias: {
        root: resolve(''),
        '@': resolve('./src'),
        config: resolve('./config'),
        api: resolve('./src/api'),
        assets: resolve('./src/assets'),
        comps: resolve('./src/components'),
        directives: resolve('./src/directives'),
        layouts: resolve('./src/layouts'),
        plugins: resolve('./src/plugins'),
        router: resolve('./src/router'),
        store: resolve('./src/store'),
        styles: resolve('./src/styles'),
        utils: resolve('./src/utils'),
        views: resolve('./src/views')
      }
    }
  },
  css: {}
}
