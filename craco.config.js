const CracoLessPlugin = require("craco-less");
const { getThemeVariables } = require('antd/dist/theme');
const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: getThemeVariables({
            //   dark: true, // 开启暗黑模式
            //   compact: true, // 开启紧凑模式
            // }),
            javascriptEnabled: true,
          },
        },
        modifyLessRule(lessRule) {
          lessRule.test = /global\.less$/;
          return lessRule;
        },
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: "[local]_[hash:base64:5]",
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001",
        secure: false,
        changeOrigin: true,
      },
    },
    port: 2333,
  },
};
