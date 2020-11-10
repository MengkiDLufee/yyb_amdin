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
          modifyVars: { '@primary-color':'#fff',
                        '@menu-item-color':'#fff',
                        '@menu-bg': '#f05d73',
                         },
        },
      }),
)
