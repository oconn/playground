import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import precss from 'precss';

export default {
    devtool: 'source-map',
    entry: './src/js/main.js',
    module: {
        preLoaders: [{
            test: /\.js?$/,
            loader: 'eslint',
            include: path.join(__dirname, 'src')
        }],
        loaders: [
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
            {
                test: /\.js?$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'postcss', 'sass']
            }
        ]
    },
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    postcss: () => {
        return [autoprefixer, precss];
    },
    resolve: {
        root: [path.resolve('app')],
        extensions: ['', '.js']
    }
}
