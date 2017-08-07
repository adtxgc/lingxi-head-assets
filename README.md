# lingxi-head-assets

> 把head标签里面的资源引用内容提取出来，然后以内联方式嵌入


### Usage Examples

由于没有发布到npm上，所以使用时可以当成本地插件引入

```js
grunt.initConfig({
  lingxi_head_assets: {
    files: {
      src: [
        './test/target/*.html'
      ]
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
