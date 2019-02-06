const webpack = require('webpack');
const path = require('path');

const parentDir = path.join(__dirname, '../');

module.exports = {
    mode: 'development',
    entry: [
        './client/index.js'
    ],
    resolve: {
        alias: {
            Components: path.resolve('./client/src/components/'),
            Pages: path.resolve('./client/src/pages/'),
            Styles: path.resolve('./client/src/styles'),
            Scripts: path.resolve('./client/src/scripts'),
            Cpp: path.resolve('./client/src/cpp')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'env', 'es2015', 'stage-0'],
                    plugins: ['babel-plugin-webpack-alias']
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(c|cpp)$/,
                use: {
                    loader: 'cpp-wasm-loader',
                    options: {
                        emccFlags: [
                            '-s',
                            'ERROR_ON_UNDEFINED_SYMBOLS=0',
                            '-s',
                            'USE_PTHREADS=1',
                            '-s',
                            'PTHREAD_POOL_SIZE=2'
                        ],
                        fullEnv: true
                    }
                }
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            },
            {
                test: /\.wasm$/,
                type: "javascript/auto"
            }
        ]
    },
    output: {
        path: path.join(__dirname, '/server/public/js/'),
        filename: 'bundle.js',
        publicPath: 'server/public/js'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
    }
}