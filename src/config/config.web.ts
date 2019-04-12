/*
 * 注意: config.web.js 是给前端页面使用的，
 * 本地开发运行webpack时请使用 config.node.js
 */

// @ts-ignore
import baseConfig from './base.config';
// @ts-ignore
import devConfig from './dev.config';
// @ts-ignore
import prodConfig from './prod.config';

let localConfig;
try {
    localConfig = require('./local.config.js');
} catch (err) {

}

console.log('localConfig ----- ', localConfig);

let config: any;

if (process.env.NODE_ENV === 'development') {
    config = { ...baseConfig, ...devConfig };
    if (localConfig) {
        config = { ...config, ...localConfig };
    }
} else {
    config = { ...baseConfig, ...prodConfig };
}

export default config;