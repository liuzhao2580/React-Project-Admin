const {
  override,
  fixBabelImports,
  addWebpackAlias,
  overrideDevServer,
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
