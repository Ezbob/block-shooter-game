const developConfig = require('./webpack.config.development');

let prodConfig = developConfig;

prodConfig.mode = 'production';

prodConfig.optimization = {
        splitChunks: {
            chunks: 'all'
        }
    };

module.exports = prodConfig;