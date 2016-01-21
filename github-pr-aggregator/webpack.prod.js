import path from 'path';
import webpack from 'webpack';

export default {
    devtool: 'source-map',
    entry: './src/app.tsx',
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
        extensions: ['', '.jsx', '.js', '.tsx', '.ts']
    },
    tslint: {
        emitErrors: true,
        failOnHint: true
    }
}
