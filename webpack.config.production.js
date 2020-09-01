const developConfig = require('./webpack.config.development');

let prodConfig = developConfig;

prodConfig.mode = 'production';

module.exports = prodConfig;