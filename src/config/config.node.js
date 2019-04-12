/*
 * 注意: config.node.js 是给本地开发运行webpack时使用的，
 * 前端页面请使用config.web.js
 */
const fs = require('fs');
const path = require('path');
const baseConfig = require('./base.config.js');
const devConfig = require('./dev.config.js');
const prodConfig = require('./prod.config.js');

let config;

if (process.env.NODE_ENV === 'development') {
    config = Object.assign({}, baseConfig, devConfig);
    // 本地开发时，webpack的配置中会用到此文件，这时可以使用同步方法
    const isExist = fs.existsSync(path.join(__dirname, './local.config.json'));
    if (isExist) {
        const localConfig = require('./local.config.json');
        config = Object.assign({}, config, localConfig);
    }
} else {
    config = Object.assign({}, baseConfig, prodConfig);
}

module.exports = config;
