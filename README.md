# ContentSale
内容销售系统
采用前后端分离的模式
前端采用react+antDesign
后端采用springBoot
## front-end文件夹内的是前端代码
### 前端初始化项目过程(要安装node)
1. npm升级到最新版本 
```
$ npm install -g npm
```
2. 在国内，你可以安装 cnpm 获得更快速、更安全的包管理体验。使用如下命令安装：
```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```
3. 安装前端代码依赖的包，由于网络原因，安装依赖经常会出错，此时只需要删除node_modules文件夹，重新执行安装依赖命令即可
```
$ cnpm install
```
4. 编译并运行前端项目
```
$ cnpm run dev
```
### 前端配置跨域请求后端接口
配置代理也很简单，只需要您在配置文件 config/config.js 中与 routes 同级处增加 proxy 字段，代码如下，
```
routes: [
   // ...
   ],

+  proxy: {
+    '/dev': {
+      target: 'https://*****.com',
+      changeOrigin: true,
+    },
+  },
```
配置的含义是：去往本地服务器 localhost:8000 的 ajax 调用中，如果是以 /dev 开头的，那么就转发到远端的 https://*****.com 服务器当中，/dev 也会保留在转发地址中。

比如：
/dev/random_joke 就会被转发到 https://*****.com/dev/random_joke。

## content-sale文件夹内的是后端代码
