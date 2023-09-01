##  var的用法

```javascript
function test() {
    var a = 10;
}
test();
console.log(a) // 报错！


function test() {
    a = 10;
}
test();
console.log(a) // 正确
```

##  let声明

​		使用var声明的是函数作用域，let声明的是块级作用域

##  NaN

​		NaN 不等于包括 NaN 在内的任何值。例如，下面的比较操作会返回 false：

```js
console.log(NaN == NaN); // false 
```

​		为此，ECMAScript 提供了 isNaN()函数。该函数接收一个参数，可以是任意数据类型，然后判断这个参数是否“不是数值”。把一个值传给 isNaN()后，该函数会尝试把它转换为数值。某些非数值的值可以直接转换成数值，如字符串"10"或布尔值。任何不能转换为数值的值都会导致这个函数返回true。举例如下：

```js
console.log(isNaN(NaN)); // true 

console.log(isNaN(10)); // false，10 是数值

console.log(isNaN("10")); // false，可以转换为数值 10 

console.log(isNaN("blue")); // true，不可以转换为数值

console.log(isNaN(true)); // false，可以转换为数值 1 
```



> ​		虽然不常见，但 isNaN()可以用于测试对象。此时，首先会调用对象的 valueOf()方法，然后再确定返回的值是否可以转换为数值。如果不能，再调用 toString()方法，并测试其返回值



## 数值转换

​		有 3 个函数可以将非数值转换为数值：Number()、parseInt()和 parseFloat()。Number()是转型函数，可用于任何数据类型。后两个函数主要用于将字符串转换为数值。对于同样的参数，这 3 个函数执行的操作也不同。

​		Number()函数基于如下规则执行转换。

- 布尔值，true 转换为 1，false 转换为 0。
- 数值，直接返回。
- null，返回 0。
- undefined，返回 NaN。

​		字符串，应用以下规则。

- 如果字符串包含数值字符，包括数值字符前面带加、减号的情况，则转换为一个十进制数值。
- 因此，Number("1")返回 1，Number("123")返回 123，Number("011")返回 11（忽略前面
- 的零）。
- 如果字符串包含有效的浮点值格式如"1.1"，则会转换为相应的浮点值（同样，忽略前面的零）。
- 如果字符串包含有效的十六进制格式如"0xf"，则会转换为与该十六进制值对应的十进制整
- 数值。
- 如果是空字符串（不包含字符），则返回 0。
- 如果字符串包含除上述情况之外的其他字符，则返回 NaN。
- 对象，调用 valueOf()方法，并按照上述规则转换返回的值。如果转换结果是 NaN，则调用toString()方法，再按照转换字符串的规则转换。

##  字符串

​		字符串数据类型包含一些字符字面量，用于表示非打印字符或有其他用途的字符，如下表所示：



| 字 面 量 | 含 义                                                        |
| -------- | ------------------------------------------------------------ |
| \n       | 换行                                                         |
| \t       | 制表                                                         |
| \b       | 退格                                                         |
| \r       | 回车                                                         |
| \f       | 换页                                                         |
| \\       | 反斜杠（\）                                                  |
| \'       | 单引号（'），在字符串以单引号标示时使用，例如'He said,\\'hey.'\\'' |
| \"       | 双引号（"），在字符串以双引号标示时使用，例如"He said, \\"hey.\\"" |
| \`       | 反引号（\`），在字符串以反引号标示时使用，例如\`He said, \\`hey.\\`` |
| \x*nn*   | 以十六进制编码 *nn* 表示的字符（其中 *n* 是十六进制数字 0~F），例如\x41 等于"A" |
| \u*nnnn* | 以十六进制编码 *nnnn* 表示的 Unicode 字符（其中 *n* 是十六进制数字 0~F），例如\u03a3 等于希腊字 |

​		字符串的长度可以通过其 length 属性获取：

​		在这个例子中，即使包含 6 个字符长的转义序列，变量 text 仍然是 28 个字符长。因为转义序列表示一个字符，所以只算一个字符。

```javascript
let text = "This is the letter sigma: \u03a3.";

console.log(text.length); // 28 
```

​		这个属性返回字符串中 16 位字符的个数。

> 如果字符串中包含双字节字符，那么length 属性返回的值可能不是准确的字符数。

##  Symbol 类型

###  基本定义

​		Symbol（符号）是 ECMAScript 6 新增的数据类型。符号是原始值，且符号实例是唯一、不可变的。

​		符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。

​		尽管听起来跟私有属性有点类似，但符号并不是为了提供私有属性的行为才增加的（尤其是因为Object API 提供了方法，可以更方便地发现符号属性）。相反，符号就是用来创建唯一记号，进而用作非字符串形式的对象属性。

```javascript
let sym = Symbol(); 

console.log(typeof sym); // symbol 
```

​		调用 Symbol()函数时，也可以传入一个字符串参数作为对符号的描述（description），将来可以通过这个字符串来调试代码。但是，这个字符串参数与符号定义或标识完全无关：

```javascript
let genericSymbol = Symbol(); 
let otherGenericSymbol = Symbol(); 
let fooSymbol = Symbol('foo'); 
let otherFooSymbol = Symbol('foo'); 
console.log(genericSymbol == otherGenericSymbol); // false
console.log(fooSymbol == otherFooSymbol); // false
```

​		符号没有字面量语法，这也是它们发挥作用的关键。按照规范，你只要创建 Symbol()实例并将其用作对象的新属性，就可以保证它不会覆盖已有的对象属性，无论是符号属性还是字符串属性。

```javascript
let genericSymbol = Symbol(); 
console.log(genericSymbol); // Symbol() 
let fooSymbol = Symbol('foo'); 
console.log(fooSymbol); // Symbol(foo);
```

​		最重要的是，Symbol()函数不能与 new 关键字一起作为构造函数使用。这样做是为了避免创建符号包装对象，像使用 Boolean、String 或 Number 那样，它们都支持构造函数且可用于初始化包含原始值的包装对象：

```javascript
let myBoolean = new Boolean(); 
console.log(typeof myBoolean); // "object" 
let myString = new String(); 
console.log(typeof myString); // "object" 
let myNumber = new Number(); 
console.log(typeof myNumber); // "object"
let mySymbol = new Symbol(); // TypeError: Symbol is not a constructor
```

​		如果你确实想使用符号包装对象，可以借用 Object()函数

```javascript
let mySymbol = Symbol(); 
let myWrappedSymbol = Object(mySymbol); 
console.log(typeof myWrappedSymbol); // "object"
```

###  使用全局符号注册表

​		如果运行时的不同部分需要共享和重用符号实例，那么可以用一个字符串作为键，在全局符号注册表中创建并重用符号。

​		为此，需要使用 Symbol.for()方法：

```javascript
let fooGlobalSymbol = Symbol.for('foo'); 
console.log(typeof fooGlobalSymbol); // symbol
```

​		Symbol.for()对每个字符串键都执行幂等操作。第一次使用某个字符串调用时，它会检查全局运行时注册表，发现不存在对应的符号，于是就会生成一个新符号实例并添加到注册表中。后续使用相同字符串的调用同样会检查注册表，发现存在与该字符串对应的符号，然后就会返回该符号实例。

```javascript
let fooGlobalSymbol = Symbol.for('foo'); // 创建新符号
let otherFooGlobalSymbol = Symbol.for('foo'); // 重用已有符号
console.log(fooGlobalSymbol === otherFooGlobalSymbol); // true
```

​		即使采用相同的符号描述，在全局注册表中定义的符号跟使用 Symbol()定义的符号也并不等同：

```js
let localSymbol = Symbol('foo'); 

let globalSymbol = Symbol.for('foo'); 

console.log(localSymbol === globalSymbol); // false 
```

​		全局注册表中的符号必须使用字符串键来创建，因此作为参数传给 Symbol.for()的任何值都会被转换为字符串。此外，注册表中使用的键同时也会被用作符号描述。

```js
let emptyGlobalSymbol = Symbol.for(); 
console.log(emptyGlobalSymbol); // Symbol(undefined)
```

​		还可以使用 Symbol.keyFor()来查询全局注册表，这个方法接收符号，返回该全局符号对应的字符串键。如果查询的不是全局符号，则返回 undefined。

```js
// 创建全局符号

let s = Symbol.for('foo'); 

console.log(Symbol.keyFor(s)); // foo 

// 创建普通符号

let s2 = Symbol('bar'); 

console.log(Symbol.keyFor(s2)); // undefined 
```

​		如果传给 Symbol.keyFor()的不是符号，则该方法抛出 TypeError：

```js
Symbol.keyFor(123); // TypeError: 123 is not a symbol 
```

###  使用符号作为属性

​		凡是可以使用字符串或数值作为属性的地方，都可以使用符号。这就包括了对象字面量属性和Object.defineProperty()/Object.defineProperties()定义的属性。对象字面量只能在计算属性语法中使用符号作为属性。

```js
let s1 = Symbol('foo'), 

 s2 = Symbol('bar'), 

 s3 = Symbol('baz'), 

 s4 = Symbol('qux'); 

let o = { 

 [s1]: 'foo val' 

}; 

// 这样也可以：o[s1] = 'foo val'; 

console.log(o); 

// {Symbol(foo): foo val} 

Object.defineProperty(o, s2, {value: 'bar val'}); 

console.log(o); 

// {Symbol(foo): foo val, Symbol(bar): bar val} 

Object.defineProperties(o, { 

 [s3]: {value: 'baz val'}, 

 [s4]: {value: 'qux val'} 

}); 

console.log(o); 

// {Symbol(foo): foo val, Symbol(bar): bar val, 

// Symbol(baz): baz val, Symbol(qux): qux val} 
```

​		类似于 Object.getOwnPropertyNames()返回对象实例的常规属性数组，Object.getOwnPropertySymbols()返回对象实例的符号属性数组。这两个方法的返回值彼此互斥。Object.getOwnPropertyDescriptors()会返回同时包含常规和符号属性描述符的对象。Reflect.ownKeys()会返回两种类型的键：

```js
let s1 = Symbol('foo'), 
 s2 = Symbol('bar'); 
let o = { 
 [s1]: 'foo val', 
 [s2]: 'bar val', 
 baz: 'baz val', 
 qux: 'qux val' 
}; 
console.log(Object.getOwnPropertySymbols(o)); 
// [Symbol(foo), Symbol(bar)] 
console.log(Object.getOwnPropertyNames(o)); 
// ["baz", "qux"] 
console.log(Object.getOwnPropertyDescriptors(o)); 
// {baz: {...}, qux: {...}, Symbol(foo): {...}, Symbol(bar): {...}} 
console.log(Reflect.ownKeys(o)); 
// ["baz", "qux", Symbol(foo), Symbol(bar)]
```

​		因为符号属性是对内存中符号的一个引用，所以直接创建并用作属性的符号不会丢失。但是，如果没有显式地保存对这些属性的引用，那么必须遍历对象的所有符号属性才能找到相应的属性键：

```js
let o = { 

 **[Symbol('foo')]: 'foo val',** 

 **[Symbol('bar')]: 'bar val'** 

}; 

console.log(o); 

// {Symbol(foo): "foo val", Symbol(bar): "bar val"} 

let barSymbol = Object.getOwnPropertySymbols(o) 

 .find((symbol) => symbol.toString().match(/bar/)); 

console.log(barSymbol); 

// Symbol(bar) 
```

###  常用内置符号

​		ECMAScript 6 也引入了一批常用内置符号（well-known symbol），用于暴露语言内部行为，开发者可以直接访问、重写或模拟这些行为。这些内置符号都以 Symbol 工厂函数字符串属性的形式存在。

​		这些内置符号最重要的用途之一是重新定义它们，从而改变原生结构的行为。比如，我们知道for-of 循环会在相关对象上使用 Symbol.iterator 属性，那么就可以通过在自定义对象上重新定义Symbol.iterator 的值，来改变 for-of 在迭代该对象时的行为。

​		这些内置符号也没有什么特别之处，它们就是全局函数 Symbol 的普通字符串属性，指向一个符号的实例。所有内置符号属性都是不可写、不可枚举、不可配置的。

> 在提到 ECMAScript 规范时，经常会引用符号在规范中的名称，前缀为@@。比如，
>
> @@iterator 指的就是 Symbol.iterator。

###  **Symbol.asyncIterator**

​		根据 ECMAScript 规范，这个符号作为一个属性表示“一个方法，该方法返回对象默认的 AsyncIterator。由 for-await-of 语句使用”。换句话说，这个符号表示实现异步迭代器 API 的函数。for-await-of 循环会利用这个函数执行异步迭代操作。循环时，它们会调用以 Symbol.asyncIterator为键的函数，并期望这个函数会返回一个实现迭代器 API 的对象。很多时候，返回的对象是实现该 API的 AsyncGenerator：

```js
class Foo { 
 async *[Symbol.asyncIterator]() {} 
} 
let f = new Foo(); 
console.log(f[Symbol.asyncIterator]()); 
// AsyncGenerator {<suspended>}
```

​		技术上，这个由 Symbol.asyncIterator 函数生成的对象应该通过其 next()方法陆续返回Promise 实例。可以通过显式地调用 next()方法返回，也可以隐式地通过异步生成器函数返回：

```js
class Emitter { 
 constructor(max) { 
 this.max = max; 
 this.asyncIdx = 0; 
 } 
 async *[Symbol.asyncIterator]() { 
 while(this.asyncIdx < this.max) { 
 yield new Promise((resolve) => resolve(this.asyncIdx++)); 
 } 
 } 
} 
async function asyncCount() { 
 let emitter = new Emitter(5); 
 for await(const x of emitter) { 
 console.log(x); 
 } 
} 
asyncCount(); 
// 0 
// 1 
// 2 
// 3 
// 4
```

> Symbol.asyncIterator 是 ES2018 规范定义的，因此只有版本非常新的浏览器
>
> 支持它。

###  **Symbol.hasInstance**

​		根据 ECMAScript 规范，这个符号作为一个属性表示“一个方法，该方法决定一个构造器对象是否认可一个对象是它的实例。由 instanceof 操作符使用”。instanceof 操作符可以用来确定一个对象实例的原型链上是否有原型。instanceof 的典型使用场景如下：

```js
function Foo() {} 
let f = new Foo(); 
console.log(f instanceof Foo); // true 
class Bar {} 
let b = new Bar(); 
console.log(b instanceof Bar); // true
```

 		ES6 中，instanceof 操作符会使用 Symbol.hasInstance 函数来确定关系。以 Symbol. hasInstance 为键的函数会执行同样的操作，只是操作数对调了一下：

```js
function Foo() {} 
let f = new Foo(); 
console.log(Foo[Symbol.hasInstance](f)); // true 
class Bar {} 
let b = new Bar(); 
console.log(Bar[Symbol.hasInstance](b)); // true
```

​		这个属性定义在 Function 的原型上，因此默认在所有函数和类上都可以调用。由于 instanceof操作符会在原型链上寻找这个属性定义，就跟在原型链上寻找其他属性一样，因此可以在继承的类上通过静态方法重新定义这个函数：

```js
class Bar {} 
class Baz extends Bar { 
 static [Symbol.hasInstance]() { 
 return false; 
 } 
} 
let b = new Baz(); 
console.log(Bar[Symbol.hasInstance](b)); // true 
console.log(b instanceof Bar); // true 
console.log(Baz[Symbol.hasInstance](b)); // false 
console.log(b instanceof Baz); // false
```

###  **Symbol.isConcatSpreadable**

​		根据 ECMAScript 规范，这个符号作为一个属性表示“一个布尔值，如果是 true，则意味着对象应该用 Array.prototype.concat()打平其数组元素”。ES6 中的 Array.prototype.concat()方法会根据接收到的对象类型选择如何将一个类数组对象拼接成数组实例。覆盖 Symbol.isConcatSpreadable 的值可以修改这个行为。

​		数组对象默认情况下会被打平到已有的数组，false 或假值会导致整个对象被追加到数组末尾。类数组对象默认情况下会被追加到数组末尾，true 或真值会导致这个类数组对象被打平到数组实例。其他不是类数组对象的对象在 Symbol.isConcatSpreadable 被设置为 true 的情况下将被忽略。

```js
let initial = ['foo']; 
let array = ['bar']; 
console.log(array[Symbol.isConcatSpreadable]); // undefined 
console.log(initial.concat(array)); // ['foo', 'bar'] 
array[Symbol.isConcatSpreadable] = false; 
console.log(initial.concat(array)); // ['foo', Array(1)]
let arrayLikeObject = { length: 1, 0: 'baz' }; 

console.log(arrayLikeObject[Symbol.isConcatSpreadable]); // undefined 
console.log(initial.concat(arrayLikeObject)); // ['foo', {...}] 

arrayLikeObject[Symbol.isConcatSpreadable] = true; 

console.log(initial.concat(arrayLikeObject)); // ['foo', 'baz']

let otherObject = new Set().add('qux'); 

console.log(otherObject[Symbol.isConcatSpreadable]); // undefined 

console.log(initial.concat(otherObject)); // ['foo', Set(1)] 

otherObject[Symbol.isConcatSpreadable] = true; 

console.log(initial.concat(otherObject)); // ['foo']
```

###  **Symbol.iterator**

根据 ECMAScript 规范，这个符号作为一个属性表示“一个方法，该方法返回对象默认的迭代器。由 for-of 语句使用”。换句话说，这个符号表示实现迭代器 API 的函数。for-of 循环这样的语言结构会利用这个函数执行迭代操作。循环时，它们会调用以 Symbol.iterator为键的函数，并默认这个函数会返回一个实现迭代器 API 的对象。很多时候，返回的对象是实现该 API的 Generator：

```js
class Foo { 
 *[Symbol.iterator]() {} 
} 
let f = new Foo(); 
console.log(f[Symbol.iterator]()); 
// Generator {<suspended>}
```

技术上，这个由 Symbol.iterator 函数生成的对象应该通过其 next()方法陆续返回值。可以通过显式地调用 next()方法返回，也可以隐式地通过生成器函数返回：

```js
class Emitter { 
 constructor(max) { 
 this.max = max; 
 this.idx = 0; 
 } 
 *[Symbol.iterator]() { 
 while(this.idx < this.max) { 
 yield this.idx++; 
 } 
 } 
} 
function count() { 
 let emitter = new Emitter(5); 
 for (const x of emitter) { 
 console.log(x); 
 } 
} 
count(); 
// 0
// 1 
// 2 
// 3 
// 4
```

###   **Symbol.match**

  		根据 ECMAScript 规范，这个符号作为一个属性表示“一个正则表达式方法，该方法用正则表达式去匹配字符串。由 String.prototype.match()方法使用”。						String.prototype.match()方法会使用以 Symbol.match 为键的函数来对正则表达式求值。正则表达式的原型上默认有这个函数的定义，因此所有正则表达式实例默认是这个 String 方法的有效参数：

```js
console.log(RegExp.prototype[Symbol.match]); 
// ƒ [Symbol.match]() { [native code] } 
console.log('foobar'.match(/bar/)); 
// ["bar", index: 3, input: "foobar", groups: undefined]
```

给这个方法传入非正则表达式值会导致该值被转换为 RegExp 对象。如果想改变这种行为，让方法直接使用参数，则可以重新定义 Symbol.match 函数以取代默认对正则表达式求值的行为，从而让match()方法使用非正则表达式实例。Symbol.match 函数接收一个参数，就是调用 match()方法的字符串实例。返回的值没有限制：

```js
class FooMatcher { 
 static [Symbol.match](target) { 
 return target.includes('foo'); 
 } 
} 
console.log('foobar'.match(FooMatcher)); // true 
console.log('barbaz'.match(FooMatcher)); // false 
class StringMatcher { 
 constructor(str) { 
 this.str = str; 
 } 
 [Symbol.match](target) { 
 return target.includes(this.str); 
 } 
} 
console.log('foobar'.match(new StringMatcher('foo'))); // true 
console.log('barbaz'.match(new StringMatcher('qux'))); // false
```

###   **Symbol.replace**

​		根据 ECMAScript 规范，这个符号作为一个属性表示“一个正则表达式方法，该方法替换一个字符串中匹配的子串。由 String.prototype.replace()方法使用”。String.prototype.replace()方法会使用以 Symbol.replace 为键的函数来对正则表达式求值。正则表达式的原型上默认有这个函数的定义，因此所有正则表达式实例默认是这个 String 方法的有效参数：

```js
console.log(RegExp.prototype[Symbol.replace]); 
// ƒ [Symbol.replace]() { [native code] } 
console.log('foobarbaz'.replace(/bar/, 'qux')); 
// 'fooquxbaz'
```

给这个方法传入非正则表达式值会导致该值被转换为 RegExp 对象。如果想改变这种行为，让方法直接使用参数，可以重新定义 Symbol.replace 函数以取代默认对正则表达式求值的行为，从而让replace()方法使用非正则表达式实例。Symbol.replace 函数接收两个参数，即调用 replace()方法的字符串实例和替换字符串。返回的值没有限制：

```js
class FooReplacer { 
 static [Symbol.replace](target, replacement) { 
 return target.split('foo').join(replacement); 
 } 
} 
console.log('barfoobaz'.replace(FooReplacer, 'qux')); 
// "barquxbaz" 
class StringReplacer { 
 constructor(str) { 
 this.str = str; 
 } 
 [Symbol.replace](target, replacement) { 
 return target.split(this.str).join(replacement); 
 } 
} 
console.log('barfoobaz'.replace(new StringReplacer('foo'), 'qux')); 
// "barquxbaz"
```

###   **Symbol.search**

根据 ECMAScript 规范，这个符号作为一个属性表示“一个正则表达式方法，该方法返回字符串中匹配正则表达式的索引。由 String.prototype.search()方法使用”。String.prototype.search()方法会使用以 Symbol.search 为键的函数来对正则表达式求值。正则表达式的原型上默认有这个函数的定义，因此所有正则表达式实例默认是这个 String 方法的有效参数：

```js
console.log(RegExp.prototype[Symbol.search]); 
// ƒ [Symbol.search]() { [native code] } 
console.log('foobar'.search(/bar/)); 
// 3
```

给这个方法传入非正则表达式值会导致该值被转换为 RegExp 对象。如果想改变这种行为，让方法直接使用参数，可以重新定义 Symbol.search 函数以取代默认对正则表达式求值的行为，从而让search()方法使用非正则表达式实例。Symbol.search 函数接收一个参数，就是调用 match()方法的字符串实例。返回的值没有限制：

```js
class FooSearcher { 
 static [Symbol.search](target) { 
 return target.indexOf('foo'); 
 } 
}
console.log('foobar'.search(FooSearcher)); // 0 
console.log('barfoo'.search(FooSearcher)); // 3 
console.log('barbaz'.search(FooSearcher)); // -1 
class StringSearcher { 
 constructor(str) { 
 this.str = str; 
 } 
 [Symbol.search](target) { 
 return target.indexOf(this.str); 
 } 
} 
console.log('foobar'.search(new StringSearcher('foo'))); // 0 
console.log('barfoo'.search(new StringSearcher('foo'))); // 3 
console.log('barbaz'.search(new StringSearcher('qux'))); // -1
```

###  **Symbol.species**

根据 ECMAScript 规范，这个符号作为一个属性表示“一个函数值，该函数作为创建派生对象的构造函数”。这个属性在内置类型中最常用，用于对内置类型实例方法的返回值暴露实例化派生对象的方法。用 Symbol.species 定义静态的获取器（getter）方法，可以覆盖新创建实例的原型定义：

```js
class Bar extends Array {} 
class Baz extends Array { 
 static get [Symbol.species]() { 
 return Array; 
 } 
} 
let bar = new Bar(); 
console.log(bar instanceof Array); // true 
console.log(bar instanceof Bar); // true 
bar = bar.concat('bar'); 
console.log(bar instanceof Array); // true 
console.log(bar instanceof Bar); // true 
let baz = new Baz(); 
console.log(baz instanceof Array); // true 
console.log(baz instanceof Baz); // true 
baz = baz.concat('baz'); 
console.log(baz instanceof Array); // true 
console.log(baz instanceof Baz); // false
```

###  **Symbol.split**

根据 ECMAScript 规范，这个符号作为一个属性表示“一个正则表达式方法，该方法在匹配正则表达式的索引位置拆分字符串。由 String.prototype.split()方法使用”。String.prototype. split()方法会使用以 Symbol.split 为键的函数来对正则表达式求值。正则表达式的原型上默认有这个函数的定义，因此所有正则表达式实例默认是这个 String 方法的有效参数：

```js
console.log(RegExp.prototype[Symbol.split]); 
// ƒ [Symbol.split]() { [native code] } 
console.log('foobarbaz'.split(/bar/)); 
// ['foo', 'baz']
```

给这个方法传入非正则表达式值会导致该值被转换为 RegExp 对象。如果想改变这种行为，让方法直接使用参数，可以重新定义 Symbol.split 函数以取代默认对正则表达式求值的行为，从而让 split()方法使用非正则表达式实例。Symbol.split 函数接收一个参数，就是调用 match()方法的字符串实例。返回的值没有限制：

```js
class FooSplitter { 
 static [Symbol.split](target) { 
 return target.split('foo'); 
 } 
} 
console.log('barfoobaz'.split(FooSplitter)); 
// ["bar", "baz"] 
class StringSplitter { 
 constructor(str) { 
 this.str = str; 
 } 
 [Symbol.split](target) { 
 return target.split(this.str); 
 } 
} 
console.log('barfoobaz'.split(new StringSplitter('foo'))); 
// ["bar", "baz"]
```

###   **Symbol.toPrimitive**

根据 ECMAScript 规范，这个符号作为一个属性表示“一个方法，该方法将对象转换为相应的原始值。由 ToPrimitive 抽象操作使用”。很多内置操作都会尝试强制将对象转换为原始值，包括字符串、数值和未指定的原始类型。对于一个自定义对象实例，通过在这个实例的 Symbol.toPrimitive 属性上定义一个函数可以改变默认行为。根据提供给这个函数的参数（string、number 或 default），可以控制返回的原始值：

```js
class Foo {} 
let foo = new Foo(); 
console.log(3 + foo); // "3[object Object]" 
console.log(3 - foo); // NaN 
console.log(String(foo)); // "[object Object]" 
class Bar { 
 constructor() { 
 this[Symbol.toPrimitive] = function(hint) { 
 switch (hint) { 
 case 'number': 
 return 3; 
 case 'string': 
 return 'string bar'; 
 case 'default': 
 default: 
 return 'default bar'; 
 } 
 } 
 } 
}
let bar = new Bar(); 
console.log(3 + bar); // "3default bar" 
console.log(3 - bar); // 0 
console.log(String(bar)); // "string bar"
```

###  **Symbol.toStringTag**

根据 ECMAScript 规范，这个符号作为一个属性表示“一个字符串，该字符串用于创建对象的默认字符串描述。由内置方法 Object.prototype.toString()使用”。通过 toString()方法获取对象标识时，会检索由 Symbol.toStringTag 指定的实例标识符，默认为"Object"。内置类型已经指定了这个值，但自定义类实例还需要明确定义：

```js
let s = new Set(); 
console.log(s); // Set(0) {} 
console.log(s.toString()); // [object Set] 
console.log(s[Symbol.toStringTag]); // Set 
class Foo {} 
let foo = new Foo(); 
console.log(foo); // Foo {} 
console.log(foo.toString()); // [object Object] 
console.log(foo[Symbol.toStringTag]); // undefined 
class Bar { 
 constructor() { 
 this[Symbol.toStringTag] = 'Bar'; 
 } 
} 
let bar = new Bar(); 
console.log(bar); // Bar {} 
console.log(bar.toString()); // [object Bar] 
console.log(bar[Symbol.toStringTag]); // Bar
```

##  **Object** 类型

ECMAScript 中的对象其实就是一组数据和功能的集合。对象通过 new 操作符后跟对象类型的名称来创建。开发者可以通过创建 Object 类型的实例来创建自己的对象，然后再给对象添加属性和方法：

let o = new Object(); 

这个语法类似 Java，但 ECMAScript 只要求在给构造函数提供参数时使用括号。如果没有参数，如上面的例子所示，那么完全可以省略括号（不推荐）：

let o = new Object; // 合法，但不推荐

Object 的实例本身并不是很有用，但理解与它相关的概念非常重要。类似 Java 中的 java.lang. Object，ECMAScript 中的 Object 也是派生其他对象的基类。Object 类型的所有属性和方法在派生的对象上同样存在。

每个 Object 实例都有如下属性和方法。

- constructor：用于创建当前对象的函数。在前面的例子中，这个属性的值就是 Object() 函数。
- hasOwnProperty(*propertyName*)：用于判断当前对象实例（不是原型）上是否存在给定的属性。要检查的属性名必须是字符串（如 o.hasOwnProperty("name")）或符号。
- isPrototypeOf(*object*)：用于判断当前对象是否为另一个对象的原型。（第 8 章将详细介绍原型。）
- propertyIsEnumerable(*propertyName*)：用于判断给定的属性是否可以使用（本章稍后讨论的）for-in 语句枚举。与 hasOwnProperty()一样，属性名必须是字符串。
- toLocaleString()：返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。
- toString()：返回对象的字符串表示。
- valueOf()：返回对象对应的字符串、数值或布尔值表示。通常与 toString()的返回值相同。

> 注意 严格来讲，ECMA-262 中对象的行为不一定适合 JavaScript 中的其他对象。比如浏览器环境中的 BOM 和 DOM 对象，都是由宿主环境定义和提供的宿主对象。而宿主对象不受 ECMA-262 约束，所以它们可能会也可能不会继承 Object。



##  操作符

ECMA-262 描述了一组可用于操作数据值的操作符，包括数学操作符（如加、减）、位操作符、关系操作符和相等操作符等。ECMAScript 中的操作符是独特的，因为它们可用于各种值，包括字符串、数值、布尔值，甚至还有对象。在应用给对象时，操作符通常会调用 valueOf()和/或 toString()方法来取得可以计算的值。

###  一元操作符

只操作一个值的操作符叫一元操作符（unary operator）。一元操作符是 ECMAScript中最简单的操作符。

###  递增/递减操作符

递增和递减操作符直接照搬自 C 语言，但有两个版本：前缀版和后缀版。顾名思义，前缀版就是位于要操作的变量前头，后缀版就是位于要操作的变量后头。前缀递增操作符会给数值加 1，把两个加号（++）放到变量前头即可：

这 4 个操作符可以作用于任何值，意思是不限于整数——字符串、布尔值、浮点值，甚至对象都可以。递增和递减操作符遵循如下规则。

- 对于字符串，如果是有效的数值形式，则转换为数值再应用改变。变量类型从字符串变成数值。
- 对于字符串，如果不是有效的数值形式，则将变量的值设置为 NaN 。变量类型从字符串变成数值。
- 对于布尔值，如果是 false，则转换为 0 再应用改变。变量类型从布尔值变成数值。
- 对于布尔值，如果是 true，则转换为 1 再应用改变。变量类型从布尔值变成数值。
- 对于浮点值，加 1 或减 1。
- 如果是对象，则调用其（第 5 章会详细介绍的）valueOf()方法取得可以操作的值。对得到的值应用上述规则。如果是 NaN，则调用 toString()并再次应用其他规则。变量类型从对象变成数值。

##  位操作符

是操作内存中表示数据的比特（位）。ECMAScript中的所有数值都以 IEEE 754 64 位格式存储，但位操作并不直接应用到 64 位表示，而是先把值转换为32 位整数，再进行位操作，之后再把结果转换为 64 位。对开发者而言，就好像只有 32 位整数一样，因为 64 位整数存储格式是不可见的。既然知道了这些，就只需要考虑 32 位整数即可。

有符号整数使用 32 位的前 31 位表示整数值。第 32 位表示数值的符号，如 0 表示正，1 表示负。这一位称为符号位（sign bit），它的值决定了数值其余部分的格式。正值以真正的二进制格式存储，即 31位中的每一位都代表 2 的幂。第一位（称为第 0 位）表示 20 ，第二位表示 21 ，依此类推。如果一个位是空的，则以0填充，相当于忽略不计。比如，数值18的二进制格式为00000000000000000000000000010010，或更精简的 10010。后者是用到的 5 个有效位，决定了实际的值

![](/intro/jsbase/img.png)

负值以一种称为二补数（或补码）的二进制编码存储。一个数值的二补数通过如下 3 个步骤计算得到：

- 确定绝对值的二进制表示（如，对于18，先确定 18 的二进制表示）；
- 找到数值的一补数（或反码），换句话说，就是每个 0 都变成 1，每个 1 都变成 0；
-  给结果加 1。

基于上述步骤确定-18 的二进制表示，首先从 18 的二进制表示开始：

0000 0000 0000 0000 0000 0000 0001 0010 

然后，计算一补数，即反转每一位的二进制值：

1111 1111 1111 1111 1111 1111 1110 1101 

最后，给一补数加 1：

1111 1111 1111 1111 1111 1111 1110 1101 

​									1

\---------------------------------------------------------------

1111 1111 1111 1111 1111 1111 1110 1110 

那么，-18 的二进制表示就是 11111111111111111111111111101110。要注意的是，在处理有符号整数时，我们无法访问第 31 位。

ECMAScript 会帮我们记录这些信息。在把负值输出为一个二进制字符串时，我们会得到一个前面加了减号的绝对值，如下所示：

```js
let num = -18; 
console.log(num.toString(2)); // "-10010"
```

在将18 转换为二进制字符串时，结果得到-10010。转换过程会求得二补数，然后再以更符合逻辑的形式表示出来。

> 默认情况下，ECMAScript 中的所有整数都表示为有符号数。不过，确实存在无符号整数。对无符号整数来说，第 32 位不表示符号，因为只有正值。无符号整数比有符号整数的范围更大，因为符号位被用来表示数值了。

在对 ECMAScript 中的数值应用位操作符时，后台会发生转换：64 位数值会转换为 32 位数值，然后执行位操作，最后再把结果从 32 位转换为 64 位存储起来。整个过程就像处理 32 位数值一样，这让二进制操作变得与其他语言中类似。但这个转换也导致了一个奇特的副作用，即特殊值NaN 和Infinity在位操作中都会被当成 0 处理。

如果将位操作符应用到非数值，那么首先会使用 Number()函数将该值转换为数值（这个过程是自动的），然后再应用位操作。最终结果是数值。

###  按位非

按位非操作符用波浪符（~）表示，它的作用是返回数值的一补数。按位非是 ECMAScript 中为数不多的几个二进制数学操作符之一。看下面的例子：

```js
let num1 = 25; // 二进制 00000000000000000000000000011001 
let num2 = ~num1; // 二进制 11111111111111111111111111100110 
console.log(num2); // -26
```

这里，按位非操作符作用到了数值 25，得到的结果是-26。由此可以看出，按位非的最终效果是对数值取反并减 1，就像执行如下操作的结果一样：

```js
let num1 = 25; 
let num2 = -num1 - 1; 
console.log(num2); // "-26"
```

实际上，尽管两者返回的结果一样，但位操作的速度快得多。这是因为位操作是在数值的底层表示上完成的。

### 按位与

按位与操作符用和号（&）表示，有两个操作数。本质上，按位与就是将两个数的每一个位对齐，然后基于真值表中的规则，对每一位执行相应的与操作。

| 第一个数值的位 | 第二个数值的位 | 第三个数值的位 |
| -------------- | -------------- | -------------- |
| 1              | 1              | 1              |
| 1              | 0              | 0              |
| 0              | 1              | 0              |
| 0              | 0              | 0              |

按位与操作在两个位都是 1 时返回 1，在任何一位是 0 时返回 0。

下面看一个例子，我们对数值 25 和 3 求与操作，如下所示：

```js
let result = 25 & 3; 
console.log(result); // 1
```

25 和 3 的按位与操作的结果是 1。为什么呢？看下面的二进制计算过程：

  25    =  0000 0000 0000 0000 0000 0000 0001 1001

​	3    = 0000 0000 0000 0000 0000 0000 0000 0011

\--------------------------------------------------------

AND = 0000 0000 0000 0000 0000 0000 0000 0001 

如上所示，25 和 3 的二进制表示中，只有第 0 位上的两个数都是 1。于是结果数值的所有其他位都会以 0 填充，因此结果就是 1。

### 按位或

按位或操作符用管道符（|）表示，同样有两个操作数。按位或遵循如下真值表：

| 第一个数值的位 | 第二个数值的位 | 第三个数值的位 |
| -------------- | -------------- | -------------- |
| 1              | 1              | 1              |
| 1              | 0              | 1              |
| 0              | 1              | 1              |
| 0              | 0              | 0              |

按位或操作在至少一位是 1 时返回 1，两位都是 0 时返回 0。

仍然用按位与的示例，如果对 25 和 3 执行按位或，代码如下所示：

```js
let result = 25 | 3; 
console.log(result); // 27
```

可见 25 和 3 的按位或操作的结果是 27：

  25    =  0000 0000 0000 0000 0000 0000 0001 1001

​	3    = 0000 0000 0000 0000 0000 0000 0000 0011

\--------------------------------------------------------

OR = 0000 0000 0000 0000 0000 0000 0001 1011 

在参与计算的两个数中，有 4 位都是 1，因此它们直接对应到结果上。二进制码 11011 等于 27。

### 按位异或

按位异或用脱字符（^）表示，同样有两个操作数。下面是按位异或的真值表：

| 第一个数值的位 | 第二个数值的位 | 第三个数值的位 |
| -------------- | -------------- | -------------- |
| 1              | 1              | 0              |
| 1              | 0              | 1              |
| 0              | 1              | 1              |
| 0              | 0              | 0              |

按位异或与按位或的区别是，它只在一位上是 1 的时候返回 1（两位都是 1 或 0，则返回 0）。

对数值 25 和 3 执行按位异或操作：

```js
let result = 25 ^ 3; 
console.log(result); // 26
```

  25    =  0000 0000 0000 0000 0000 0000 0001 1001

​	3    = 0000 0000 0000 0000 0000 0000 0000 0011

\--------------------------------------------------------

XOR = 0000 0000 0000 0000 0000 0000 0001 1010 

两个数在 4 位上都是 1，但两个数的第 0 位都是 1，因此那一位在结果中就变成了 0。其余位上的 1在另一个数上没有对应的 1，因此会直接传递到结果中。二进制码 11010 等于 26。（注意，这比对同样两个值执行按位或操作得到的结果小 1。）

### 左移

左移操作符用两个小于号（<<）表示，会按照指定的位数将数值的所有位向左移动。比如，如果数值 2（二进制 10）向左移 5 位，就会得到 64（二进制 1000000），如下所示:

```js
let oldValue = 2; // 等于二进制 10 
let newValue = oldValue << 5; // 等于二进制 1000000，即十进制 64
```

注意在移位后，数值右端会空出 5 位。左移会以 0 填充这些空位，让结果是完整的 32 位数值

![](/intro/jsbase/img_1.png)

注意，左移会保留它所操作数值的符号。比如，如果-2 左移 5 位，将得到-64，而不是正 64。

### 有符号右移

有符号右移由两个大于号（>>）表示，会将数值的所有 32 位都向右移，同时保留符号（正或负）。

有符号右移实际上是左移的逆运算。比如，如果将 64 右移 5 位，那就是 2：

```js
let oldValue = 64; // 等于二进制 1000000 
let newValue = oldValue >> 5; // 等于二进制 10，即十进制 2	
```

同样，移位后就会出现空位。不过，右移后空位会出现在左侧，且在符号位之后,ECMAScript 会用符号位的值来填充这些空位，以得到完整的数值。

![](/intro/jsbase/img_2.png)

###  无符号右移

无符号右移用 3 个大于号表示（>>>），会将数值的所有 32 位都向右移。对于正数，无符号右移与有符号右移结果相同。仍然以前面有符号右移的例子为例，64 向右移动 5 位，会变成 2：

```js
let oldValue = 64; // 等于二进制 1000000 
let newValue = oldValue >>> 5; // 等于二进制 10，即十进制 2
```

对于负数，有时候差异会非常大。与有符号右移不同，无符号右移会给空位补 0，而不管符号位是什么。对正数来说，这跟有符号右移效果相同。但对负数来说，结果就差太多了。无符号右移操作符将负数的二进制表示当成正数的二进制表示来处理。因为负数是其绝对值的二补数，所以右移之后结果变得非常之大，如下面的例子所示：

```js
let oldValue = -64; // 等于二进制 11111111111111111111111111000000 
let newValue = oldValue >>> 5; // 等于十进制 134217726
```

在对-64 无符号右移 5 位后，结果是 134 217 726。这是因为-64 的二进制表示是 11111111111111111111111111000000，无符号右移却将它当成正值，也就是 4 294 967 232。把这个值右移 5 位后，结果是00000111111111111111111111111110，即 134 217 726。

## 布尔操作符

对于编程语言来说，布尔操作符跟相等操作符几乎同样重要。如果没有能力测试两个值的关系，那么像 if-else 和循环这样的语句也没什么用了。布尔操作符一共有 3 个：逻辑非、逻辑与和逻辑或。

###  逻辑非

逻辑非操作符由一个叹号（!）表示，可应用给 ECMAScript 中的任何值。这个操作符始终返回布尔值，无论应用到的是什么数据类型。逻辑非操作符首先将操作数转换为布尔值，然后再对其取反。换句话说，逻辑非操作符会遵循如下规则。

- 如果操作数是对象，则返回 false。
- 如果操作数是空字符串，则返回 true。
- 如果操作数是非空字符串，则返回 false。
- 如果操作数是数值 0，则返回 true。
- 如果操作数是非 0 数值（包括 Infinity），则返回 false。
- 如果操作数是 null，则返回 true。
- 如果操作数是 NaN，则返回 true。
- 如果操作数是 undefined，则返回 true。

逻辑非操作符也可以用于把任意值转换为布尔值。同时使用两个叹号（!!），相当于调用了转型函数 Boolean()。无论操作数是什么类型，第一个叹号总会返回布尔值。第二个叹号对该布尔值取反，从而给出变量真正对应的布尔值。结果与对同一个值使用 Boolean()函数是一样的：

### 逻辑与

逻辑与操作符由两个和号（&&）表示，应用到两个值，如下所示：

```js
let result = true && false;
```

逻辑与操作符是一种短路操作符,如果第一个操作数决定了结果，那么永远不会对第二个操作数求值。

### 逻辑或

逻辑或操作符由两个管道符（||）表示，比如：

```js
let result = true || false;
```

同样与逻辑与类似，逻辑或操作符也具有短路的特性。只不过对逻辑或而言，第一个操作数求值为true，第二个操作数就不会再被求值了。

## 乘性操作符

ECMAScript 定义了 3 个乘性操作符：乘法、除法和取模。这些操作符跟它们在 Java、C 语言及 Perl中对应的操作符作用一样，但在处理非数值时，它们也会包含一些自动的类型转换。如果乘性操作符有不是数值的操作数，则该操作数会在后台被使用 Number()转型函数转换为数值。这意味着空字符串会被当成 0，而布尔值 true 会被当成 1。

### 乘法操作符

乘法操作符由一个星号（*）表示，可以用于计算两个数值的乘积。其语法类似于 C 语言

- 如果操作数都是数值，则执行常规的乘法运算，即两个正值相乘是正值，两个负值相乘也是正值，正负符号不同的值相乘得到负值。如果 ECMAScript 不能表示乘积，则返回 Infinity 或-Infinity。
- 如果有任一操作数是 NaN，则返回 NaN。
- 如果是 Infinity 乘以 0，则返回 NaN。
- 如果是 Infinity 乘以非 0的有限数值，则根据第二个操作数的符号返回 Infinity 或-Infinity。
- 如果是 Infinity 乘以 Infinity，则返回 Infinity。
- 如果有不是数值的操作数，则先在后台用 Number()将其转换为数值，然后再应用上述规则。

### 除法操作符

- 如果操作数都是数值，则执行常规的除法运算，即两个正值相除是正值，两个负值相除也是正值，符号不同的值相除得到负值。如果ECMAScript不能表示商，则返回Infinity或-Infinity。
- 如果有任一操作数是 NaN，则返回 NaN。
- 如果是 Infinity 除以 Infinity，则返回 NaN。
- 如果是 0 除以 0，则返回 NaN。
- 如果是非 0 的有限值除以 0，则根据第一个操作数的符号返回 Infinity 或-Infinity。
- 如果是 Infinity 除以任何数值，则根据第二个操作数的符号返回 Infinity 或-Infinity。
- 如果有不是数值的操作数，则先在后台用 Number()函数将其转换为数值，然后再应用上述规则。

### 取余操作符

- 如果操作数是数值，则执行常规除法运算，返回余数。
- 如果被除数是无限值，除数是有限值，则返回 NaN。
- 如果被除数是有限值，除数是 0，则返回 NaN。
- 如果是 Infinity 除以 Infinity，则返回 NaN。
- 如果被除数是有限值，除数是无限值，则返回被除数。
- 如果被除数是 0，除数不是 0，则返回 0。
- 如果有不是数值的操作数，则先在后台用 Number()函数将其转换为数值，然后再应用上述规则。

### 指数操作符

ECMAScript 7 新增了指数操作符，Math.pow()现在有了自己的操作符**，

```js
console.log(Math.pow(3, 2); // 9 
console.log(3 ** 2); // 9 
console.log(Math.pow(16, 0.5); // 4 
console.log(16** 0.5); // 4
```

不仅如此，指数操作符也有自己的指数赋值操作符**=，该操作符执行指数运算和结果的赋值操作

```js
let squared = 3; 
squared **= 2; 
console.log(squared); // 9
let sqrt = 16; 
sqrt **= 0.5; 
console.log(sqrt); // 4
```

## 加性操作符

加性操作符，即加法和减法操作符，一般都是编程语言中最简单的操作符。不过，在 ECMAScript中，这两个操作符拥有一些特殊的行为。与乘性操作符类似，加性操作符在后台会发生不同数据类型的转换。只不过对这两个操作符来说，转换规则不是那么直观。

### 加法操作符

加法操作符（+）用于求两个数的和，比如：

```js
let result = 1 + 2; 
```

如果两个操作数都是数值，加法操作符执行加法运算并根据如下规则返回结果：

- 如果有任一操作数是 NaN，则返回 NaN；
- 如果是 Infinity 加 Infinity，则返回 Infinity；
- 如果是-Infinity 加-Infinity，则返回-Infinity；
- 如果是 Infinity 加-Infinity，则返回 NaN；
- 如果是+0 加+0，则返回+0；
- 如果是-0 加+0，则返回+0；
- 如果是-0 加-0，则返回-0。
- 不过，如果有一个操作数是字符串，则要应用如下规则：
- 如果两个操作数都是字符串，则将第二个字符串拼接到第一个字符串后面；
- 如果只有一个操作数是字符串，则将另一个操作数转换为字符串，再将两个字符串拼接在一起。

如果有任一操作数是对象、数值或布尔值，则调用它们的 toString()方法以获取字符串，然后再应用前面的关于字符串的规则。对于 undefined 和 null，则调用 String()函数，分别获取"undefined"和"null"。



### 减法操作符

与加法操作符一样，减法操作符也有一组规则用于处理 ECMAScript 中不同类型之间的转换。

- 如果两个操作数都是数值，则执行数学减法运算并返回结果。
- 如果有任一操作数是 NaN，则返回 NaN。
- 如果是 Infinity 减 Infinity，则返回 NaN。
- 如果是-Infinity 减-Infinity，则返回 NaN。
- 如果是 Infinity 减-Infinity，则返回 Infinity。
- 如果是-Infinity 减 Infinity，则返回-Infinity。
- 如果是+0 减+0，则返回+0。
- 如果是+0 减-0，则返回-0。
- 如果是-0 减-0，则返回+0。
- 如果有任一操作数是字符串、布尔值、null 或 undefined，则先在后台使用 Number()将其转换为数值，然后再根据前面的规则执行数学运算。如果转换结果是 NaN，则减法计算的结果是NaN。
- 如果有任一操作数是对象，则调用其 valueOf()方法取得表示它的数值。如果该值是 NaN，则减法计算的结果是 NaN。如果对象没有 valueOf()方法，则调用其 toString()方法，然后再将得到的字符串转换为数值。

### 关系操作符

关系操作符执行比较两个值的操作，包括小于（<）、大于（>）、小于等于（<=）和大于等于（>=），用法跟数学课上学的一样。这几个操作符都返回布尔值，如下所示：

```js
let result1 = 5 > 3; // true 

let result2 = 5 < 3; // false 
```

ECMAScript 中的其他操作符一样，在将它们应用到不同数据类型时也会发生类型转换和其他行为。

- 如果操作数都是数值，则执行数值比较。
- 如果操作数都是字符串，则逐个比较字符串中对应字符的编码。
- 如果有任一操作数是数值，则将另一个操作数转换为数值，执行数值比较。
- 如果有任一操作数是对象，则调用其 valueOf()方法，取得结果后再根据前面的规则执行比较。
- 如果没有 valueOf()操作符，则调用 toString()方法，取得结果后再根据前面的规则执行比较。
- 如果有任一操作数是布尔值，则将其转换为数值再执行比较。

在使用关系操作符比较两个字符串时，会发生一个有趣的现象。很多人认为小于意味着“字母顺序靠前”，而大于意味着“字母顺序靠后”，实际上不是这么回事。对字符串而言，关系操作符会比较字符串中对应字符的编码，而这些编码是数值。比较完之后，会返回布尔值。问题的关键在于，大写字母的编码都小于小写字母的编码，因此以下这种情况就会发生：

```js
let result = "Brick" < "alphabet"; // true 
```

在这里，字符串"Brick"被认为小于字符串"alphabet"，因为字母 B 的编码是 66，字母 a 的编码是 97。要得到确实按字母顺序比较的结果，就必须把两者都转换为相同的大小写形式（全大写或全小写），然后再比较：

```js
let result = "Brick".toLowerCase() <"alphabet".toLowerCase(); // false
```

 

将两个操作数都转换为小写，就能保证按照字母表顺序判定"alphabet"在"Brick"前头。

另一个奇怪的现象是在比较两个数值字符串的时候，比如下面这个例子：

```js
let result = "23" < "3"; // true 
```

这里在比较字符串"23"和"3"时返回 true。因为两个操作数都是字符串，所以会逐个比较它们的字符编码（字符"2"的编码是 50，而字符"3"的编码是 51）。不过，如果有一个操作数是数值，那么比较的结果就对了：

```js
let result = "23" < 3; // false 
```

因为这次会将字符串"23"转换为数值 23，然后再跟 3 比较，结果当然对了。只要是数值和字符串比较，字符串就会先被转换为数值，然后进行数值比较。对于数值字符串而言，这样能保证结果正确。

但如果字符串不能转换成数值呢？比如下面这个例子：

```js
let result = "a" < 3; // 因为"a"会转换为 NaN，所以结果是 false 
```

因为字符"a"不能转换成任何有意义的数值，所以只能转换为 NaN。这里有一个规则，即任何关系操作符在涉及比较 NaN 时都返回 false。这样一来，下面的例子有趣了：

```js
let result1 = NaN < 3; // false 

let result2 = NaN >= 3; // false 
```

在大多数比较的场景中，如果一个值不小于另一个值，那就一定大于或等于它。但在比较 NaN 时，无论是小于还是大于等于，比较的结果都会返回 false。