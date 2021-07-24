const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/pages/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'chatter.bundle-[fullhash].js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        contentBase: 'dist',
        compress: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: [/node_modules/],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: ['static/scss/abstracts/variables.scss'],
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*',
                    context: path.resolve(__dirname, 'static/css'),
                    to: './css',
                },
                {
                    from: '**/*',
                    context: path.resolve(__dirname, 'static/img'),
                    to: './img',
                },
                {
                    from: '**/*',
                    context: path.resolve(__dirname, 'static/webfonts'),
                    to: './webfonts',
                },
                {
                    from: '**/*',
                    context: path.resolve(__dirname, 'src/vendor'),
                    to: './vendor',
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: 'static/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style-[fullhash].css',
        }),
    ],
};
