# 管理异步事件以及数据

Promise为回调驱动的设计提供了函数式的解决方案(可以把promise当做一种monad)

Promise提供链接和组合“未来”函数的可能，抽象出时间依赖代码，并降低复杂性

生成器则采用另一种方法抽象异步代码，即通过惰性迭代器可以yield还未准备好的数据