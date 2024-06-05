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

E2E tests are a subset of integration integration test.

E2E测试和integration测试区别更多在于用的真实dependency的多少。E2E显然更接近于生产的情况。

其实我觉得这一章有点太学院派了。我更倾向于 《The Art of Unit Testing》的观点，从单元测试到E2E测试是一个dependency的mock从多到少的过程，在这条连续谱带上会有 unit test、component test、integration test、e2e isolated test 、 e2e system test 。我们的测试应该是 layered ， connect low-level and high-level tests.

至于对于 mutable private dependency 的处理，一般也不会这么教条非要按照一个方式，要做trade-off, 工程是妥协的艺术。
