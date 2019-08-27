# 种子模块

## 命名空间

曾经有一些库，它们的设计思想是对JavaScript原生对象进行扩展，好处是可以让用户感知不到库的存在，但是由于污染了原生对象，和其它同类的库兼容会出问题。这种类型的库代表为Prototype、mootools

后来大部分的库都会有一个命名空间，尽可能减少对其它对象的污染

## 对象扩展(mixin)

关于mixin，现在有个API ```Object.assign```，这个方法只支持浅拷贝不支持深拷贝，我们看一下它的polyfill吧：

```javascript
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      let to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (let nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            // 例如Object.create(null)创造的对象
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
```

## 数组化

数组化这个问题现在也已经标准化出了```Array.from```和```Array.of```两个方法

首先看一下Array.from的[polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from):

```javascript
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };
    var toItems = function (value) {
      // support set
      if (value.size > 0 && value.values) {
        let values = value.values()
        var it = values.next()
        var o = []
        while (!it.done) {
          o.push(it.value)
          it = values.next()
        }
        return o
      }
      return Object(value);
    };
    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = toItems(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}
```

然后看一下Array.of的[polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)：

```javascript
if (!Array.of) {
  Array.of = function() {
    return Array.prototype.slice.call(arguments);
  };
}
```

文中提到的数组化方法原理和上面的polyfill类似，一个是用Array.prototype.slice方法，一个是遍历放到新数组中

## 类型判断

以前看[underscore源码的时候整理过类型判断](https://github.com/jiangshanmeta/underscore_source_analysis/blob/master/utility/type.md)

## 主流框架的引入——domReady

如何实现类似于jQuery的ready方法

```javascript
var readyList = [];
function noop(){}

function fireReadyList(){
    for(var i=0;i<readyList.length;i++){
        readyList[i]();
    }
    readyList = null;
    fireReadyList = noop;
}
// 要实现的ready
function ready(fn){
    if(readyList){
        readyList.push(fn);
    }else{
        fn();
    }
}

// 怕错过了DOMContentLoaded事件
if(document.readyState === "complete"){
    fireReadyList();
}else{
    document.addEventListener('DOMContentLoaded',function(){
        fireReadyList();
    });
}
```

## 无冲突处理

```javascript
var _jQuery = window.jQuery
var _$ = window.$
jQuery.extend({
    noConflict:function(deep){
        window.$ = _$
        if(deep){
            window.jQuery = _jQuery
        }
        return jQuery
    }
})
```
