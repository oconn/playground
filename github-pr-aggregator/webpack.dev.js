import path from 'path';
import webpack from 'webpack';

export default {
    debug: true,
    devtool: 'eval',
    entry: ['webpack-hot-middleware/client', './src/js/main.js'],
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],
    resolve: {
        root: [path.resolve('src')],
        extensions: ['', '.js']
    }
}
