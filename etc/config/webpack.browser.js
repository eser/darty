const { configWrapper, commonConfig } = require('./webpack.common');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const browserConfig = configWrapper((vars) => {
    const common = commonConfig('browser', true)(vars.webpackOptions, vars.argv);

    let optionalPlugins = [];

    if (vars.isProduction) {
        optionalPlugins = [
            ...optionalPlugins,
            new webpack.HotModuleReplacementPlugin(),
        ];
    }

    return {
        ...common,

        target: 'web',

        entry: {
            'browser': [ `${vars.dartyRoot}/etc/entryPoints/index.browser.tsx` ],
        },

        output: {
            ...common.output,
        },

        devServer: {
            historyApiFallback: true,
            open: true,
        },

        optimization: {
            ...common.optimization,

            splitChunks: {
                chunks: 'all',
                // cacheGroups: {
                //     'default': false,
                //     vendors: false,

                //     // vendor chunk
                //     vendor: {
                //         // name of the chunk
                //         name: 'browser-vendors',
                //         // async + async chunks
                //         chunks: 'all',
                //         // import file path containing node_modules
                //         test: /[\\/]node_modules[\\/]/,
                //         // priority
                //         priority: 20,
                //     },
                //     // common chunk
                //     common: {
                //         name: 'browser-common',
                //         minChunks: 2,
                //         chunks: 'async',
                //         priority: 10,
                //         reuseExistingChunk: true,
                //         enforce: true,
                //     },
                // },
            },
            // runtimeChunk: 'single',
        },

        module: {
            ...common.module,

            rules: [
                ...common.module.rules,
                // {
                //     test: /\.(jpe?g|png|gif|ico)([?]?.*)$/i,
                //     type: 'asset/resource',
                // },
                // {
                //     test: /\.(woff2?|ttf|otf|eot)([?]?.*)$/i,
                //     type: 'asset/resource',
                // },
                // {
                //     test: /\.(svg)([?]?.*)$/,
                //     type: 'asset/resource',
                // },
            ],
        },

        resolve: {
            ...common.resolve,

            fallback: {
                dgram: false,
                fs: false,
                net: false,
                tls: false,
                child_process: false,
            },
        },

        plugins: [
            ...common.plugins,
            new CopyWebpackPlugin({
                patterns: vars.manifest.staticFiles.map(x => ({ from: x, to: './[name][ext]' })),
            }),
            ...Object.keys(vars.manifest.htmlTemplates).map(filename => new HtmlWebpackPlugin({
                title: vars.manifest.title,
                filename: filename,
                template: vars.manifest.htmlTemplates[filename],
                // inject: false,
            })),
            ...optionalPlugins,
        ],
    };
});

module.exports = browserConfig;
