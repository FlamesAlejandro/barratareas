const path = require('path');
const webpack = require('webpack');

module.exports = {
    //entrada
    entry: './public/js/app.js',
    output: {
        filename : 'bundle.js',
        path : path.join(__dirname, "'./public/dist")
    },
    module: [
        {
            //js
            test: /\.m?js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            //sass
        },
        {
            //imagenes
        }
    ]
}