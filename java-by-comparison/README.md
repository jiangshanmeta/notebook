# [Java By Comparison](https://book.douban.com/subject/33067913/)

这本书其实是关于 Clean Code 的

## Start Cleaning Up

### Avoid Unnecessary Comparisons

不需要在if语句或者 ternary operation中和boolean类型比较

### Avoid Negations

取反会增加理解的负担

### Return Boolean Expressions Directly

### Avoid NullPointerException in Conditionals

先判空再做其他的操作

### Avoid Switch Fallthrough

### Always Use Braces

在Java和JavaScript中，if 分支如果只有一行可以省略braces，但是这是个code smell

## Level Up Your Code Style

### Replace Magic Numbers with Constants

### Favor Enums Over Integer Constants

### Favor For-Each Over For Loops

### Avoid Collection Modification During Iteration

### Avoid Compute-Intense Operations During Iteration

书中给的例子是在循环中正则判断，但是因为Pattern对象不可变，所以可以从循环中抽离出来，不需要每次迭代生成Pattern对象

### Group with New Lines

用空行分割不同的逻辑单元

### Favor Format Over Concatenation

推荐使用```String.format```这个方法，而不是字符串拼接。记得字符串拼接底层会用```StringBuilder```优化，但是依然会有可读性问题。

### Favor Java API over DIY

## Use Comments Wisely

其实我不是很同意这一章，我是倾向于 zero-comment 的

## Name Things Right

### [Use Java Naming Conventions](https://www.oracle.com/java/technologies/javase/codeconventions-namingconventions.html)

### Follow Getter/Setter Conventions for Frameworks

### Avoid Single-Letter Names

### Avoid Abbreviations

### Avoid Meaningless Terms

例如 **main** 、**manager** 、 **data** 、**info** 这种

### Use Domain Terminology

## Prepare for Things Going Wrong

### Fail Fast

函数先校验，校验完再处理正常逻辑

### Always Catch Most Specific Exception

### Explain Cause in Message

在异常中添加错误信息

### Avoid Breaking the Cause Chain

重新抛出异常时把原始异常也带上，为debug提供更多的context

### Expose Cause in Variable

使用自定义Exception

### Always Check Type Before Cast

### Always Close Resources

使用 try-with-resources 处理资源的关闭

### Always Close Multiple Resources

使用 try-with-resources

### Explain Empty Catch

## Assert Things Going Right

### Structure Tests Into Given-When-Then

其实是上面 **Group with New Lines** 针对单元测试的特化版

### Using Meaningful Assertions

避免使用**assertTrue** 这种API，推荐使用 **assertEquals** 这种更有意义报错更友好的断言

### Expected Before Actual Value

JUnit的规范，期望值放在前 实际值放在后

### Use Reasonable Tolerance Values

对于浮点数的比较提供一个误差值

### Let JUnit Handle Exceptions

### Describe Your Tests

JUnit提供了一个 ```@DisplayName``` annotation 用来描述 test case

### Favor Standalone Tests

避免使用 ```@BeforeEach``` 和 ```@BeforeAll``` 这种setup方法，提供静态辅助方法。

同样的观点在 [The Art of Unit Testing, Third Edition](https://book.douban.com/subject/34944396/)中也有体现

### Parametrize Your Tests

这样可以用同样的代码跑多组数据。但是我还是比较倾向于分开写。

### Cover the Edge Cases

## Design Your Objects

### Split Method with Boolean Parameters

如果在参数中有个boolean参数，起到开关作用，可以针对这两个分支分别拆函数出来

### Split Method with Optional Parameters

根据书中的代码，这里的 Optional 是指 可以为 null ，然后根据是否为 null执行不同的逻辑。在这里null起到了上一条的开关的作用。

拆两个函数，一个要求那个 Optional Parameter 非空，另一个直接干掉那个 Optional Parameter

### Favor Abstract Over Concrete Types

例如 函数参数和返回值 类型 使用 List 而不是 ArrayList

> Coding to interfaces, not implementation

### Favor Immutable Over Mutable State

### Combine State and Behavior

不要暴露state，暴露行为

### Avoid Leaking References

```java
public class Inventory {
    private final List<String> supplies;

    public Inventory(List<String> supplies) {
        // make a copy
        this.supplies = new ArrayList<>(supplies);
    }
    
    List<String> getSupplies(){
        // return unmodified version
        return Collections.unmodifiableList(supplies);
    }
}
```

### Avoid Returing Null

## Let Your Data Flow

### Favor Lambdas Over Anonymous Classes

### Favor Functional Over Imperative Style

### Favor Method References Over Lambdas

### Avoid Side Effects

### Use Collect for Terminating Complex Streams

### Avoid Exceptions in Streams

但是在 Intermediate Operator中依然会遇到异常，这时可以考虑结合 ```flatMap```和 ```Stream.of``` 以及 ```Stream.empty```方法，异常返回 ```Stream.empty()```

### Favor Optional Over Null

### Avoid Optional Fields or Parameters

避免field或者参数中有Optional，但是返回值可以是Optional的。

因为传参或者字段本身如果是Optional，依然可以为null。

但这样就违背了Getter/Setter的convention了

### Use Optionals as Streams

Optional本身可以看作是一个最多有一个值的Stream。Optional也提供了诸如```filter``` 和 ```map```这样的方法

## Prepare for the Real World

### Use Static Code Analysis Tools

### Agree On the Java Format in Your Team

### Automate Your Build

### Use Continuous Integration

### Prepare for and Deliver Into Production

### Favor Logging Over Console Output

### Minimize and Isolate Multithread Code

// TODO 对多线程深入了解

### Use High-Level Concurrency Abstractions

// TODO 对兵法深入了解

### Speed Up Your Program

基于Benchmark优化，例如使用 parallelStream

### Know your Falsehoods

对于Domain Knowledge 了解
