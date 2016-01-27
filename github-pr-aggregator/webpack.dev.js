import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import precss from 'precss';

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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                GITHUB_API_KEY: JSON.stringify(process.env.GITHUB_API_KEY)
            }
        })
    ],
    postcss: () => {
        return [autoprefixer, precss];
    },
    resolve: {
        root: [path.resolve('src')],
        extensions: ['', '.js']
    }
}
