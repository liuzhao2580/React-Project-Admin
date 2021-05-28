## 基于 `React + antd`实现的后台管理系统

## 项目启动 `npm start`

## [`create-react-app`](https://www.html.cn/create-react-app/docs/getting-started/)文档说明

## 服务端的数据在[`server`](https://github.com/liuzhao2580/React-Antd-Admin-Service)

### 改造`react-redux`

- 需要使用到[`immer`](https://github.com/immerjs/immer)第三方组件，用来设置`reducers`为纯函数，使用方法

  ```javascript
  import { produce } from 'immer'
  produce(obj, draft => {})import { produce } from 'immer'
  let obj = {
      a: 100,
      b: 200
  }

  let obj1 = produce(obj, draft => {
      draft.a = 200
  })
  console.log(obj, obj1, 'obj === obj1')
  /*
  	obj {a: 100, b: 200}
  	obj1 {a: 200, b: 200}
  */
  console.log(obj === obj1, 'obj === obj1') // false
  ```

# 使用 `react-app-rewired` 和 [`customize-cra`](https://github.com/arackaf/customize-cra) 对 `webpack`进行配置定义

主要是用的插件`react-app-rewired customize-cra`

1. 安装`yarn add react-app-rewired customize-cra -D`
2. 首先先在`package.json`中配置 把`react-scripts`替换成为`react-app-rewired`
   ```json
   "scripts": {
       "start": "react-scripts start",
       "build": "react-scripts build",
       "test": "react-scripts test",
       "eject": "react-scripts eject"
   }
   ```
   替换成为
   ```json
   "scripts": {
       "start": "react-app-rewired start",
       "build": "react-app-rewired build",
       "test": "react-app-rewired test",
       "eject": "react-scripts eject"
   }
   ```
3. 在项目根目录和`package.json`同级下面新建一个 `config-overrides.js`的文件
   ```js
   const { override } = require('customize-cra')
   const path = require('path')
   module.exports = {
     webpack: override(
     // 设置配置代码
     )
   }
   ```

## 1.`React`使用`@`操作符代表 `src` 目录-从`customize-cra`导入`addWebpackAlias`

```js
const {
  ...
  addWebpackAlias,
  ...
} = require('customize-cra')
module.exports = {
  webpack: override(
    ...
  	// 配置 @
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    })
    ...
  )
}
```

## 2. 按需引入-从`customize-cra`导入`fixBabelImports`

```js
const {
  ...
  fixBabelImports,
  ...
} = require('customize-cra')
module.exports = {
  webpack: override(
    ...
  	// 配置antd 按需引入
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    }),
    ...
  )
}
```

## 3. 导入文件的时候可以不用添加文件的后缀名-从`customize-cra`导入`addWebpackResolve`

例子 `import Personal from './components/Personal.tsx' ` ---> `import Personal from './components/Personal'`

```js
const {
  ...
  addWebpackResolve,
  ...
} = require('customize-cra')
module.exports = {
  webpack: override(
    ...
  	// 导入文件的时候可以不用添加文件的后缀名
    addWebpackResolve({
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
    }),
    ...
  )
}
```

## 4.添加代理处理跨域

```js
const {
  ...
  override,
  overrideDevServer,
  ...
} = require('customize-cra')
module.exports = {
  webpack: override(),
  处理跨域
  devServer: overrideDevServer(config => {
    config.proxy = {
      '/proxy/': {
        target: 'http://127.0.0.1:7001/v1',
        changeOrigin: true,
        pathRewrite: { '^/proxy': '/' }
      }
    }
    return config
  })
}
```

