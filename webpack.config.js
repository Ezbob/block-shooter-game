const path = require('path')

module.exports = {
    mode: "production",

    entry: "./game/main.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js'
    },

    devtool: "source-map"
}