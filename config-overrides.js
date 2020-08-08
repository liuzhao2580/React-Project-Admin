const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')
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
        })
    )
}
