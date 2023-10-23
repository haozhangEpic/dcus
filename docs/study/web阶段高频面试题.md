---
sidebar_position: 4
---

## 1、前端页面有哪三层构成，分别是什么？作用是什么？

```CSS
1、结构层：由 HTML 标记语言负责创建，仅负责语义的表达。解决了页面“内容是什么”的问题。

2、样式层：由CSS负责创建，解决了页面“如何显示内容”的问题。

3、行为层：由脚本（js）负责。解决了页面上“内容应该如何对事件作出反应”的问题
```

## 2、主流的浏览器分别是什么内核？

```CSS
Trident[ˈtraɪdnt]内核：（国产的绝大部分浏览器）IE，360，搜狗

Gecko[ˈɡekoʊ]内核：火狐\3
 [\787\p b,.0
 ]

Presto[ˈprestoʊ]内核：Opera7[ˈɑːprə]
及以上（欧朋）

Webkit内核：（国产大部分双核浏览器其中一核）Safari[səˈfɑːri]
（苹果），Chrome[kroʊm]
```

## 3、flex的基本使用?

```css
  1 弹性盒子组成
/* 弹性容器 */
display:flex;
 /* 主轴 */
justify-content
/* 侧轴*/
align-items
/* 改变主轴方向 */
flex-direction

2 主轴对齐方式
 /* 默认值 左上角开始 */
  justify-content: flex-start; 

 /* 右上角开始 */
  justify-content: flex-end;

 /* 水平居中对齐 重要*/ 
假似滴饭  扛腾得  森特
  justify-content: center; 

  /* 间距在子盒子的两侧 */
   justify-content: space-around; 

   /* 两端对齐 空间在子盒子之间 重要*/
					斯呗s -笔退
   justify-content: space-between; 

   /* 盒子的所有间距都相等 */
   justify-content: space-evenly;

 3 侧轴对齐方式
  /* 顶部对齐 */
  align-items: flex-start; 

   /* 底部对齐 */
    align-items: flex-end; 

   /* 垂直居中对齐 重点*/
	昂赖 爱腾闷s 
    align-items: center; 

   /*默认值 顶部对齐 当子盒子没有高度时  会将子盒子拉伸充满整个容器 */
     align-items: stretch;

4 改变主轴方向
  /* 改变主轴方向  默认是水平 从左到右排列  */
       flex-direction: row; 

        /* 垂直方向 从上向下  重点*/
  			度瑞可申    扛楞
        flex-direction: column;

        /* 水平排列  从右向左 */
         flex-direction: row-reverse; 

        /* 垂直方向  从下向上 */
         flex-direction: column-reverse; 
```

## 4、行内元素有哪些？块级元素有哪些？空元素（void）有哪些？

```css
1、行内元素：a，b，span，strong，button，，em

2、块级元素：div，ul（无序列表），ol，li，dl（自定义列表），dt（自定义列表项），dd（自定义列表项的定义），p，h1-h6

3、行内块元素：img，input

4、空元素（void）：即没有内容的HTML元素。br（换行），hr（水平分割线），meta，link，input，img

```

## 5、BFC（Block Formatting Context，块级格式化上下文）

```css
1、是什么：决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。简言之，就是一个特殊的块，内部的元素和外部的元素不会相互影响。BFC内的盒子会在垂直方向上一个接一个地放置，垂直方向上也会发生外边距重叠。

2、应用场景：自适应布局（BFC不与float box重叠）、清除浮动（计算BFC的高度时，内部的浮动元素也被计算在内）、防止外边距重叠

3、如何触发BFC：float属性（不为none）、overflow属性（不为visible）、position属性（absolute，fixed）、display属性（inline-block，table-cell，table-caption，flex，inline-flex）

```

## 6、CSS选择器的优先级

```css
!important > 行内样式 > ID选择器 > 类选择器 > 标签 > 通配符 > 继承 
```

## 7、初始化CSS样式的意义

```css
1、为什么要初始化CSS样式：因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没有对CSS初始化往往会出现浏览器之间的页面显示差异。
```

## 8、HTML5新特性

```css
1. 语义化标签: header nav section article aside footer
2. 多媒体标签: video audio
3. input类型: number search email tel date file time  url
4. 本地离线存储 localStorage 长期存储数据,改变浏览器数据不会丢失
			  sessionStorage 浏览器关闭数据会丢失
5. 自定义属性 data-*
6. 画布 Canvas
7. webscoket 双向通信协议
```

## 9、CSS3新特性

```css
1. 圆角 border-radius
2. 盒子模型 box-sizing
3. 阴影 box-shadow 盒子阴影  text-shadow 文字阴影
4. 过渡 transition
5. 2D转换transform  translate(平移) scale(缩放)  skew(斜切) rotate(旋转) transform-origin 控制转换中心点
6. 3D转换 perspective(透视距)  transform-style(3D控件效果)
7. 渐变 linear-gradient radial-gradient
8. 弹性布局 flex
9. 媒体查询 @media screen and () {...}
10. 边框图片 border-image
11. 自定义动画 @keyframes    animation
12. 颜色 新增RGBA HSLA模式
13. 背景 background-size   background-origin   background-clip
```

## 10、**对HTML语义化的理解**

```css
1、用正确的标签做正确的事情

2、HTML语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析

3、即使在没有样式CSS情况下也以一种文档格式显示，并且是易于阅读的

4、搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO

5、使阅读源代码的人更容易将网站分块，便于阅读维护理解
```

## 11、CSS的盒子模型

```css
1、有两种， IE 盒子模型、W3C 盒子模型；
2、盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；
3、区 别： IE的content部分把 border 和 padding计算了进去;
```

## 12、如何居中div

```css
 1、 水平居中：给div设置一个宽度，然后添加margin:0 auto属性
 
        div {
             width:200px;
             margin:0 auto;
			}
 2、让绝对定位的div居中  "破C省 ：阿坡似咯似
 
        div {
             position: absolute;
             width: 300px;
             height: 300px;
             margin: auto;
             top: 0;
             left: 0;
             bottom: 0;
             right: 0;
             background-color: pink; 
			} 
 3、水平垂直居中一
 
        确定容器的宽高 宽500 高 300 的层
        设置层的外边距
 
        div { 		"破C省 ：瑞呢腾
             position: relative;        /* 相对定位或绝对定位均可 */
             width:500px;
             height:300px;
             top: 50%;
             left: 50%;
             margin: -150px 0 0 -250px;         /* 外边距为自身宽高的一半 */
             background-color: pink;         /* 方便看效果 */
          }
 4、水平垂直居中二
 
        未知容器的宽高，利用 `transform` 属性  "船似form
 
        div {
            position: absolute;        /* 相对定位或绝对定位均可 */
            width:500px;
            height:300px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: pink;         /* 方便看效果 */
 
        }

 5、水平垂直居中三
 
        利用 flex 布局
        实际使用时应考虑兼容性
 
        .container {
            display: flex;
            align-items: center;         /* 垂直居中 */
            justify-content: center;    /* 水平居中 */
 
             }
        .container div {
            width: 100px;
            height: 100px;
            background-color: pink;        /* 方便看效果 */
        }  

```

## 13、什么是重绘和重排

```javascript
1、重排: 当DOM元素影响了元素的几何属性（例如宽和高），浏览器需要重新计算元素的几何属性，同样其它元素的几何属性也会和位置也会因此受到影响。浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树。这个过程称为“重排”。 

白话:`当DOM元素影响了元素的宽和高时,浏览器需要重新计算,同样其它元素的宽高和位置也会受到影响。当给DOM元素改变颜色的时候,会导致重绘。重绘不会重排,重排一定会重绘,重排会影响性能，所以我们尽快能的减少重排的操作`

2、: 部分到屏幕上中，该过程称为“重绘”。
	
	当我们改变DOM的大小，增加删除都会导致重排，当给DOM元素改变颜色的时候，会导致重绘，重排一定会重绘，重绘不会重排。重排会影响性能，所以我们尽快能的减少重排的操作
```

## 14、**px/em/rem有什么区别**

```css
1、px 是固定的像素，一旦设置了就无法因为适应页面大小而改变
2、em 和rem相对于px更具有灵活性，他们是相对长度单位，意思是长度不是定死了的，更适用于响应式布局
3、em 相对自身font-size，没有则相对于父元素，rem相对于根元素的font-size
```

## 15、rem布局的原理

```css
1、rem 是css的相对单位，rem缩放是相对根元素字体大小.
2、rem 布局的本质是等比缩放，一般是基于宽度。
3、rem 会配合媒体查询（或js动态获取屏幕宽度）来一起使用，来实现屏幕的适配。
```

还有个那些单位?

```
vw-vh  移动端开发单位  了解 vmin vmax
rpx 小程序单位
```



## 16、怎么用CSS画一个三角形

```css
.box {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 50px solid transparent;
    border-bottom: 100px solid red;
}
```

## 17、使元素消失的方法有哪些

```css
1、opacity：0，该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定 一些事件，如 click 事件，那么点击该区域，也能触发点击事件的  "哦帕涩提
2、visibility：hidden，该元素隐藏起来了，但不会改变页面布局，还占据位置  "味子背类挺 : 嘿瞪
3、display：none，把元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元素删除掉，不占位置。
```

## 18、多行元素的文本省略号

```css
.box {
   white-space: nowrap;  
   overflow: hidden;
   text-overflow: ellipsis; 
}
```

## 19、rgba() 和 opacity 的透明效果有什么不同？

```css
1、opacity 作用于元素，以及元素内的所有内容的透明度，rgba()只作用于元素的颜色或其背景色
2、设置rgba透明的元素的子元素不会继承透明效果
```

## 20、如何设置比12px还要小的字体

```css
p {
   font-size:12px;
   transform:scale(0.8);
 }
```

















#### 





