## 1、怎么理解mvvm这种设计模式

```js
 Model–View–ViewModel （MVVM） 是一个软件架构设计模式，是一种简化用户界面的事件驱动编程方式。
MVVM
    M Model 模型 指的是数据层
    V View  视图 指的是用户页面
    VM ViewModel 视图模型
    视图模型是MVVM模式的核心，它是连接view和model的桥梁，//MVVM实现了view和model的自动同步，当model的属性改变时，我们不用自己手动操作DOM元素，来改变view的显示，反之亦然，我们称之为数据的双向绑定。
```

## 2、v-if和v-show的区别，使用场景区别

```js
 v-if和v-show看起来似乎差不多，当条件不成立时，其所对应的标签元素都不可见，但是这两个选项是有区别的:
1、v-if在条件切换时，会对标签进行适当的创建和销毁，而v-show则仅在初始化时加载一次，因此v-if的开销相对来说会比v-show大。
2、"v-if是惰性的，只有当条件为真时才会真正渲染标签；如果初始条件不为真，则v-if不会去渲染标签。v-show则无论初始条件是否成立，都会渲染标签，它仅仅做的只是简单的CSS（display）切换。

3、 v-if适用于不需要频繁切换元素显示和隐藏的情况
    v-show适用于需要频繁切换元素的显示和隐藏的场景。
```

## 3、事件修饰符和按键修饰符有哪些

```js
事件修饰符：
	.prevent  阻止事件默认行为  扑软特
    .stop     阻止事件冒泡  
    .capture  设置事件捕获机制
    .self     只有点击元素自身才能触发事件 丧负
    .once     事件只触发一次  腕似
 按键修饰符：
    .tab
    .enter
    .esc
    .space
    .delete(捕获"删除"和"空格"键)
    .up
    .down
    .left
    .right
```

## 4、v-model修饰符有哪些

```js
	.number 将数据转换成number类型(原本是字符串类型)
	.trim   去除首尾空格  吹目
    .lazy   只在输入框失去焦点或按回车键时更新内容，不是实时更新
```

## 5、v-for中为什么要加key

```js
作用：
      //1.key的作用主要是为了高效的更新虚拟DOM，提高渲染性能。
      //2.key保证数据的唯一性,属性可以避免数据混乱的情况出现。
 原理：
      1.vue实现了一套虚拟DOM，使我们可以不直接操作DOM元素只操作数据，就可以重新渲染页面，而隐藏在背后的原理是高效的Diff算法
      2.当页面数据发生变化时，Diff算法只会比较同一层级的节点；
      3.如果节点类型不同，直接干掉前面的节点，再创建并插入新的节点，不会再比较这个节点后面的子节点；
        如果节点类型相同，则会重新设置该节点属性，从而实现节点更新
      4.使用key给每个节点做一个唯一标识，Diff算法就可以正确失败此节点，"就地更新"找到正确的位置插入新的节点。
```

## 6、v-for和v-if的优先级

```js
 v-for优先级高于v-if
    如果同时出现v-for和v-if，无论判断条件是否成立，都会执行一遍v-for循环，这样浪费性能，所以要尽可能的避免两者一起使用。
```

## 7、组件中的data为什么是函数,new Vue 实例里，data 可以直接是一个对象

```js
1、/组件是用来复用的/，组件中的data写成一个函数,数据以函数返回值形式定义,/函数有独立的作用域，这样每复用一次组件,就会返回一份新的data,类似于给每个组件实例创建一个私有的数据空间,让每个组件实例维护各自的数据,互不影响
2、而单纯的写成对象形式,/由于对象是引用类型，就使得所有组件实例共用了一份data,就会造成一个变了全都会变的结果。
3、因为new vue里面的代码是不存在复用的情况，所以可以写成对象形式
```

## 8、computed和watch的区别是什么

```js
计算属性computed：

1、支持缓存，只有依赖数据发生改变，才会重新进行计算
2、不支持异步，当computed内有异步操作时无效，无法监听数据的变化
3、如果computed需要对数据修改，需要写get和set两个方法，当数据变化时，调用set方法。
4、computed擅长处理的场景：一个数据受多个数据影响，例如购物车计算总价

侦听属性watch：  

1、不支持缓存，数据变，直接会触发相应的操作；
2、watch支持异步；监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；
3、immediate：组件加载立即触发回调函数执行
4、D扑 :deep:true的意思就是深入监听，任何修改obj里面任何一个属性都会触发这个监听器里的 handler方法来处理逻辑
5、watch擅长处理的场景：一个数据影响多个数据，例如搜索框
```

## 9、组件化和模块化的区别

```js
1、组件相当于库，把一些能在项目里或者不同类型项目中可复用的代码进行工具性的封装。
2、模块相应于业务逻辑模块，把同一类型项目里的功能逻辑进行进行需求性的封装。
```

## 10、怎么理解vue中的虚拟DOM

```js
原理：	
	用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
diff 算法 — 比较两棵虚拟 DOM 树的差异；
pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

好处：
	1、性能优化
    2、无需手动操作DOM
    3、可以跨平台，服务端渲染等
    
    1.什么是DOM
	DOM:document object model文档对象模型
```

## 11、怎么理解vue的生命周期

```js
 vue的生命周期：//vue实例从创建到销毁的全过程，这个过程可以分为3个阶段
    第一阶段：初始化阶段   创建vue实例,准备数据,准备模板,渲染视图  
	挂载阶段
    第二阶段：数据更新阶段 当数据变化时，会进行新旧DOM的对比，对比出差异的部分，进行差异化更新。
    第三阶段：实例销毁阶段 当vm.$destroy()被调用，vue实例就会被销毁，释放相关资源，此时再更新数据，视图不会再变化。
```

## 12、vue 钩子函数有哪些，有哪些使用的场景

```js
1、各阶段包含钩子： 
beforeCreate 可瑞te 在data数据注入到vm实例之前，此时vm身上没有数据
    created   可瑞提/得    在data数据注入到vm实例之前，此时vm身上有数据

    beforeMount   生成的结构替换视图之前，此时DOM还没更新
    mounted    茂疼/得  生成的结构替换视图之前，此时DOM已经更新完成

    beforeUpdate  数据变化了，dom更新之前
    updated    阿布对\/Dt 数据变化了，dom更新之后
    
    activated    阿t未挺 被keep-alive缓存的组件激活时调用
    deactivated   被keep-alive缓存的组件停用时调用

    beforeDestroy 实例销毁，是否资源之前
    destroyed  弟死jo音/Dt   实例销毁，是否资源之后

    这些钩子函数会在vue的生命周期的不同阶段，自动被vue调用
    
    errorCaptured 阿瑞 卡破切儿的 当子孙组件出错时，会调用这个钩子函数

2、常用的钩子函数使用场景：
    beforeCreate  做loading的一些渲染
    created       结束loading， 发送数据的请求，拿数据
    mounted       可以对dom进行操作
    updated       监视数据的更新
    beforeDestroy 销毁非vue资源，防止内存泄漏，例如清除定时器
    activated     当我们运用了组件缓存时，如果想每次切换都发送一次请求的话，需要把请求函数写在activated中，而写在created或mounted中其只会在首次加载该组件的时候起作用。
```

## 13、Vue 的父组件和子组件生命周期钩子函数执行顺序

```js
1、Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：
  1）加载渲染过程
     父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
  2）子组件更新过程
     父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
  3）父组件更新过程
     父 beforeUpdate -> 父 updated
  4）销毁过程
  父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed 
```

## 14、vue组件传值的方式  ,组件通信

- ```js
  1、父传子
      通过props传递
      父组件： <child :list = 'list' />
      子组件: props['list'],接收数据,接受之后使用和data中定义数据使用方式一样
  
  2、子传父
  	在父组件中给子组件绑定一个自定义的事件，子组件通过$emit()触发该事件并传值。
      父组件： <child @receive = 'getData' />
              getData(value){value就是接收的值}
      子组件: this.$emit('receive',value)
  
  3、兄弟组件传值
  	通过中央通信 let bus = new Vue()
      A组件：methods :{ 
      	    sendData(){
                  bus.$emit('getData',value)
                } 发送
      B组件：created(){
          bus.$on(‘getData’,(value)=>{value就是接收的数据})
      } 进行数据接收
  
      
      //组件通行的方法
     1. 父传子 通过 props 传递  
  	2. 子传父 通过 $emit 触发自定义事件
  	3. 使用 ref  $refs
  	4. EventBus
  	5. $parent 或$root 牌稳特  入吐
  	6. attrs 与 listeners
  	7. Provide 与 Inject  
  	8. Vuex
  ```


## 15、$nextTick是什么？原理是什么

```js
背景：
	1、简单来说，//Vue 在修改数据后，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。 白话: Vue 在更新 DOM 时是异步执行的。当数据发生变化，Vue将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新 ,想拿到当前最新数据,在没渲染之前做操作
    '$nextTick() 获取最新的视图 (将来有些代码操作是需要基于最新的视图结构再做的)
	数据变化 (同步)	视图变化 (异步)
    
定义：
	2、在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。nextTick()，是将回调函数延迟在下一次dom更新数据后调用，简单的理解是：当数据更新了，在dom中渲染后，自动执行该函数。
    
原理
	3、vue用异步队列的方式来控制DOM更新和nextTick回调先后执行。
	简单来说，nextTick是做了promise加上setTimeout的封装,利用事件换行机制，来确保当nextTick出现时，都是在我们所有操作DOM更新之后的。

场景：
	4.1 点击获取元素宽度
    4.2 使用swiper插件通过 ajax 请求图片后的滑动问题
    4.3 点击按钮显示原本以 v-show = false 隐藏起来的输入框，并获取焦点
```

## 16、vue是如何获取DOM

```js
1、//先给标签设置一个ref值，再通过this.$refs.domName获取
，这个操作要在mounted阶段进行。
2、例如：
<template>
	<div ref="test"></div>
</template>
mounted(){
   const dom = this.$refs.test 
}
```

## 17、v-on可以监听多个方法吗

```js
可以
例如：
<input type="text" v-on="{ input:onInput,focus:onFocus }">
```

## 18、谈谈你对 keep-alive 的了解

```js
1、//keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染
2、//一般结合路由和动态组件一起使用，用于缓存组件
3、//对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated
4、提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
例如：
<keep-alive include="a">
 <component>
  <!-- name 为 a 的组件将被缓存！ -->
 </component>
</keep-alive>

<keep-alive exclude="a">
 <component>
  <!-- 除了 name 为 a 的组件都将被缓存！ -->
 </component>
</keep-alive>
```

## 19、谈谈你对slot的了解

```js
1、什么是插槽 // 用来复用和给组件传递结构
	1.1 插槽（Slot）是Vue提出来的一个概念，正如名字一样，//插槽用于决定将所携带的内容，插入到指定的某个位置，从而使模板分块，具有模块化的特质和更大的重用性。
	1.2 插槽显不显示、怎样显示是由父组件来控制的，而插槽在哪里显示就由子组件来进行控制
    
2、插槽使用
	2.1 默认插槽  在子组件中写入slot，slot所在的位置就是父组件要显示的内容
    2.2 具名插槽  在子组件中定义了三个slot标签，其中有两个分别添加了name属性header和footer
    			 在父组件中使用template并写入对应的slot名字来指定该内容在子组件中现实的位置
    2.3 作用域插槽  在子组件的slot标签上绑定需要的值<slot :data="user"></slot>
    	          在父组件上使用slot-scope=“user”来接收子组件传过来的值 
```

## 20、vue中动态组件如何使用

```js
1、在某个中使用 is 特性来切换不同的组件：
	<component :is="TabComponent"></component>   TabComponent:已注册组件的名字
```

## 21、v-model的原理是什么

```js
1、v-model主要提供了两个功能，视图(view)层输入值影响data的属性值，属性值发生改变会更新数据层的数值变化.
2、v-model指令的实现：
	3.1 v-bind:绑定响应式数据   
	3.2 触发input事件并传递数据 (核心和重点)
// v-model指令的实现核心和重点是 给属性添加 :value 和 @input 来绑定实现响应式传递数据
3、其底层原理就是(双向数据绑定原理)：
	3.1 一方面modal层通过defineProperty来劫持每个属性，一旦监听到变化通过相关的页面元素更新。
    3.2 另一方面通过编译模板文件，为控件的v-model绑定input事件，从而页面输入能实时更新相关data属性值。
```

## 22、vue响应式的原理

```js
1、原理：
	Vue 的响应式原理是核心是通过 ES5 的 'Object.defindeProperty 进行数据劫持，然后利用 get 和 set 方法进行获取和设置，data 中声明的属性都被添加到了get和set中，当读取 data 中的数据时自动调用 get 方法，当修改 data 中的数据时，自动调用 set 方法'，检测到数据的变化，会通知观察者 Wacher，观察者 Wacher自动触发重新render 当前组件（子组件不会重新渲染）,生成新的虚拟 DOM 树，Vue 框架会遍历并对比新虚拟 DOM 树和旧虚拟 DOM 树中每个节点的差别，并记录下来，最后，加载操作，将所有记录的不同点，局部修改到真实 DOM 树上。

2、底层代码实现：
	   let data = {
        name: "lis",
        age: 20,
        sex: "男"
    }
//  vue2.0实现  使用Object.defineProperty进行数据劫持
    for(let key in data){
        let temp = data[key]
        Object.defineProperty(data, data[key], {
            get(){
                return temp
            },
            set(value){
                temp = value
            }
        })
    }
// vue3.0实现 使用Proxy 进行数据的代理
    let newData = new Proxy(data, {
        get(target, key){
            return target[key]
        },
        set(target, key, value){
            target[key] = value
        }
    })
```

## 23、vue2.0和vue3.0响应式的区别

```js
1、Object.defineProperty  必翻 扑弱扑提
  1) 用于监听对象的数据变化
  2) 无法监听数组变化(下标，长度)
  3) 只能劫持对象的自身属性，动态添加的劫持不到
2、Proxy
  1) proxy返回的是一个新对象， 可以通过操作返回的新的对象达到目的
  2）可以监听到数组变化，也可以监听到动态添加的数据
3、vue2选项式api  vue3组合式api
V2 根据功能去写对应的data  methods  ...    分散式维护(不好维护)

 v3 随着业务的推进 代码也会越来越多    集中式维护(好维护)    =>  自定义的组合式函数

  组合式     =>    v3提出的概念 
						   瑞阿克提吴
  原生的组合式函数  =>    ref  reactive  computed  watch .......钩子函数

何为组合式? v3中直接放弃了v2中的面向对象的开发方式(this)   v3推崇利用一个个函数 组合起来完成功能
  fn  fn2   fn3  自定义的组合式函数
  一个规范: /自定义的组合式函数名有要求  useXxxx开头
```

##  23.2  vue2和vue3 的不同

```css
1. vue2选项式api  vue3组合式api
			 笔凡in 扑弱破似 ,笔凡in 额么似
2. 父传子,子传父 defineProps ,defineEmits 需要通过宏(全局)函数接收和暴露对象
3. 钩子函数的改变:  vue2 beforeCreate和created   vue3换了 setup   摧毁阶段换成卸载阶段  其他钩子一样只是前面加了on
```



## 24、router和route的区别

```css
1、$router对象
    1）$router对象是全局路由的实例，是router构造方法的实例
    2）$router对象上的方法有：push()、go()、replace()
2、$route对象
    1）$route对象表示当前的路由信息，包含了当前 URL 解析得到的信息。包含当前的路径，参数，query对象等
    2）$route对象上的属性有：path、params、query、hash等等
   
```

## 25、路由传参的方式和区别

```js
答: 
1、方式：//params 和 query
2、区别：1）//params用的是name，传递的参数在地址栏不会显示，类似于post
        2）//query用的是path,传递的参数会在地址栏显示出来，类似于get      
3、举例说明：
   1）params 传参
    传： this.$router.push({
          name: 'particulars',
          params: {
            id: id
          }
        })
     接：this.$route.params.id
     
   2）query传参
     传：this.$router.push({
          path: '/particulars',
          query: {
            id: id
          }
        })
      接：this.$route.query.id
```

## 26、Vue模版编译原理知道吗，能简单说一下吗

```js
1、简单说，Vue的编译过程就是将template转化为render函数的过程。
2、首先解析模版，生成AST语法树(一种用JavaScript对象的形式来描述整个模板)。 使用大量的正则表达式对模板进行解析，遇到标签、文本的时候都会执行对应的钩子进行相关处理。
3、Vue的数据是响应式的，但其实模板中并不是所有的数据都是响应式的。有一些数据首次渲染后就不会再变化，对应的DOM也不会变化。那么优化过程就是深度遍历AST树，按照相关条件对树节点进行标记。这些被标记的节点(静态节点)我们就可以跳过对它们的比对，对运行时的模板起到很大的优化作用。
4、编译的最后一步是将优化后的AST树转换为可执行的代码。

```

## 27、SSR了解吗

```js
1、SSR也就是服务端渲染，也就是将Vue在客户端把标签渲染成HTML的工作放在服务端完成，然后再把html直接返回给客户端。
2、SSR有着更好的SEO、并且首屏加载速度更快等优点。缺点是，比如我们的开发条件会受到限制，服务器端渲染只支持beforeCreate和created两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于Node.js的运行环境。还有就是服务器的压力比较大。
```

## 28、你都做过哪些Vue的性能优化

```js
1、v-if和v-for不能连用
2、页面采用keep-alive缓存组件
3、合理使用v-if和v-show
4、key保证唯一
5、使用路由懒加载、异步组件、组件封装
6、防抖、节流
7、第三方模块按需导入
8、图片懒加载
9、精灵图的使用
10、代码压缩
```

## 29、Vue-router 路由有哪些模式

```js
一般有两种模式：
        1、'hash模式'：后面的 hash 值的变化，浏览器既不会向服务器发出请求，浏览器也不会刷新，每次 hash 值的变化会触发 hashchange 事件。
        

        2、'history模式'：利用了 HTML5 中新增的 pushState() 和 replaceState() 方法。这两个方法应用于浏览器的历史记录栈，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的 URL，但浏览器不会立即向后端发送请求。
        
两者的区别:
1.hash 就是指 url 后面的 # 号以及后面的字符，history没有带#，外观上比hash 模式好看些
2.hash 能兼容到IE8， history 只能兼容到 IE10；
```

## 30、Vuex 是什么？有哪几种属性？

```js
  1、Vuex 是一个插件，可以帮我们管理 Vue 通用的数据 (多组件共享的数据)。例如：购物车数据   个人信息数
  2、属性
  	涩特
  （1）'state' 属性：基本数据   数据是公用的
  	阁特儿似
  （2）'getters' 属性：从 state 中派生出的数据,类似new Vue实例里的computed计算属性
  	谬退升
  （3）'mutation' 属性：更新 store 中数据的唯一途径，其接收一个以 state 为第一参数的回调函数  只支持同步
  	阿克升
  （4）'action' 属性：提交 mutation 以更改 state，其中可以包含异步操作，数据请求
  	磨酒
  （5）'module' 属性：用于将 store分割成不同的模块。 摸就
  
  store仓库 state是用来储存数据的,不同于组件里的data 数据是自己的, state数据是共用的,state数据更新必须通mutation,
      mutation里的函数都有固定的一个形参来指向stete对象,组件里需要用this.$store.commit('mutations函数名')去触发mutations语法  mutations中只有两个形参,第一个永远指向stete,第二个指向传递的参数,对象也是一个哦 , 
      action内主要处理异步操作,它的第一个参数指向mutation,参数.commit('mutation里函数', res) 进行传值
```

## 31、axios封装请求拦截器和响应拦截器

```js
interceptors：【ɪntərˈsɛptərz】
1、项目中会在utils文件中，封装一个request.js文件
2、通过axios.create()配置baseURL，并得到一个request实例
3、通过request.interceptors.request.use来配置请求拦截   
'瑞快死te
4、通过request.interceptors.response.use来配置响应拦截	
'瑞死绑死

白话:` 在utils文件中封装一个.js文件,来配置根路径,通过request配置请求拦截,通过response响应拦截
```

## 32、webpack在项目中的常见配置

```js
1、 `配置兼容编译ES6转成ES5 语法降级`
	用babel来编译，npm i babel-core babel-loader babel-preset-env babel-polyfill babel-plugin-transform-runtime --save-dev
2、`配置跨域代理服务`
	用proxy进行代理，在devServer里面配置，proxy:{'/api':{target:代理的地址}}
3、配置打包路径
	publicPath:'/'
4、配置打包出去文件
	outputDir: 'dist'
5、`配置执行环境变量`
	启动的端口  const port = process.env.port || process.env.npm_config_port || 9528
	
```

## 33、vue怎么实现强制刷新组件

```js
第一.使用this.$forceUpdate强制重新渲染
    <template>
    <button @click="reload()">刷新当前组件</button>
    </template>
    <script>
    export default {
        name: 'comp',
        methods: {
            reload() {
                this.$forceUpdate()
            }
        }
    }
    </script>

第二.使用v-if指令
<template>
    <comp v-if="update"></comp>
    <button @click="reload()">刷新comp组件</button>
</template>
<script>
import comp from '@/views/comp.vue'
export default {
    name: 'parentComp',
    data() {
        return {
            update: true
        }
    },
    methods: {
        reload() {
            // 移除组件
            this.update = false
            // 在组件移除后，重新渲染组件
            // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
            this.$nextTick(() => {
                this.update = true
            })
        }
    }
}
</script>
```

## 34、在使用计算属性的时,函数名和data数据源中的数据可以同名吗?

```js
不可以
	在初始化vm的过程，因为不管是计算属性还是data还是props 都会被挂载在vm实例上，会把data覆盖了,因此 这三个都不能同名
```

## 35、vue中data的属性可以和methods中的方法同名吗?

```js
不可以
	vue源码中的 initData() 方法会取出 methods 中的方法进行判断，如果有重复的就会报错
```

## 36、你知道style加scoped属性的用途和原理吗

```js
用途：'防止全局同名CSS污染
原理：'在标签加上v-data-something属性，再在选择器时加上对应[v-data-something]，即CSS带属性选择器，以此完成类似作用域的选择方式.  似答
	scoped(似够扑特)会在元素上添加唯一的属性（data-v-x形式），css编译后也会加上属性选择器，从而达到限制作用域的目的。
```

## 37、如何在子组件中访问父组件的实例

```js
Vue中子组件调用父组件的方法，这里有三种方法提供参考：
    1：直接在子组件中通过this.$parent.event来调用父组件的方法
    2：在子组件里用$emit向父组件触发一个事件，父组件监听这个事件
    3：父组件把方法传入子组件中，在子组件里直接调用这个方法
```

## 38、watch的属性用箭头函数定义结果会怎么样

```js
不应该使用箭头函数来定义 watch :
例如：
    watch: {
      a: () => {  //  这里不应该用箭头函数
        console.log(this);
        this.sum = this.a + this.b;
      }
    })。
理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，
this.a 将是 undefined。

注意：methods里面定义的方法也不要用箭头函数
```

## 40、怎么解决vue打包后静态资源图片失效的问题

```js
在vue-cli 需要在根目录下建一个vue.config.js 在里面配置publicPath即可
默认值为/，更改为./就好了
```

## 41、怎么解决vue动态设置img的src不生效的问题

```js
因为动态添加src被当做静态资源处理了，没有进行编译，所以要加上require。
<img :src="require('@/assets/images/xxx.png')" />
```

## 42、EventBus注册在全局上时，路由切换时会重复触发事件，如何解决呢

```js
原因：因为我们的事件是全局的，它并不会随着组件的销毁而自动注销，需要我们手动调用注销方法来注销。
解决：我们可以在组件的 beforeDestroy ,或 destroy 生命周期中执行注销方法，手动注销事件
```

## 43、你认为vue的核心是什么

```js
组件化
双向数据绑定
```

## 44、在.vue文件中style是必须的吗？那script是必须的吗

```js
在.vue 文件中，template是必须的，而script与style都不是必须的。都没有的话那就是一个静态网页
```

## 45、说说vue的优缺点

```js
优点：
    1.数据驱动
    2.组件化
    3.轻量级
    4.SPA(单页面)
    5.版本3.0的界面化管理工具比较好使
    6.vue易入门
    7.中文社区强大，入门简单，提升也有很多的参考资料。
缺点：
    1.不支持IE8及以下浏览器
    2.吃内存（每个组件都会实例化一个Vue实例，实例的属性和方法很多）
    3.定义在data里面的对象，实例化时，都会递归的遍历转成响应式数据，然而有的响应式数据我们并不会用到，造成性能上的浪费

```

## [*vue为什么是异步渲染*](https://www.baidu.com/link?url=fbWQBE6wlS1qSjh2gT_UpAp5vOseRQHGO2NhVaQgvq790c9XkigqWcv5an7A0WB81MM4PeNAHzs7yJZ7pB-PKSo_xbaMXkE3fA8dZPdSXPy&wd=&eqid=cceefcca0001f4fd0000000564a36d86)

```
如果不采用异步更新,在每次更新数据都会对当前组件进行重新渲染。所以为了性能考虑,vue 会在本轮数据更新后,再去异步更新视图。 vue是组件级更新,当前组件里的数据变了,它就会去更新这个组件。当数据更改一次组件就要重新渲染一次,性能不高,为了防止数据一更新就更新组件,所以做了个异步更新渲染。
```





 

