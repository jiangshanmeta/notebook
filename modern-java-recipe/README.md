# [modern-java-recipe](https://book.douban.com/subject/27088096/)

## The Basics

* Lambda Expressions
* Method References
* Constructor References ( a special case of Method Reference )
* Functional Interfaces
* Default Methods in Interfaces
* Static Methods in Interfaces

## The java.util.function Package

* Consumer
* Supplier
* Predicate
* Function

## Streams

* Creating Streams
  * Stream.of
  * Stream.iterate
  * Stream.generate
  * Arrays.stream
  * Collection.stream
  * IntStream.range IntStream.rangeClosed
* Boxed Streams
  * IntStream.boxed
  * IntStream.mapToObj
* Reduction Oprations Using Reduce
  * reduce
  * count
  * max
  * min
  * average
  * collect
* Check Sorting Using Reduce ( BinaryOperator assert and return current )
* Debugging Streams with peek ( peek intermediate operation)
* Converting Strings to Streams and Back

```java
public static boolean isPalindrome(String s) {
    String forward = s.toLowerCase().codePoints().filter(Character::isLetterOrDigit).collect(
            StringBuilder::new,
            StringBuilder::appendCodePoint,
            StringBuilder::append
    ).toString();

    String backward = new StringBuilder(forward).reverse().toString();

    return forward.equals(backward);
}
```

* Counting Elements
  * count terminal operator
  * Collectors.counting()
* Summary Statistics (  summaryStatistics terminal operator  )
* Finding the first Element in a Stream ( findFirst findAny )
* Using anyMatch allMatch noneMatch
* Stream flatMap Versus map ( use flatMap to flatten substream into one stream )
* Concatenating Streams ( using static method Stream.concat to concat 2 streams )
* Lazy Streams ( streams are already lazy )

## Comparators and Collectors

* Sorting using a Comparator
* Converting a Stream into a Collection ( toList toSet toCollection )
* Adding a Linear Collection to a Map ( Function.identity )
* Sorting Maps ( Map.Entry.comparingByKey Map.Entry.comparingByValue )
* Partitioning and Grouping
* Downstream Collectors
* Finding Max and Min Values
  * max terminal operator
  * min terminal operator
  * Collectors.maxBy
  * Collectors.minBy
* Creading Immutable Collections

```java
public final <T> List<T> createImmutableList(T... elements){
    return Arrays.stream(elements).collect(Collectors.toUnmodifiableList());
}

public final <T> Set<T> createImmutableSet(T... elements){
    return Arrays.stream(elements).collect(Collectors.toUnmodifiableSet());
}
```

* Implementing the Collector Interface

## Issues with Streams, Lambdas, and Method References

* The java.util.Objects Class ( some useful utility method)
  * requireNotNull
  * isNull
  * nonNull
* Lambdas and Effectively Final
* Streams of Random Numbers ( Use the static ints, longs and doubles methods in java.util.Random )
* Default Methods in Map
  * computeIfAbsent
  * computeIfPresent
  * forEach
  * getOrDefault
  * merge
  * putIfAbsent
  * remove
  * replace
  * replaceAll
* Default Method Conflict
  * In any conflict between a method in a class and a default method in an interface, the class always wins.
  * If the conflict comes between two interfaces where one is a descendant of the other, then the descendant wins, the same way they do in classes
  * If there is no inheritance relationship between the two defaults, the class will not compile
* Iterating Over Collections and Maps ( forEach method )
* Logging with a Supplier
* Closure Composition
  * compose in Function
  * andThen in Function
  * andThen in Consumer
  * and in Predicate
  * or in Predicate
  * negate in Predicate

## The Optional Type

* Creating an Optional
  * Optional.empty
  * Optional.of
  * Optional.ofNullable
* Retrieving Values from an Optional
  * get
  * ifPresent
  * orElse
  * orElseGet
  * orElseThrow
* Optional in Getters and Setters ( wrap the result of getter methods in Optionals, but don't do the same for setters ) ( not follow javabean convention )
* Optional flatMap Versus map ( use flatMap to avoid wrapping an Optional inside another Optional )
* Mapping Optional ( map and stream )

## File I/O

* Process Files ( use the static lines method in java.nio.file.Files to return the contents of a file as a stream )
* Retrieving Files as a Stream ( Use the static Files.list method to return Path as a stream )
* Walking the Filesystem ( use the static Files.walk to perform a depth-first traversal of the filesystem )
* Searching the Filesystem ( use the static Files.find method )

## The java.time Package

* Using the Basic Date-Time Classes
  * Instant
  * Duration
  * Period
  * LocalDate
  * LocalTime
  * LocalDateTime
  * ZonedDateTime
* Creating Dates and Times from Existing Instances (use plus minus with method )
* Parsing and Formatting ( DateTimeFormatter )

```java
LocalDateTime now = LocalDateTime.now();
String textNow = now.format(DateTimeFormatter.ISO_DATE_TIME);

LocalDateTime dateTime = LocalDateTime.parse(textNow,DateTimeFormatter.ISO_DATE_TIME);
```

## Parallelism and Concurrency

Concurrency is when multiple tasks can run in overlapping time periods

Parallelism is when multiple tasks run at literally the same time

* Converting from Sequential to Parallel Streams

```java
List<Integer> numbers = Arrays.asList(1,3,5,7,9);

boolean isParallel = numbers.parallelStream().isParallel();
boolean alsoIsParallel = numbers.stream().parallel().isParallel();
```

* WWhen Parallel helps
  * A large amount of data , or
  * A time-consuming process for each element, and
  * A source of data that is easy to divide  ( LinkedList, Stream.iterate are hard to split ) , and
  * Operations that are stateless and associative ( order doesn't matter )
* The Future Interface

```java
ExecutorService service = Executors.newCachedThreadPool();

Future<String> future = service.submit(()->{
    Thread.sleep(1000);
    return "Hello World";
});

System.out.println("processing");

try{
    if(!future.isCancelled()){
        System.out.println(future.get()); // blocking call
    }else{
        System.out.println("Cancelled");
    }
}catch (InterruptedException | ExecutionException e){
    e.printStackTrace();
}
```

* Completing a CompletableFuture

```java
CompletableFuture<String> future1 = new CompletableFuture<>();
future1.complete("str1");

CompletableFuture<String> future2 = CompletableFuture.completedFuture("str2"); // like Promise.resolve

CompletableFuture<String> future3 = CompletableFuture.supplyAsync(()->"str3"); // like new Promise((resolve)=>resolve("str3"))
```

* Coodinating CompletableFutures ( use thenApply thenCompose thenRun to trigger another action ater completion of one Future  )
