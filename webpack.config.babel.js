import path from 'path';
import hashConfig from './views/config/hash-config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const CURRENT_PATH = path.resolve(__dirname);//获取当前目录
const ROOT_PATH = path.join(__dirname, './');//项目根目录
const MODULES_PATH = path.join(ROOT_PATH, './node_modules');//node包目录
const BUILD_PATH = path.join(ROOT_PATH, './pulice/assets');//最后输出放置公共资源的目录
const projectsPath = path.resolve(__dirname, './../');//page目录地址

const extractSass = new ExtractTextPlugin({
    filename: 'css/[name].' + + hashConfig.chunkhash + '.css'
});

module.exports = {
    entry: {
        login: path.resolve(projectsPath, CURRENT_PATH + 'login/entry/entry.js'),
        vendor: ['babel-polyfill', 'react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].' + hashConfig.chunkhash + '.js'
    },
    resolve: {
        alias: {},
        extensions: ['.js', '.jsx', '.scss', '.css', '.png', '.jpg']
    },
    modules: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        'react',
                        'es2015'
                    ]
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                            loader: "css-loader"
                        }, {
                            loader: "sass-loader"
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('postcss-cssnext')
                                ]
                            }
                        }
                    ],
                    // use style-loader in development 
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'imgs/[name].[ext]?[hash]',
                }
            }
        ],
        plugins: [
            extractSass
        ]
    }
}