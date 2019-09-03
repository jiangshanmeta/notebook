# 针对复杂应用的设计模式

这一章主要介绍了Monad。我们目前可以把Monad仅仅当作一个容器

## 基础Monad

```javascript
class Wrapper{
    constructor(value){
        this._value = value;
    }

    static of(val){
        return new Wrapper(val);
    }
    // 映射出新的monad
    map(f){
        return Wrapper.of(f(this._value))
    }
    // 处理多层monad嵌套问题，只保留一层包装
    join(){
        if(this.value instanceof Wrapper){
            return this.value.join();
        }else{
            return this;
        }
    }

}
```
