# [A Functional Approach to Java](https://book.douban.com/subject/36730694/)

## An Introduction to Functional Programming

### Functional Programming Concepts

#### Pure Functions

Pure functions have two elemental guarantees:

* The same input will always create the same output
* They are self-contained without any kind of side effect

#### Referential Transparency

You can replace pure functions with their respective evaluated result for any furthur invocations without changing the behavior of your program.

#### Immutability

With immutability, data structures can no longer change after their initialization. By never changing, they are always consistent, side-effect-free, predictable, and easier to reason with. Like pure functions, their usage is safe in concurrent and parallel environments without the usual issues of unsynchronized access or out-of-process state changes.

#### First-Class and Higher-Order Functions

Functions need to be assignable to variables and be used as arguments and return values in other functions and expressions.

Higher-order functions use this first-class citizenship to accept functions as arguments or return a function as their result, or both.

#### Functional Composition

#### Currying

#### Partial Function Application

Partial function application is the process of creating a new function by providing only a subset of the required arguments to an existing one.

#### Lazy Evaluation

Lazy evaluation is an evaluation strategy that delays the evaluation of an expression until its result is literally needed by separating the concerns of how you create an expression from when you actually use it.

### Advantages of Functional Programming

* Simplicity
* Consistency
* (Mathmatical) correctness
* Safer concurrency
* Modularity
* Testability

## Functional Java

* Functional interface are concrete types and representations of Java lambdas
* Lambda expressions are not syntactic sugar to anonymous classes
* Outside variables need to be effectively final to be used in lambdas, but this makes only the references immutable, not the undelying data structure.
* Method references are a concise altenative for matching method signatures and lambda definitions.

## Functional Interfaces of the JDK

Big Four Functional Interface Variants:

* Functions
* Consumers
* Suppliers
* Predicates

Function Composition

* Function
  * compose
  * andThen
* Predicate
  * and
  * or
  * negate
* Consumer
  * andThen

## Immutability

* String
* Immutable Collections
  * Unmodifiable Collections.
    Static methods like ```Collections.unmodifiableList``` and ```Collections.unmodifiableSet``` only provide "unmodifiable view" , but the underlying Collection is still modifiable
  * Immutable Collection factory methods
    * List.of
    * Set.of
    * Map.of
  * Immutable copies (Instead of being a mere view, copyOf creates a new container, holding its own references to the elements )
    * List.copyOf
    * Set.copyOf
    * Map.copyOf
* Primitive Wrapper
* Immutable Math
  * BigInteger
  * BigDecimal
* java.time
* Records

## Working with Records

### Record Validation and Data Scrubbing

```java
import java.time.LocalDateTime;
import java.util.Objects;

public record User( String username, boolean active, LocalDateTime lastLogin) {
    public User {
        Objects.requireNonNull(username);
        Objects.requireNonNull(lastLogin);

        // normalize
        username = username.toLowerCase();
    }
}
```

### Increasing Immutability

```java
import java.util.Collections;
import java.util.List;

public record IncreaseImmutability(List<String> values) {
    public IncreaseImmutability {
        values = Collections.unmodifiableList(values);
    }
}
```

### Record as Local Nominal Tuples ( improve expressiveness )

```java
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

public class Album {
    record AlbumPerYear(int year, List<String> titles){
        public AlbumPerYear(Map.Entry<Integer,List<String>> entry){
            this(entry.getKey(),entry.getValue());
        }
        
        public static Predicate<AlbumPerYear> minimumYear(int year){
            return albumPerYear -> albumPerYear.year()>=year;
        }
        
        public static Comparator<AlbumPerYear> sortByYear(){
            return Comparator.comparing(AlbumPerYear::year);
        }
        
    }
    
    public List<String> filterAlbums(Map<Integer, List<String>> albums, int minimumYear ){
        return albums.entrySet()
                .stream()
                .map(AlbumPerYear::new)
                .filter(AlbumPerYear.minimumYear(minimumYear))
                .sorted(AlbumPerYear.sortByYear())
                .map(AlbumPerYear::titles)
                .flatMap(List::stream)
                .toList();
    }
    
}
```

## Data Processing with Streams

Stream Features

* Lazy Evaluation
* (Mostly) stateless and non-interfering ( operations won't affect the underlying data source in any way, nor does the Stream itself store any elements )
* Optimizations included
* Less boilerplate
* Non-reusable
* Easy parallelization

Intermediate Operation

Terminal Operation

## Working with Streams

### Primitive Streams

* IntStream
* LongStream
* DoubleStream

### Iterative Streams

```java
Stream.iterate("",str->str + "ab").limit(5).forEachOrdered(System.out::println);
```

Primitive Streams

```java
IntStream.range(0,5).forEachOrdered(System.out::println);

IntStream.rangeClosed(0,5).forEachOrdered(System.out::println);
```

### From Arrays to Streams and Back

```java
String[] fruits = new String[]{"Apple","Banana","Melon"};

String[] result = Arrays.stream(fruits).filter(fruit->fruit.contains("a")).toArray(String[]::new);
```

## Parallel Data Processing with Streams

## Handing null with Optionals

## Functional Exception Handling

Not Throwing Exceptions

```java
Optional<String> safeReadString(Path path){
  try{
    var content = Files.readString(path);
    return Optional.of(content);
  }catch (IOException e){
    return Optional.empty();
  }
}
```

use optional instead of exception

## Lazy Evaluation

```java
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

public class Thunk<T> implements Supplier<T> {
    private Supplier<T> holder;

    private Thunk(Supplier<T> expression) {
        this.holder = () -> evaluate(expression);
    }

    public static <T> Thunk<T> of(Supplier<T> supplier) {
        if (supplier instanceof Thunk<T>) {
            return (Thunk<T>) supplier;
        }

        return new Thunk<T>(supplier);
    }

    public static <T> Thunk<T> of(T value) {
        return new Thunk<T>(() -> value);
    }
    // multi thread
    private synchronized T evaluate(Supplier<T> supplier) {
        if (!(this.holder instanceof Holder)) {
            var evaluated = supplier.get();
            this.holder = new Holder<>(evaluated);
        }
        return this.holder.get();
    }

    @Override
    public T get() {
        return this.holder.get();
    }

    public <R> Thunk<R> map(Function<T, R> mapper) {
        return Thunk.of(() -> mapper.apply(get()));
    }

    public void accept(Consumer<T> consumer) {
        consumer.accept(get());
    }

    // cache the result
    private record Holder<T>(T value) implements Supplier<T> {

        @Override
        public T get() {
            return this.value;
        }
    }


}
```

## Asynchronous Tasks

CompletableFuture

## Functional Design Patterns

### Factory Pattern

```java
public interface Shape {
    int corners();
    Color color();
    ShapeType type();
}
public enum Color {
    RED,
    GREEN,
    BLUE;
}
public record Circle(Color color) implements Shape{
    @Override
    public int corners() {
        return 0;
    }

    @Override
    public ShapeType type() {
        return ShapeType.CIRCLE;
    }
}

// factory 和 enum 合并起来
public enum ShapeType {
    CIRCLE(Circle::new),
    TRIANGLE(Triangle::new);

    private final Function<Color,Shape> factory;
    ShapeType(Function<Color,Shape> factory){
        this.factory = factory;
    }

    public Shape newInstance(Color color){
        return this.factory.apply(color);
    }
}
```

传统的 factory 模式会单独写一个类 ShapeFactory 并提供一个静态方法 作为工厂方法，在这个方法中会根据 传入的 ShapeType 创建实例。但是每次枚举一扩展就要扩展这个 ShapeFacotry方法，可能会造成遗漏。 上面代码把枚举和工厂合二为一，避免这个问题。

high cohesion

### Decorator Pattern

```java
public interface CoffeeMaker {
    List<String> getIngredients();
    Coffee prepare();
}
public class BlackCoffeeMaker implements CoffeeMaker {
    @Override
    public List<String> getIngredients() {
        return List.of("Robusta Beans","Water");
    }

    @Override
    public Coffee prepare() {
        return new BlackCoffee();
    }
}

```

我们有一个 interface CoffeeMaker , 它可以有很多的具体实现class，例如上面的 BlackCoffeeMaker。我们要对CoffeeMaker装饰

```java
public abstract class Decorator implements CoffeeMaker {
    private final CoffeeMaker target;

    protected Decorator(CoffeeMaker target) {
        this.target = target;
    }

    @Override
    public List<String> getIngredients(){
        return this.target.getIngredients();
    }

    @Override
    public Coffee prepare(){
        return this.target.prepare();
    }
}
public class AddMilkDecorator extends Decorator{

    protected AddMilkDecorator(CoffeeMaker target) {
        super(target);
    }

    @Override
    public List<String> getIngredients() {
        var ingredients = new ArrayList<>(super.getIngredients());
        ingredients.add("Milk");
        return ingredients;
    }

    @Override
    public Coffee prepare() {
        System.out.println("add milk prepare");
        return super.prepare();
    }
}
```

使用 decorator 要这样

```java
CoffeeMaker maker = new AddMilkDecorator(new BlackCoffeeMaker());
```

可以使用多个decorator，上面的语句就会有很多嵌套。

functional的方式：

```java
public final class Barista {
    private Barista(){

    }

    public static CoffeeMaker decorate(CoffeeMaker coffeeMaker, Function<CoffeeMaker,CoffeeMaker>... decorators){
        // 多个decorator一起使用， decorator这里就是 CofferMaker -> CoffeeMaker
        Function<CoffeeMaker,CoffeeMaker> reducedDecorators = Arrays.stream(decorators).reduce(Function.identity(),Function::andThen );

        return reducedDecorators.apply(coffeeMaker);
    }
}
```

这里 decorator 的创建也可以借助 静态函数

```java
public static Function<CoffeeMaker,CoffeeMaker> addMilk(){
    return AddMilkDecorator::new;
}
```

函数式写法可以减少显式代码嵌套(一层层装饰器)，避免暴露具体的类型 (AddMilkDecorator 可以设为package level， 通过 静态方法使用 )
