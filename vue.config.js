module.exports = {
  lintOnSave: 'warning',
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "./src/assets/less/vantChange.less";`,
          },
        },
      },
    },
  },
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://www.giorgioarmanibeauty.cn',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': '/' // 上面那个 /api 替换成这个(如果原来的请求中没有这个 /api，可以使用这个方法将以 /api 开头的这个去掉)
  //       }
  //     }
  //   }
  // }
};