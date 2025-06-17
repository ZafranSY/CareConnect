const { defineConfig } = require('@vue/cli-service')
// vue.config.js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        crypto: 'crypto-browserify',
      },
    },
  },
};

