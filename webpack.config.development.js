const path = require('path')

module.exports = {
    mode: "development",

    entry: "./game/main.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js'
    },

    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    }
}