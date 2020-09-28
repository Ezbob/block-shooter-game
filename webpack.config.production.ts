import developConfig from './webpack.config.development';

let prodConfig = developConfig;

prodConfig.mode = 'production';

export default prodConfig;