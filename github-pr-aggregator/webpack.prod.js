import path from 'path';
import webpack from 'webpack';

export default {
    devtool: 'source-map',
    entry: './src/js/main.js',
    module: {
        preLoaders: [{
            test: /\.js?$/,
            loader: 'eslint',
            include: path.join(__dirname, 'src')
        }],
        loaders: [{
            test: /\.js?$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }]
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
    resolve: {
        root: [path.resolve('app')],
        extensions: ['', '.js']
    }
}
