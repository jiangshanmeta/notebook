# React Testing Library

## 如何模拟滚动行为

```typescript
// scrollY 到200px
fireEvent.scroll(window,{target:{scrollY:200}})
```

注意scrollY会被每一个test case共享

要在每个test case后面重置scrollY：

```typescript
afterEach(()=>{
    fireEvent.scroll(window,{target:{scrollY:0}})
})
```

## 如何模拟resize

```typescript
fireEvent.resize(window)
```

别忘了jsdom没有真正实现layout，有些数据需要自己处理
