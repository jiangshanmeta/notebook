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
