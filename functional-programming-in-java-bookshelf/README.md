# [functional-programming-in-java-bookshelf](https://book.douban.com/subject/36808637/)

## Error Handling

Either Monad

```java
public sealed interface Try<T> permits Failure, Success {
    T getResult();
    Throwable getError();
    
    static <T> Try<T> of(Callable<T> code){
       try{
           return new Success<>(code.call());
       } catch (Throwable throwable) {
           return new Failure<>(throwable);
       }
    }

    default <R> Try<R> map(Function<T,R> mapper){
        if(this instanceof Success<T>){
            return of(()->mapper.apply(getResult()) );
        }else{
            return new Failure<>(getError());
        }
    }

}

public record Success<T>(T result) implements Try<T> {

    @Override
    public T getResult() {
        return result;
    }

    @Override
    public Throwable getError() {
        throw new RuntimeException("Invalid invocation");
    }
}

public record Failure<T>(Throwable throwable) implements Try<T> {
    @Override
    public T getResult() {
        throw new RuntimeException("Invalid invocation");
    }

    @Override
    public Throwable getError() {
        return throwable;
    }
}
```

## Functional Programming Idioms

* Don't write dense lambda expressions (avoid multiline lambda expressions)
* Prefer method references
* Keep separate conditions in separate filters
* Use Type Inference for Parameters
* Avoid side effects in functional pipelines
