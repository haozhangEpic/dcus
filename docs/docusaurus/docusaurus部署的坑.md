# baseUrl

如果项目访问路径不是/结尾的，需要在docusaurus.config.js文件中配置baseUrl为路由路径，不然在打包完以后文件引用路径会出现问题，如果不知道该写什么，就先部署，然后在运行时会有建议baseUrl配置什么

* * *

```javascript
module.exports = {
  baseUrl: '/',
};
```