const {
  override,
  fixBabelImports,
  addWebpackAlias,
  overrideDevServer,
  addPostcssPlugins,
} = require("customize-cra")
const path = require("path")
module.exports = {
  webpack: override(
    // 配置antd 按需引入
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: "css",
    }),
    // 配置 @
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
    }),
    // 配置 postcss-pxtorem https://www.npmjs.com/package/postcss-pxtorem
    addPostcssPlugins([
      require("postcss")(),
      require("postcss-pxtorem")({
        rootValue: 100,
        unitPrecision: 5,
        propList: ["font", "font-size", "line-height", "letter-spacing"],
        selectorBlackList: [],
        replace: true,
        mediaQuery: false,
        minPixelValue: 0,
        exclude: /node_modules/i,
      }),
    ]),
  ),
  devServer: overrideDevServer(config => {
    config.proxy = {
      "/proxy/": {
        target: "http://127.0.0.1:7001/v1",
        changeOrigin: true,
        pathRewrite: { "^/proxy": "/" },
      },
    }
    return config
  }),
}
