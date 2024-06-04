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
