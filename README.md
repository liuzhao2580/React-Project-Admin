## 基于 `React + antd`实现的后台管理系统

## 项目启动 `npm start`

## [`create-react-app`](https://www.html.cn/create-react-app/docs/getting-started/)文档说明

## 服务端的数据在[`server`](https://github.com/liuzhao2580/React-Antd-Admin-Service)

### 1. 改造`react-redux`

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

### 2. 在脚手架的基础上添加`typescript`[中文地址](http://www.html.cn/create-react-app/docs/adding-typescript/) [英文地址]([Adding TypeScript | Create React App (create-react-app.dev)](https://create-react-app.dev/docs/adding-typescript/))

`yarn add typescript @types/node @types/react @types/react-dom @types/jest`

会出现这么一句话，但是生成的配置文件会出现 **每次运行项目，会重置`tsconfig.json`的所有配置**

> 你不需要制作 [`tsconfig.json` 文件](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)，我们将为你制作一个文件。 你可以编辑生成的 TypeScript 配置。

如果需要配置其他的选项，**可以在根目录下面创建一个`my-tsconfig.json`的文件**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

再到`tsconfig.json`中`"extends": "./my-tsconfig.json"`继承

```json
...
"include": ["src/**/*"],
"exclude": ["node_modules", "**/*.spec.ts"],
"extends": "./my-tsconfig.json"
...
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
     webpack:
       override()
       // 设置配置代码
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

## 5.导入`scss`的全局变量[`adjustStyleLoaders`](https://github.com/arackaf/customize-cra/blob/HEAD/api.md#adjustStyleLoaders)

首先安装`yarn add sass-resources-loader -D`

```js
const {
  ...
  adjustStyleLoaders,
  ...
} = require('customize-cra')
const path = require("path")
module.exports = {
  webpack: override(
  ...
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
  ...
  ),
}
```



# 对于`TS`的使用配置

## `useRef`（在给`useRef`声明类型的时候，`html`标签是什么就声明该类型）

```tsx
import React, { useRef } from 'react'
export default ()=> {
  const inputValueRef = useRef<Input>(null)
  return (
  	<div>
      <Input
        placeholder="输入些什么"
        ref={inputValueRef}
        style={{ width: '200px', marginRight: '10px' }}
        />
    </div>
  )
}
```

