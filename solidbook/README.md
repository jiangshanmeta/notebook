# [Solid Book](https://solidbook.io/)

这是本开源书，讲软件架构的

## Complexity

The goal of software design is to build products that **server the needs of customer** and can be **cost-effectively changed by developers**.

### Types of complexity

* essential complexity (业务本身引起的复杂性, 不可避免)
* Accidental complexity (可控的)

### Cause of accidental complexity

* High Coupling
* Low Cohesion
* More Developers (人多引起的inconsistent)
* Language And API capabilities (语言框架过于灵活引起的复杂性)
* Premature Optimization ( Premature optimization is the root of all evil )

### How to detect complexity

* Ripple 一个很小的需求改动可能要该很多地方
* Cognitive Load 认知负担
* Poor Discoverability (代码没有很好的组织 难以找到要修改的地方)
* Poor Understandability
  * hard to understand how to use something
  * hard to understand if we're using something the correct way. when tools provide too many options to do the same thing , it leaves us to question whether we made the correct decison or not
  * hard to understand if what we did worked

### Mitigating Complexity

为了减少复杂性，作者推荐 Extreme Programming (敏捷的一种) ，并且指出如下实践:

* Pair programming
* TDD
* CI/CD
* Refactoring
* Coding Standard
* Code Ownership
* DDD
