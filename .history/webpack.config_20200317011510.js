const path = require('path');
const webpack = require('webpack');

module.exports = {
    //entrada
    entry: './public/js/app.js',
    output: {
        filename : 'bundle.js',
        // __dirname = directorio actual, creara en public una carpeta dist
        path : path.resolve(__dirname, "'./public/dist")
    },
    module: [
        rules: [{
            test: /\.js$/,
            use: {
                // para cargar babel
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
        {
            //js
            //modulos que requiere webpack, test le dice que archivos va utilizar, en este caso js
            
        },
        {
            //sass
        },
        {
            //imagenes
        }
    ]
}