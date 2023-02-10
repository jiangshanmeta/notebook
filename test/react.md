# React测试

如无特殊说明，是使用Create React App创建的项目

## 如何获取单元测试覆盖率

在本地跑```react-scripts test --coverage```,[单元测试覆盖率可能为空](https://github.com/facebook/create-react-app/issues/6888) 需要添加参数```--watchAll=false```.

```json
{
    "test:coverage": "react-scripts test --coverage --watchAll=false",
}
```

## 单元测试覆盖率如何排除某些文件

参考[jest文档](https://jestjs.io/docs/configuration#collectcoveragefrom-array)和[CRA文档](https://create-react-app.dev/docs/running-tests#configuration)

在package.json中添加一个jest属性

```json
"jest": {
    // 以!开头的是排除的文件
    "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts,tsx}",
        "!<rootDir>/node_modules/",
        "!<rootDir>/src/reportWebVitals.ts",
        "!<rootDir>/src/index.tsx",
        "!<rootDir>/src/**/*.d.ts"
    ],
    "coverageThreshold": {
        "global": {
            "branches": 90,
            "functions": 90,
            "lines": 90,
            "statements": 90
        }
    }
},
```
