const path = require('path');
const webpack = require('webpack');

module.exports = {
    //entrada
    entry: './public/js/app.js',
    output: {
        filename : 'bundle.js',
        // __dirname = directorio actual, creara en public una carpeta dist
        path : path.join(__dirname, "'./public/dist")
    },
    module: [
        {
            //js
            //modulos que requiere webpack, test le dice que archivos va utilizar, en este caso js
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