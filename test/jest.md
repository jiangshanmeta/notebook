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

## 如何测试对某个第三方库的调用

我们的一个组件用到了第三方库：

```typescript
import copy from "copy-to-clipboard";
```

当用户点击的时候回调用这个copy方法。

在测试文件中，

```typescript
// 一定要导入，mock后可以对copy直接断言
import copy from 'copy-to-clipboard'

// 整个文件都mock
jest.mock('copy-to-clipboard',()=>{
    return jest.fn().mockImplementation(()=>{
        return true
    })
})
```

在具体的test case中:

```typescript
// 断言调用
expect(copy).toBeCalledTimes(1)
```

## dynamic require后Invalid hook call

我要测试的组件引入了第三方的UI库，在某个test case中，为了方便测试需要mock某些组件，这个问题上面已经解决了。但是我的组件中使用了react hook，就报错了。[jest的issue](https://github.com/facebook/jest/issues/8987)提到了这个问题，但是个3年都没close掉。

根据其中一个题目中的[workaround](https://github.com/facebook/jest/issues/8987#issuecomment-584898030)解决了这个问题。

首先编辑```jest.config.js```文件，编辑setupFiles属性

```javascript
const customJestConfig = {
    moduleDirectories: ['node_modules', '<rootDir>/'],
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
    // 添加这个jest.setup.js文件，文件名其实可以随意
    setupFiles: ['./jest.setup.js']
}
```

在```jest.setup.js```文件中写入以下内容:

```javascript
const RESET_MODULE_EXCEPTIONS = [
    'react',
];

let mockActualRegistry = {};

RESET_MODULE_EXCEPTIONS.forEach(moduleName => {
    jest.doMock(moduleName, () => {
        if (!mockActualRegistry[moduleName]) {
            mockActualRegistry[moduleName] = jest.requireActual(moduleName);
        }
        return mockActualRegistry[moduleName];
    });
});
```

这样还是有点问题，需要在要测试的case用jest.isolateModules包一层:

```typescript
it('dynamic require',()=>{
    jest.isolateModules(()=>{
        jest.mock('moduleName',()=>{
            return {}
        })
        // Arrange Act Assert
    })
})
```
