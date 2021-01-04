const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
    fixBabelImports('import', {//配置上babel-plugin-import
        libraryName: 'antd',//针对antd
        libraryDirectory: 'es',//源码文件加中的es文件夹
        // style: 'css'//自动打包相关的css
        style: true,
    }),
    addLessLoader({
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: { 
                        '@menu-item-color':'#fff',
                        '@menu-bg': '#f05d73',//导航栏背景
                        '@modal-header-bg':' #f05d73',//弹窗
                        '@modal-header-title-font-size':'20px',//弹窗标题大小
                        '@modal-close-color':'white',//弹窗关闭键颜色
                        '@modal-heading-color':'white',//弹窗标题颜色
                        '@pagination-item-bg-active':'#f05d73',//翻页选中时颜色
                         },
        },
      }),
)
