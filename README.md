# micro-app-example

![img](https://github.com/bouquetrender/micro-frontend-example/assets/16361069/3866bbd1-6ff3-4a1e-97e6-231048375386)

简易微前端逻辑实现，主应用基座负责不同子应用的挂载与销毁，利用 with 和 proxy 处理沙箱。

### 主应用
- index.js 实现缝合层基座逻辑
- app.js 使用 api 创建多个 app 子应用
- sandbox.js 实现沙箱

### 子应用
- 处理 webpack umd 修改
- 入口文件 mount 和 unmout 逻辑实现

