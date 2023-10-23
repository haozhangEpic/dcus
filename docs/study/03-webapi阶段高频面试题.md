## 1、localStorage、sessionStorage和cookie的区别

```css
答: 共同点: 都是可以用来存储数据
	区别: 
	1. 请求不同: 
		cookie 数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。
				sessionStorage 和 localStorage不会自动把数据发给服务器，仅在本地保存。
	2. 存储大小限制也不同: 
		cookie 数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。
		sessionStorage 和 localStorage虽然也有存储大小的限制，但比cookie大得多，sessionStorage约5M、localStorage约5M 。
	3. 数据有效期不同:
		 localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；
		 sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持； 
		 cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。 
```

## 2、什么是事件代理（事件委托）

```js
1、事件代理（事件委托），是JavaScript中绑定事件的常用技巧。顾名思义，“事件代理”，就是把原本需要绑定的事件委托给父元素，让父元素负责事件监听。事件代理的原理是DOM元素的事件冒泡

事件委托的好处：
减少事件数量，提高性能

使用场景：
1、动态创建的元素
2、大量的子元素需要注册事件
```

## 3、什么是事件流

```js
事件流是指从页面接收事件的顺序。也就是说，当一个事件发生时，这个事件的传播过程就是事件流。
事件流一般包含三个阶段：捕获  目标  冒泡  捕获是从外而内 冒泡从内而外的进行传播
```

###4、js的运行机制是什么

```
答：js是单线程执行的，页面加载时，会自上而下执行主线程上的同步任务，当主线程代码执行完毕时，才开始执行在任务队列中的异步任务。具体如下  
    1.所有同步任务都在主线程上执行，形成一个执行栈。
    2.主线程之外，还存在一个"任务队列(eventloop队列或者消息队列)"。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
    3.一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。哪些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
    4.主线程不断重复上面的第三步。
```

## 5、异步函数有哪些

```css
JavaScript 中常见的异步函数有：定时器，事件函数和 ajax 等
```

## 6、伪数组有哪些

```css
1、参数 arguments，
2、DOM 对象列表（比如通过 document.getElementsByTags 得到的列表）、childNodes也是伪数组
3、jQuery 对象（比如 $("div")）
```

## 7、真数组和伪数组的区别

```css
伪数组：
1、拥有length属性
2、不具有数组的方法
3、伪数组是一个Object，真数组是Array
4、伪数组的长度不可变，真数组的长度是可变的
```

## 8、伪数组怎么转真数组

```css
1、let newArr = Array.protype.slice.call(伪数组)
2、let newArr = Array.from(伪数组),ES6的新语法
3、let newArr = [...伪数组]，使用扩展运算符,也是ES6的语法
```

## 9、DOM操作常用的API有哪些

```css
1、创建节点
	createElement
	cloneNode
    
2、页面修改
	appendChild
	insertBefore
	removeChild
	replaceChild

3、节点查询
	document.querySelector
	document.querySelectorAll
	document.getElementById
	document.getElementsByTagName

4、节点关系
  父关系型：parentNode
  子关系型：children
  
5、元素属性
	设置：setAttribute
    获取：getAttribute

```

## 10、如何检测浏览器的类型

```css
可以通过检测navigator.userAgent  在通过不通浏览器的不同来检测
```

## 11、JavaScript计时函数

```css
1、setInterval() 周期执行函数。间隔指定的毫秒数不停地执行指定的代码。
  clearInterval() 方法用于停止 setInterval() 方法执行的函数代码。
  可丽阿
2、setTimeout() 延迟执行函数。延迟执行指定的函数，只能执行一次
  clearTimeout() 方法用于停止执行setTimeout()方法的函数代码。
```

## 12、如何阻止冒泡和默认行为

```js
答: 阻止冒泡和捕获  e.stopPropagation() 'sdo pu 扑o扑葛升
    阻止默认行为   e. ()   return false
    注意：addEventListener注册的事件，在高浏览器版本中，return false将没有效果，必须要用事件对象
```

## 13、原生注册事件的方式有哪些？区别是什么

```js
答: 注册方式
		  1. on + 事件名称
		  2. addEventListener
		区别: 
			1. 使用on注册事件,同一个元素只能注册一个同类型事件,否则会覆盖。
			2. addEventListener可以注册同一事件多次,不会被覆盖。
```
