const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackExternals,
  // addWebpackAlias,
  disableEsLint,
  // disableChunk
} = require('customize-cra')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const path = require('path')
// const paths = require('react-scripts/config/paths')
// const resolveAlias = dir => path.join(__dirname, '.', dir)

const appBuildPathFile = () => config => {
  if (config.mode === 'development') {
    console.log('evn is development, skip build path change...')
  } else if (config.mode === 'production') {
    console.log('evn is production, change build path...')
    // 关闭sourceMap
    config.devtool = false
    //  // 配置打包后的文件位置修改path目录
    // paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')
    // config.output.path = path.join(path.dirname(config.output.path), 'dist')
    // 添加js打包gzip配置
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /\.js$|\.css$|\.less$/,
        threshold: 1024
      })
    )
    // 更改生产模式输出的文件名
    // config.output.filename = 'static/js/[name].js?_v=[chunkhash:8]'
    // config.output.chunkFilename = 'static/js/[name].chunk.js?_v=[chunkhash:8]'
  }
  return config
}
//生产环境去除console.* functions
const dropConsole = () => {
  return config => {
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach(minimizer => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true
        }
      })
    }
    return config
  }
}
/**
 *
 * @description 解决打包的时候如下报错
 * @url{https://github.com/ant-design/ant-design/issues/15696}
 * https://blog.csdn.net/peade/article/details/84890399
chunk 3 [mini-css-extract-plugin]
Conflicting order between:
 * css ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./node_modules/antd/es/input/style/index.less
 * css ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./node_modules/antd/es/message/style/index.less
 */
// const delConflictingOrder = () => {
//   return config => {
//     for (let i = 0; i < config.plugins.length; i++) {
//       const p = config.plugins[i]
//       if (!!p.constructor && p.constructor.name === MiniCssExtractPlugin.name) {
//         const miniCssExtractOptions = { ...p.options, ignoreOrder: true }
//         config.plugins[i] = new MiniCssExtractPlugin(miniCssExtractOptions)
//         break
//       }
//     }
//   }
// }
// const rewiredMap = () => config => {
//   config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false

//   return config
// }


module.exports = override(
  //实现antd按需加载
  fixBabelImports('import', { //配置上babel-plugin-import
    libraryName: 'antd', //针对antd
    libraryDirectory: 'es', //源码文件加中的es文件夹
    // style: 'css'//自动打包相关的css
    style: true,
  }),
  addWebpackExternals({
    // react: "React",
    // "react-dom": "ReactDom",
    'Echarts': 'Echarts'
  }),
  disableEsLint(),
  appBuildPathFile(),
  dropConsole(),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@menu-item-color': '#fff',
        '@menu-bg': '#f05d73', //导航栏背景
        '@modal-header-bg': ' #f05d73', //弹窗
        '@modal-header-title-font-size': '20px', //弹窗标题大小
        '@modal-close-color': 'white', //弹窗关闭键颜色
        '@modal-heading-color': 'white', //弹窗标题颜色
        '@pagination-item-bg-active': '#f05d73', //翻页选中时颜色
      },
    },
  }),
)