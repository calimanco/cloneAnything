# cloneAnything

> 一个高保真深度复制的小工具，可复制各种对象。

## 使用方法：（参见test.html）

```javascript
// 传入需要被复制的对象即可，返回复制完成的对象。
cloneAnything(objectToBeCloned)
```

## 说明

算法参考：<https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/The_structured_clone_algorithm>

js的浅复制：对应地址传递的概念，即复制对象只是复制引用地址。<br>
js的深复制：对应值传递的概念，即复制对象会生成独立于原来的内存空间。<br>

这个小工具就是复制对象生成独立副本，原理简单来说就是递归遍历，尽量使用原对象的构造器生成新对象，对Number、String等有字面量的特殊对象进行转换。

兼容性：  
由于使用JSON.stringify()和JSON.parse()对字面量进行转换，所以只支持IE8+。  

理论上支持所有对象，但可能还有没有考虑到的特殊情况，欢迎issue讨论。  
已知的支持类型：
* 所有的原始类型
* Boolean 对象
* String 对象
* Number 对象
* Date
* RegExp
* Array
* DOM （所有继承自Node、NodeList、HTMLCollection的对象）
* Function
* 自定义构造函数生成对象

### 注意：

1. 对于非对象，即instanceof Object为否的对象将直接赋值给新对象。
2. 对于Function也是直接赋值给新对象，虽然这里还是地址传递，但函数在运行过程不会被修改内容，其实也无所谓。
3. 对于new Number()，new String()，new Boolean()的对象会转换为字面量，避免歧义。
4. 对于DOM对象会使用cloneNode(true)进行深度克隆。
5. 对于NodeList、HTMLCollection之类的DOM对象集合，会转换成数组。
6. 由于使用原对象构造器生成新对象，并且不遍历原型链，所以请确保在类继承过程中保证Object.prototype.constructor的正确指向。
