const path = require('path')
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// lodash按需加载插件
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
// webpack开启gzip压缩插件
// const CompressionWebpackPlugin = require('compression-webpack-plugin')

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
  publicPath: isDev ? '/' : '/vue-cars-web/',
  // 构建输出目录
  outputDir: 'dist',
  // 放置生成静态资源文件的目录
  assetsDir: 'static',
  // 是否在开发环境下每次保存lint代码
  lintOnSave: process.env.NODE_ENV === 'development',
  // 生产环境的 source map
  productionSourceMap: false,
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
  chainWebpack: (config) => {
    // 移除prefetch插件 避免页面多时加载许多无意思的请求
    config.plugins.delete('prefetch')

    // webpack插件打包分析
    config.when(!isDev, (cfg) => {
      cfg.plugin('webpack-bundle-analyzer').use(bundleAnalyzerPlugin)
    })

    // 添加lodash按需加载插件
    config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin())

    // 排除icons目录下的svg用svg loader处理
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()

    // 使用svg-sprite-loader处理icons目录下的svg做svg雪碧图
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 开启gzip压缩代码
    // config.plugin('compression-webpack-plugin').use(
    //   new CompressionWebpackPlugin({
    //     algorithm: 'gzip', // 压缩算法
    //     threshold: 0, // 大于8192字节才开启gzip
    //     minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
    //     deleteOriginalAssets: false // 删除原文件
    //   })
    // )

    // 公共代码抽离
    // eslint-disable-next-line
    config.when(!isDev, (cfg) => {
      cfg.optimization.splitChunks({
        cacheGroups: {
          chunks: 'all',
          // 公用模块抽离
          common: {
            name: 'common',
            priority: 0,
            minSize: 0, // 大于0字节才会被打包
            minChunks: 2 // 对于公共模块分割代码，引入2次就该单独打包
          },
          // 第三方模块抽离
          vendors: {
            name: 'verdors',
            minSize: 0,
            priority: 1, // 权重
            // 匹配规则
            test: /[\\/]node_modules[\\/]/,
            minChunks: 1 // 对于第三方模块引用1次就该单独打包
          }
        }
      })
    })
    config.optimization.runtimeChunk('single')
  },
  css: {
    // requireModuleExtension: true, // 这个选项好像被废除了 先不管，不知哪里有问题
    extract: !isDev, // 使用css分离插件将css分离到单独的css文件中
    sourceMap: isDev, // 启用css源码映射
    loaderOptions: {
      css: {
        // 这里的选项会传递给css-loader
        // modules: {
        //   localIdentName: '[name]-[hash:8]', // 自定义生成的css modules模块类名
        //   exportLocalsConvention: 'camelCaseOnly' // 将css modules导出的类名转为小驼峰式的
        // }
      },
      scss: {
        // 对scss 进行单独处理
        additionalData: `@import "~@/styles/index.scss";`
      }
    }
  },
  // webpack-dev-serve开发服务器配置项
  devServer: {
    inline: true, // 代码保存时是否刷新页面
    hot: true, // 代码保存时是否热更新
    open: true, // 启动后自动打开浏览器
    host: '127.0.0.1', // 主机ip
    port: 9000, // 端口,
    https: false, // 是否启用https
    compress: true, // 对devServer 所有服务启用 gzip 压缩。
    // 开发代理 一般会代理后台接口
    proxy: {
      '^/api': {
        target: 'http://visonwu.top/api', // 代理的服务器
        ws: true, // 是否代理websocket
        secure: false, // 是否使用https协议
        changeOrigin: true, // 是否允许跨域
        // 路径重写
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
