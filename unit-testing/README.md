# [Unit Testing](https://book.douban.com/subject/34429421/)

这本书的主题是 how to write good unit tests

## The goal of unit testing

The goal is to enable **sustainable** growth of the software project.

单元测试的目标是赋能软件项目的持续发展。随着项目发展，为了改动很小的功能可能需要花费很大的工作量。

![Software Entrophy](./softwareEntropy.png)

这种现象有个专有名词 **Software Entrophy** 软件熵 ， 还有个词 **deterioration** 代码腐化， 通俗的说法是祖传代码改不动了。

单元测试能减少代码腐化速度，一个表现是UT可以促进好的 code design , 因为可测试的代码一般是高内聚低耦合的。当然 代码的可测试性是代码质量的 negative indicator , 可测试的代码依然可以写的很烂。

为了实现UT的的目标，我们要写出好的单元测试来。

如何写出好的单元测试，增加UT数量吗？

> Not all tests are created equal

单纯的增加单元测试的数量并不能实现UT的目标，需要考虑测试的价值和成本。测试的成本包括了：

* 重构代码时所需要的对于测试的修改 (TODO Refactor不应该有很多UT更改， Restructure 才会 )
* UT运行时间
* 误报的处理
* 阅读理解成本

> Tests are code

> Code is a liability, not an asset

我们平时可能认为Test Code不像Production Code一样严肃，写得放飞自我，但是测试代码也是代码，写得放飞技术债迟早要还。

增加coverage能保证好的UT吗？

也不能。line coverage很容易虚高 （比如 assertion-free testing），branch coverage 相对合理一点，但是也不能保证 verify all the outcomes ( 《单元测试的艺术》中提到了三种outcome )

上面提到了 测试数量 和 覆盖率都是 good negative indicator 同时也是 bad positive indicator. 他们是好的UT的必要不充分条件。

那到底是什么好的单元测试呢，作者提出了这么几条guideline：

* It's integrated into the development cycle
* It targets only the most important parts of your code base ( domain model )
* It provides maximum value with minimum maintanance costs

## What is a unit test

A unit test is an automated test that :

* Verifies a small piece of code
* Does it quickly
* Does it in an isolated manner

Unit Test分为两个流派：

![UT School](./utSchool.png)

虽然作者说classic School更为经典，但是我似乎接触的更多的是London School。

London School认为Unit是指一个class，测试中要通过使用 **Test Double** 与其他类进行隔离。如果使用了真实的class在这个派别看来算是 integration test 了。

Classic School认为Unit是一个具体的功能，它可能包含一个或者多个class。要分离的是 Unit Tests 而不是Units，要破除的依赖是 Shared depencency 。

![Hierachy of dependencies](./dependency.png)

> A shared dependency is a dependency that is shared between tests and provides
means for those tests to affect each other’s outcome. A typical example of shared
dependencies is a static mutable field. A change to such a field is visible across all
unit tests running within the same process. A database is another typical example of
a shared dependency.

> A private dependency is a dependency that is not shared.

图中 **Value Object**指那些不可变的(所以还是FP好)

E2E tests are a subset of integration integration test.

E2E测试和integration测试区别更多在于用的真实dependency的多少。E2E显然更接近于生产的情况。

其实我觉得这一章有点太学院派了。我更倾向于 《The Art of Unit Testing》的观点，从单元测试到E2E测试是一个dependency的mock从多到少的过程，在这条连续谱带上会有 unit test、component test、integration test、e2e isolated test 、 e2e system test 。我们的测试应该是 layered ， connect low-level and high-level tests.

至于对于 mutable private dependency 的处理，一般也不会这么教条非要按照一个方式，要做trade-off, 工程是妥协的艺术。

## The anatomy of a unit test

这一章主要讲的是UT的Pattern

### Using the AAA pattern & Droopping the arrange act and assert comments from tests

Arrange Act和Assert构成一个单元测试。也有的地方称之为 Given-When-Then 。

有些人为了区分这三部分，喜欢写注释。结合本书和 《Java By Comparison》的观点，这三者分割应该用空行。

### Aoid multiple arrange, act and assert sections

这意味着在 verify multiple units of behaviour, 更像是 integration test 。

### Avoid if statements in tests

这意味着一次验证太多的东西，也意味着UT里面有太多的逻辑。

### Watch out for act section that are larger than a single line

如果act部分多余一行，这意味着封装程度不够，要多行act才能完成一个behavior

### How many assertions should the assert section hold

有些人认为一个UT case应该只有一个assertion，但是我们所测的是 a unit of hehavior 而不是 a unit of code, 一个behavior会产生多个outcome (参考 The art of Unit Testing) ， 我们在一个case里对多个outcome断言是很正常的。

### Resuing Test fixtures between tests

> A test fixture is an object the test runs against. This object can be a regular
dependency—an argument that is passed to the SUT. It can also be data in
the database or a file on the hard disk. Such an object needs to remain in a
known, fixed state before each test run, so it produces the same result.
Hence the word fixture.

本质上在UT中代码的复用，一种是 BeforeEach这种钩子方法 ， 一种是 封装独立的小函数。本书 《Java By Comparison》 《The Art of Unit Testing》都是倾向于 Standalone Tests 这种方法。这种方法一方面可以提高readability, 一方面可以更加灵活(因为独立的小函数可以传参)

### Naming Convention

UT的命名一个常见的做法是 ```MethodUnderTest_Senario_ExpectedResult``` ，在《The Art of Unit Testing》中表述为 USE pattern。作者倾向于 classic school，认为这种命名方式和实现太耦合，过渡描述实现的code而不是期望的behavior。

在low-level的测试，比如一些utility，这些和业务关联不强的可以用这种方式。稍微high-level的应该倾向于自然语言，比如说User Story的描述。

## The four pillars of a good unit test

标题虽然是单元测试的四个支柱，其实是好测试的标准

* Protection against regressions
* Resistance to refactoring
* Fast feedback
* Maintainability

Protection against regressions 第一条很好理解，就是能发现代码中的bug

Resistance to refactoring 这一条要求我们 写UT要 Aim at the end result instead of implementation details. 测试要关心最终结果而不是实现细节。

这两个指标的关系如下：

![connection](./connectionBetweenFirst2.png)

功能没问题但是测试有问题是假阳性，这种会阻碍我们的重构工作，在项目的后期会影响比较大。

功能有问题但是测试没发现问题是假阴性，这种会造成生产bug。

前三者的关系如下:

![mutually exclusive](./mutuallyExclusiveOf3Pillars.png)

E2E测试可以很好地发现bug，也对重构友好(因为是站在用户视角),但是运行速度非常低，而且maintainability非常差。

Trivial Tests 是指没有什么复杂逻辑的代码 ，比如一些boilerplate。这类代码的测试很快，也对重构友好，但是基本找不出什么bug来。

Brittle tests 是指那些比较脆弱的测试，这些对重构不友好。

这四个指标中，作者认为 Resistance to refactoring 和 Maintainability 是要尽可能提升的指标。 (然而我对重构这个事理解还不够 )

对于我们常见的三种测试 Unit Test、Integration Test 和 E2E Test，运行速度递减，Maintainability递减，但是 Protection against regressions 能力增强。一般是推荐 UT majority 、Integration test in the middle 、 E2E Test minority。 但是也有例外，比如CURD项目可以增加 Integration Test的比例。业务简单的话推荐减少UT比例。如果out-of-process dependency非常少，业务逻辑简单，其实可以考虑E2E测试的比例。

## Mocks and test fragility

![Test Double](./testDouble.png)

* Mocks help to emulate and examine outcoming interactions. These interactions
are calls the SUT makes to its dependencies to change their state.
* Stubs help to emulate incoming interactions. These interactions are calls the
SUT makes to its dependencies to get input data

> Don’t assert interactions with stubs

结合 《The Art of Unit Testing》的观点，call一个API，可以单独看作一个 outgoing exist，这时候应该用mock (可以断言参数是否正确) 。这个API返回值给SUT使用，此时当作stub。当然要分成两个case单独写，不能一个case里既当stub又当mock。

> A call from the SUT to a stub is not part of the end result the SUT produces. Such a call is only a means to produce the end result: a stub provides input from which the SUT then generates the output.

对Stub断言本身测试的实现细节，这种耦合不利于重构，应当避免。

### Observable behavior vs. implementation details

Observable behavior:

* Expose an operation that helps the client achieve one of its goals. An operation is
a method that performs a calculation or incurs a side effect or both.
* Expose a state that helps the client achieve one of its goals. State is the current
condition of the system.

简单来说就是client真正要知道的才是 Observable behivior.

Observable behavior 并不完全等于 Public API， 但我们的期望是两者一致。

实现中 Public API 可能范围更大，会把一些实现细节暴露出来，这就是一个常见的 Anti-Pattern : Leaking implementation details 。

![Leaking Implementation Detail](./leakImplementDetail.png)

这要求我们封装代码，仅暴露满足client需求的最小的行为和状态。

> By making all implementation details private, you leave your tests no choice other than to verify the code’s observable behavior, which automatically improves their resistance to refactoring.

// TODO 六边形架构这块需要再想想

## Styles of unit testing

* Output-based testing is a style of testing where you feed an input to the SUT and check the output it produces. This style of testing assumes there are no hidden inputs or outputs, and the only result of the SUT's work is the value it returns.
* State-based testing verifies the state of the system after an operation is completed.
* In communication-based testing, you use mocks to verify an operation between the SUT and its collaborators.
* The classic school of unit testing prefers the state-based style over the communication-based one. The London school has the opposite preference. Both schools use output-based testing.
* Output-based testing tests produces tests of the highest quality. Such tests rarely couple to implementation details and thus are resistant to refactoring. They are also small concise and thus are more maintainable.
* State-based testing requires extra prudence to avoid brittleness: you need to make sure you don't expose a private state to enable unit-testing. Because state-based tests tend to be larger than output-based tests, they are also less maintainable. Maintainability issues can sometimes be mitigated (but not eliminated) with the use if helper methods and value objects.
* Communication-based testing also requires extra prudence to avoid brittleness. You should only verify communications that across the application boundary and whose side effects are visible to the external world. Maintainability of communication-based tests is worse compared to output-based and state-based tests. Mocks tend to occupy a lot of space, and that makes tests less readable.

![Functional Architecture](./functionalArchitecture.png)

函数式架构主张分为 函数式核心层 以及 可变的外壳。类似于六边形架构，但是不同的是六边形架构的Domain层可以有side effect，函数式架构把所有的side effect都放到了 mutable shell。

## Refactoring toward valuable unit tests

这一章其实该叫 Testable Code

![4 Types of code](./typesOfCode.png)

* Complex code and code that has domain significance benifit from unit testing the most because the corresponding tests have greater protection against regressions.
* Trivial code (low complexity and domain significance, few collaborators) isn't worth testing at all.
* Controllers (low complexity and domain significance, large number of colaborators) should be tested briefly by integration tests.
* Overcomplicated code (high complexity or domain significance, large number of collaborators) should be split into controllers and complex code.

## Why integration testing

![Role Of UT IT](./testMatrix.png)

对于controller来说，如果所有的out-of-process dependency都是用mock的话，这其实就是单元测试。

Check as many if the bussiness scenario's edge cases as possible with unit tests; use integration tests tp cover one happy path, as well as any edge cases that can't be covered by unit tests.

It's better to not write a test at all than to write a bad test. A test that doesn't provide significant value is a bad test.

controller里 fast fail的case没有必要在integration test中测试，因为意义不大。

Two Types of out-of-process dependencies :

* Managed dependencies。只有自己应用访问的dependency算是managed dependency，算是实现细节。比如只在一个项目使用的DB
* Unmanaged dependencies。外部可以感知的dependency，需要mock

Use real instances of managed dependencies; replace unmanaged dependencies with mocks

Integration testing best practices:

* Making domain model boundaries explicit
* Reducing the number of layers
* Eliminating circular dependencies
* Using multiple act assertions in a test. UT不应该出现multiple acts，integration tests很少出现multiple tests。通常只有E2E测试会有multiple acts

## Mocking best practices

* applying mocks to unmanaged dependencies only
* Verifying the interactions with those dependencies at the very edges of your system (这样覆盖的代码最多，提高找到bug的机会， 而且更接近于和外部系统的真实交互，对重构友好 ) ( 这个系统边缘是对外部系统的封装，隐藏了一些和外部系统的交互细节，也有一定的代码量在里面 ) ( 对于不是那么重要的信息，可以选择mock离边界稍微远一点的节点mock )
* Using mocks in integration tests only, not in unit tests (其实我倾向于模糊UT和integration test的界限)
* Always verifying the number of calls made to the mock
* Mocking only types that you own ( 对于第三方库，可以加一层 adaptor 作为 anti-corruption layer, 这样方便以后升级依赖版本，提供友好的API，并且抽象出底层库的复杂性)
* Not just one mock per test ( 一个behavior可以有多个依赖，所以需要多个mock可assert )

## Unit testing anti-patterns

### Leaking Implementation Detail (Unit testing private methods)

我们的目标是 Observable behavior 和 public API 一致，但是有时 public API 范围更大，甚至是为了方便测试故意变成 public 的。

有些private方法的分支很难测到，可以考虑抽象出单独的类单独测试。(本质上是不够testable)

### Exposing private state

和上面一条类似，私有状态也不能随意泄漏，不能为了方便测试暴露私有状态

### Leaking domain knowledge to tests

不要在单元测试里再实现一遍业务逻辑, 会使得UT brittle

Hardcoding the expected result is a good practice when it comes to unit testing.

### Code pollution

Code pollution is adding production code that's only needed for testing.

The problem with code pollution is that it mixes up test and production code and thereby increases the maintainance costs of the latter.

### Mocking concrete classes

这里其实讲的是mock一个类中某个特定方法进行测试，这意味着这个特定方法和其他方法干的不是一件事，它可以单独存在，这违背了单一职责原则，所以这个特定方法应当被抽出来。

### Working with time

对于时间可以考虑依赖注入的方式，抽一个inteface出来，只包含我们需要的方法。
