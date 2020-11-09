## 基于 `React + antd`实现的后台管理系统

## 项目启动 `npm start`

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

    

