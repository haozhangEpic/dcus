React Router 是以History API为基础

打开了一个新的标签页、然后访问 baidu.com、sougou.com、taobao.com。长按后退按钮，就会列出历史记录，这就是 history。

![640](/tittleTattle/React/images/640.png)

history.length 是 5

![640 (1)](/tittleTattle/React/images/640_1.png)

点击两次后退按钮，或者执行两次 history.back()

![](/tittleTattle/React/images/640.gif)

就会回到这里：

![](/tittleTattle/React/images/640_2.png)

这时候 history.length 依然是 5

![](/tittleTattle/React/images/640_3.png)

因为前后的 history 都还保留着：

![](/tittleTattle/React/images/640_5.png)

![](/tittleTattle/React/images/640_4.png)

除了用 history.back、history.forward 在 history 之间切换外，还可以用 history.go

参数值是 delta：

history.go(0) 是刷新当前页面。

history.go(1) 是前进一个，相当于 history.forward()

history.go(-1) 是后退一个，相当于 history.back()

当然，你还可以 history.go(-2)、histroy.go(3) 这种。

![](/tittleTattle/React/images/640_1.gif)

比如当我执行 history.go(-2) 的时候，能直接从 taobao.com 跳到 sogou.com

![](/tittleTattle/React/images/640_6.png)

你还可以通过 history.replaceState 来替换当前 history：

![](/tittleTattle/React/images/640_7.png)

```js
history.replaceState({aaa:1},'','https://www.baidu.com?wd=光')
```

第一个参数是 state、第二个参数是 title，第三个是替换的 url。

不过第二个参数基本都不支持，state 倒是能拿到。

比如我在 https://www.baidu.com 那页 replaceState 为一个新的 url：

![](/tittleTattle/React/images/640_8.png)

前后 history 都没变，只有当前的变了：

![](/tittleTattle/React/images/640_2.gif)

也就是这样：

![](/tittleTattle/React/images/640_9.png)