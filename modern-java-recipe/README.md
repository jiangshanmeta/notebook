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
