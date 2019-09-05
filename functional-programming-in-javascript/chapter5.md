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

## Maybe Monad 处理null

```javascript
class Maybe{
    static just(a){
        return new Just(a);
    }

    static nothing(){
        return new Nothing();
    }
    // 空值用Nothing包裹 非空用Just包裹
    static fromNullable(a){
        return a !== null?this.just(a):this.nothing();
    }

    static of(a){
        return this.just(a);
    }

    get isJust(){
        return false;
    }

    get isNothing(){
        return false;
    }
}

class Just extends Maybe{
    constructor(value){
        super();
        this._value = value;
    }

    get isJust(){
        return true;
    }

    get value(){
        return this._value;
    }

    map(f){
        return Mayber.of(f(this._value))
    }

    getOrElse(){
        return this._value;
    }

}

class Nothing extends Maybe{
    // 对Nothing做map 返回一个Nothing
    map(f){
        return this;
    }

    getOrElse(other){
        return other;
    }

    get value(){
        throw new TypeError("Can't extract value of nothing")
    }

    get isNothing(){
        return true;
    }
}
```

## Either Monad 处理异常

```javascript
class Either {
    constructor(value){
        this._value = value;
    }

    static left(a){
        return new Left(a);
    }

    static Right(a){
        return new Right(a);
    }

    static of(a){
        return new Right(a);
    }
}

// Left是对异常的包裹
class Left extends Either{
    map(){
        return this;
    }

    get value(){
        throw new TypeError("Can't extract the value of Left");
    }

    getOrElse(other){
        return other
    }

    // orElse 方法仅将函数f应用到Left上，不应用到Right上
    orElse(f){
        return f(this._value)
    }
}
// Right包含一个成功的值
class Right extends Either{
    map(f){
        return Either.of(f(this._value))
    }

    get value(){
        return this._value;
    }

    getOrElse(){
        return this._value;
    }

    orElse(){
        return this;
    }

}
```
