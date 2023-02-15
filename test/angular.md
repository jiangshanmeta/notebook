# Angular测试

## Angular如何在CI跑单元测试获取覆盖率

默认情况下会启动一个浏览器跑单元测试，但是CI服务器没有浏览器。可以添加一个参数```--browsers=ChromeHeadless```指定为一个[可以在服务器跑的浏览器](https://developer.chrome.com/blog/headless-chrome/)

```json
{
    "test:ci": "ng test --browsers=ChromeHeadless --no-watch --code-coverage",
}
```

## 单元测试覆盖率如何生成lcov文件

单元测试覆盖率默认是生成一堆HTML文件以及在terminal输出文字，但是codecov这种平台需要的是```lcov.info```文件。

首先我们根据[官方文档](https://angular.cn/guide/testing#configuration)先创建```karma.conf.js```文件，然后在```angular.json```文件中添加一个配置karmaConfig为我们配置的文件。

```json
"test": {
  "builder": "@angular-devkit/build-angular:karma",
  "options": {
    "karmaConfig": "karma.conf.js", // 增加这一行配置
    "polyfills": ["zone.js", "zone.js/testing"],
    "tsConfig": "src/tsconfig.spec.json",
    "styles": ["src/styles.css"]
  }
}
```

最后修改```karma.conf.js```文件的coverageReporter属性

```javascript
coverageReporter: {
    dir: require('path').join(__dirname, './coverage/'),
    subdir: '.',
    reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcov' } // 增加这一行
    ]
},
```

## 单元测试覆盖率如何排除某些文件

有些文件可能是单元测试辅助公共代码，这些代码显然不需要参与统计单元测试覆盖率。在```angular.json```文件中**test**属性添加一个配置项codeCoverageExclude

```json
"test": {
    "builder": "@angular-devkit/build-angular:karma",
    "options": {
        "codeCoverageExclude": ["src/testing/**/*"], // 排除src/testing目录下的所有文件
        "karmaConfig": "karma.conf.js",
        "polyfills": [
            "zone.js",
            "zone.js/testing"
        ],
        "tsConfig": "tsconfig.spec.json",
        "assets": [
            "src/favicon.ico",
            "src/assets"
        ],
        "styles": [
            "src/styles.css"
        ],
        "scripts": []
    }
},
```

## 如何监听Map原型方法被调用

我有一个class，它在内部实例化了一个Map，并且调用了map的delete方法，如何测试这个delete方法被调用

```typescript
const spyOnDelete = spyOn( Map.prototype, 'delete' )
expect( Map.prototype.delete ).toHaveBeenCalledTimes( 2 )
// 看参数是否匹配
expect( spyOnDelete.calls.allArgs() ).toEqual( [
    [
        'https://jiangshanmeta.github.io/spider?id=1'
    ],
    [
        'https://jiangshanmeta.github.io/spider?id=2'
    ]
] )
```
