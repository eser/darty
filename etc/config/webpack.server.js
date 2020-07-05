/* eslint-env node */
const { configWrapper, commonConfig } = require('./webpack.common');

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const serverConfig = configWrapper((vars) => {
    const common = commonConfig('server', false)(vars.env, vars.argv);

    // const packageJson = require(`${vars.appRoot}/package.json`);
    // const whiteListModules = [
    //     ...Object.keys(packageJson.dependencies || {}),
    //     ...Object.keys(packageJson.devDependencies || {}),
    // ];

    return {
        ...common,

        bail: true,

        target: 'node',
        externals: [
            nodeExternals({
                whitelist: /^(?!fs$|path$|express$|webpack$).*/, // anything but fs, path, express and webpack
            }),
        ],

        entry: {
            'server': [ `${vars.dartyRoot}/src/index.server.tsx` ],
        },

        output: {
            ...common.output,
            // library: 'app',
            libraryExport: 'default',
            libraryTarget: 'commonjs2',
        },

        module: {
            ...common.module,

            rules: [
                ...common.module.rules,
                {
                    test: /\.(eot|ttf|jpe?g|png|gif|ico)([\?]?.*)$/i,
                    use: [
                        {
                            loader: 'file-loader?emitFile=false',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'assets/',
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff2?)([\?]?.*)$/i,
                    use: [
                        {
                            loader: 'url-loader?emitFile=false',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'assets/',
                            },
                        },
                    ],
                },
                {
                    test: /\.(svg)([\?]?.*)$/i,
                    use: [
                        {
                            loader: 'url-loader?emitFile=false',
                            options: {
                                limit: 10000,
                                mimetype: 'image/svg+xml',
                                name: '[name].[ext]',
                                outputPath: 'assets/',
                            },
                        },
                    ],
                },
            ],
        },

        plugins: [
            ...common.plugins,
            new webpack.NamedModulesPlugin(),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
        ],
    };
});

module.exports = serverConfig;
