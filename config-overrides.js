const {
  override,
  fixBabelImports,
  addWebpackAlias,
  overrideDevServer,
  addPostcssPlugins,
  addWebpackResolve,
  adjustStyleLoaders
} = require('customize-cra')
const path = require('path')
module.exports = {
  webpack: override(
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
    // 配置 postcss-pxtorem https://www.npmjs.com/package/postcss-pxtorem
    // addPostcssPlugins([
    //   require('postcss')(),
    //   require('postcss-pxtorem')({
    //     rootValue: 100,
    //     unitPrecision: 5,
    //     propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
    //     selectorBlackList: [],
    //     replace: true,
    //     mediaQuery: false,
    //     minPixelValue: 0,
    //     exclude: /node_modules/i
    //   })
    // ]),
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
    config.proxy = {
      '/proxy/': {
        target: 'http://127.0.0.1:7001/v1/api',
        changeOrigin: true,
        pathRewrite: { '^/proxy': '/' }
      }
    }
    return config
  })
}
