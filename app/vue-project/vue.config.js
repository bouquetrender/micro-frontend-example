const { defineConfig } = require('@vue/cli-service')
const { name: packageName } = require('./package.json')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  configureWebpack: {
    output: {
      library: packageName,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${packageName}`
    }
  }
})
