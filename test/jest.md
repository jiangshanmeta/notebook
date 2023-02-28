# Jest

## 如何处理对HTTP库的依赖

我们的单元测试显然不能直接调用依赖项HTTP库，需要对HTTP依赖提供mock

正常的调用：

```typescript
const spyHttp = jest.spyOn(https, 'get').mockImplementationOnce((_, __, cb: any) => {
    const e: any = new EventEmitter()
    e.setEncoding = jest.fn()

    cb(e)

    e.emit('data', '666')
    e.emit('data', '770')
    e.emit('end')

    return e as any
})

downloadImage('https://github.com')

expect(spyHttp).toBeCalledTimes(1)
expect(spyHttp.mock.calls[0][0]).toBe('https://github.com')
```

处理异常：

```typescript
test('handle getRawHTML error', async () => {
    jest.spyOn(http, 'get').mockImplementationOnce((_, cb: any) => {
        // 为什么不用上面的EventEmitter 因为有坑
        const res: any = {}
        res.setEncoding = jest.fn()
        res.on = (type: string, onCb: Function) => {
        if (type === 'error')
            onCb(new Error('fake error msg'))
        }
        cb(res)

        return res as any
    })

    try {
        await getRawHTML('fake url')
    }
    catch (e) {
        expect((e as Error).message).toBe('fake error msg')
    }
})
```

## 如何在某个测试用例中mock依赖

jest.mock方法是作用在整个测试文件层面的，要在某个具体的单元测试mock依赖，可以使用[jest.doMock](https://jestjs.io/docs/jest-object#jestdomockmodulename-factory-options)

```typescript
it('when target is not custom',()=>{

    // 模拟第三方库material-ui
    jest.doMock('@material-ui/core',()=>{
        return {
            __esModule: true,
            FormControl:(props)=>{
                return props.children;
            },
        }
    })

    // 要再次导入才行
    return import('@material-ui/core').then(()=>{
        // 必须要require 动态导入import()有点问题
        const {default:Component} = require('components/BadgeContent')
        const setBadge = jest.fn();
        const {
            container,
        } = render(<Component badge={DEFAULT_BADGE} setBadge={setBadge} />)

        // Act and Assertion
    })
    
})

```
