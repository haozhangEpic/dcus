## 前端面试题

## 1、对this的理解

```css
答: this是个关键字,它的指向和函数的调用方式有关
1. 函数调用模式, this指向window
2. 定时器中,this指向window
3. 匿名函数中的this总是指向window
4. 上下文调用模式, call和apply方法中, this指向方法内的第一个参数
  bind方法中, bind创建的新函数的this绑定为bind方法中新的函数
5. 在事件处理函数中,this指向触发事件的当前元素
6. 构造函数调用模式, this指向新创建的实例对象
7. 箭头函数中没有this指向问题,它的this和外层作用域的this保持一致
8. 方法调用模式, this指向调用方法的对象
```

## 2、new操作符做了什么

```
答:  1. 创建一个新对象
	2. 函数内部的this指向这个对象
	3. 执行函数体
	4. 自动返回这个函数
```

## 3、git如何管理一个项目

```css
 1、git管理项目流程
答: 1、git init初始化git仓库（新项目才有这一步）
    2、git clone将远程仓库的项目资料下载下来
    3、git checkout -b dev (dev 为本地分支名）
    4、git add .将工作区文件存在暂存区
    4、git commit -m  ""从暂存区存到仓储区
    5、git checkout master切到master分支
    6、git merge dev 合并分支,合并后要将分支删除
    7、使用git push将其上传到远程仓库
    8、第二上班，先pull一下，更新最新代码
    
```

## 4、git如何解决合并冲突

```js
git解决合并冲突
答：冲突的原因：代码提交的时候，在当前行有新的代码要加入，就会出现冲突。例如：20行已经有代码了，但是合并的的代码20行也是有代码，这样就会出现冲突。
	解决办法：如果是双方的代码是不同的业务，那就保留双方双方更改（vscode有提示）。如果是重复的业务逻辑，那就选择采用当前更改（vscode有提示）。
    
```

## 5、什么是promise，特点是什么

```css
	首先，它是一个对象，也就是说与其他JavaScript对象的用法，没有什么两样；它使得异步操作具备同步操作的效果，使得程序具备正常的同步运行的流程，回调函数不必再一层层嵌套。
	简单说，它的思想是，'每一个异步任务立刻返回一个Promise对象，由于是立刻返回，所以可以采用同步操作的流程。这个Promises对象有一个then方法，允许指定回调函数，在异步任务完成后调用。
      
 特点：
    1、Promise对象只有三种状态。
        异步操作“未完成”（pending）
        异步操作“已完成”（resolved，又称fulfilled）
        异步操作“失败”（rejected）
        异步操作成功，Promise对象传回一个值，状态变为resolved。
        异步操作失败，Promise对象抛出一个错误，状态变为rejected。
    2、promise的回调是同步的，then是异步的
    3、可以链式调用
	  4、解决回调地狱
```

## 6、promise的方法有哪些，能说明其作用

```css
原型上的方法：
1、Promise.prototype.then()
	1）作用是为 Promise 实例添加状态改变时的回调函数。接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。其中，第二个函数是可选的，不一定要提供。
    2）返回的是另一个Promise对象，后面还可以接着调用then方法。
2、Promise.prototype.catch()
	1）用于指定发生错误时的回调函数。
    2）返回的也是一个 Promise 对象，因此还可以接着调用then方法
3、Promise.prototype.finally()  'fai懵临
	1）finally方法用于指定不管 Promise 对象最后状态如何，都会执行的回调函数。
    2）finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。

自身API:
1、Promise.resolve()
	1）不带参数传递 — 返回一个新的状态为resolve的promise对象
    2）参数是一个 Promise 实例— 返回 当前的promise实例
2、Promise.reject()
	1)返回的是一个值
    2）返回的值会传递到下一个then的resolve方法参数中
3、Promise.all() 
	1）并行执行异步操作的能力
    2）所有异步操作执行完后才执行回调
4、Promise.race()
	1）那个结果返回来的快就是，那个结果，不管结果是成功还是失败
```

## 7、async和await是干什么的

```css
1、async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。
2、await 只能出现在 async 函数中。
3、async 函数返回的是一个 Promise 对象，后面可以用then方法。
```

## 8、怎么理解事件循环机制(Event Loop)

```css
	1、JavaScript 是一门单线程语言.单线程可能会出现阻塞的情况，所js分了同步任务和异步任务。
    2、同步和异步任务分别进入不同的执行环境，同步的进入主线程，即主执行栈，异步的进入 Event Queue（事件队列） 。主线程内的任务执行完毕为空，会去 Event Queue 读取对应的任务，推入主线程执行。 上述过程的不断重复就是我们说的 Event Loop (事件循环)。
```



















