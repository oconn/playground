import path from 'path';
import webpack from 'webpack';

export default {
    debug: true,
    devtool: 'eval',
    entry: ['webpack-hot-middleware/client', './src/js/main.tsx'],
    module: {
        preLoaders: [{
            test: /\.tsx?$/,
            loader: 'tslint',
            include: path.join(__dirname, 'src')
        }],
        loaders: [{
            test: /\.tsx?$/,
            loaders: ['babel', 'ts'],
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
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        root: [path.resolve('src')],
        extensions: ['', '.jsx', '.js', '.tsx', '.ts']
    }
}
