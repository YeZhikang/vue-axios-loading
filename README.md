# axios-vue-loading
一个结合视图与进度条的异步、自动化请求发起插件

## 使用方法
### 绑定Vue对象原型
```javascript
// src/main.js
import Vue from 'vue'
import send from 'axios-vue-loading'
Vue.prototype.$send = send
```
### 在组件中调用
在组件中主要通过`send`方法进行调用。

`send`方法需要传入一个对象，用来**发起请求**、**定制`进度`样式**。

**axios-vue-loading** 目前支持两种进度展示：进度条（loading-bar）和局部遮罩（loading-container），可以通过
`send` 方法的参数传递来进行选择是否保留。

```vue
<script>
export default {
    methods: {
        async handleSend(){
            const response = await this.$send({
                url: 'http://www.api.com',  // 请求 url
                method: 'get',              // 请求方式（如果没有写，则默认为 get ）
                barShow: true,              // 是否显示进度条
                containerShow: true,        // 是否显示遮罩
                config: {                   // axios 配置项目（参考 axios）
                    'content-type': 'application/javascript',
                    'timeout': 30000,       // 超时请求时间（如果没有设置，则默认为30000秒）
                },
                targetDom: '.admin-table',  // 需要渲染接收的 ajax 数据的 dom 元素（支持传入 HTMLElement 类型或 string 类型）        
            })
            console.log(response)
        }   
    }
}
</script>
```

在请求的过程中，进度条和遮罩出现，请求结束，进度条和遮罩消失。

### 定制化 axios
在实际的业务中，经常会涉及到对`axios`进行定制化、对 `axios` 进行 `request` 和 `response` 拦截和过滤等操作。

目前阶段（2020-04-24）暂时不支持原生的拦截等方法的实现，但`$send`方法原生可以通过抓取用户自行暴露的 `window.server` 来完成拦截的效果

```javascript
// utils/axios.js 定制化 axios 的文件
import axios from 'axios'

axios.interceptors.request.use( config => {
    // ...
} )

axios.interceptors.response.use( config => {
    // ...
} )

export default axios
```
```javascript
// 主入口 main.js
import Vue from 'vue'
import axios from 'utils/axios'
import send from 'axios-vue-loading'

window.server = axios
Vue.prototype.$send = send
```

```vue
<script>
// 某个组件中
export default {
    // ...
    methods: {
        handleSend(){
            this.$send({ /* 路由、请求方法等信息 */ })    
        }       
    }
}
</script>
```
这样，就能用`$send`方法实现相关需求

## 近期任务
[1] loading 的样式定制化

[2] loading 种类增加、性能优化
