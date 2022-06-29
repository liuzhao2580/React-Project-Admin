/* eslint-disable @typescript-eslint/no-var-requires */
const {
  override,
  fixBabelImports,
  addWebpackAlias,
  overrideDevServer,
  addWebpackResolve,
  adjustStyleLoaders,
  setWebpackPublicPath
} = require('customize-cra')
const path = require('path')
const baseSetting = require(__dirname + '/src/setting')

/** 处理打包的环境 */
function handleBuild () {
  let handle = []
  if(process.env.NODE_ENV !== 'development') {
    handle.push(setWebpackPublicPath(baseSetting.basePath))
  }
  return handle
}

module.exports = {
  webpack: override(
    // 设置打包后的文件路径
    ...handleBuild(),
    // 配置antd 按需引入
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }),
    // 配置 @
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    }),
    // 导入文件的时候可以不用设置文件的后缀名
    addWebpackResolve({
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
    }),
    // 配置 scss 全局的变量
    adjustStyleLoaders(({ use, test }) => {
      if (test.toString().includes('scss')) {
        use.push({
          loader: require.resolve('sass-resources-loader'),
          options: {
            //这里是你自己放公共scss变量的路径
            resources: path.resolve('src/assets/styles/variables.scss')
          }
        })
      }
    })
  ),
  devServer: overrideDevServer(config => {
    // config.proxy = {
    //   '/api': {
    //     target: 'http://127.0.0.1:2580',
    //     changeOrigin: true,
    //     pathRewrite: { '^/api': '/' }
    //   }
    // }
    return config
  })
}
