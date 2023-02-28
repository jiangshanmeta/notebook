# Angular Cypress E2E测试

Angular版本15

## 如何添加Cypress E2E测试覆盖率

参考[文章](https://digitaldrummerj.me/cypress-code-coverage/)

安装依赖：

```bash
npm install --save-dev @cypress/code-coverage
npm install --save-dev @istanbuljs/nyc-config-typescript babel-plugin-istanbul istanbul-lib-coverage nyc source-map-support @istanbuljs/nyc-config-babel
```

然后ng添加服务：

```bash
ng add ngx-build-plus
```

在cypress目录下添加```coverage.webpack.js```文件，内容为：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['babel-plugin-istanbul']
          }
        },
        enforce: 'post',
        include: require('path').join(__dirname, '..', 'src'),
        exclude: [
          /node_modules/,
          /cypress/,
          /(ngfactory|ngstyle)\.js/]
      },
    ],
  },
};
```

在```package.json```中添加配置：

```json
"nyc": {
  "extends": "@istanbuljs/nyc-config-babel",
  "all": true,
  "exclude": [
    "**/cypress/**",
    "**/coverage/**",
    "karma.conf.js",
    "src/test.ts",
    "**/*.spec.ts"
  ],
  "reporter": [
    "html"
  ]
}
```

在```cypress/support/e2e.ts```文件中添加以下内容：

```typescript
import '@cypress/code-coverage/support'
```

修改根目录下的```cypress.config.ts```文件

```typescript
export default defineConfig( {
    e2e: {
        'baseUrl': 'http://localhost:4200',
        // 新添加
        setupNodeEvents( on, config ) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require( '@cypress/code-coverage/task' )( on, config )

            return config
        },
    },
} )
```

跑E2E测试先启动Angular项目：

```bash
ng serve --extra-webpack-config ./cypress/coverage.webpack.js
```

运行E2E测试并获取覆盖率：

```bash
cypress run --env coverage=true
```
