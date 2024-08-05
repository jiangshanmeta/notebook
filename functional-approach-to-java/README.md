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
