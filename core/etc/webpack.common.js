/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pathFinder = require('./scripts/pathFinder');
const pathMapFinder = require('./scripts/pathMapFinder');

const configWrapper = (targetConfigFunction) => (env, argv) => {
    const varsConstructor = require('./scripts/varsConstructor');

    const vars = varsConstructor(env, argv);

    return targetConfigFunction(vars);
};

function dependencyAliasesConverter(entries, vars) {
    if (entries === null || entries === undefined) {
        return {};
    }

    return Object.keys(entries).reduce(
        (prev, curr) => {
            const value = entries[curr];

            let newValue;

            if (value[0] === '~') {
                newValue = `${vars.appRoot}/${value.substring(1)}`;
            }
            else {
                newValue = value;
            }

            return { ...prev, [curr]: newValue };
        },
        {},
    );
}

const commonConfig = (name, hasDocument) => configWrapper((vars) => {
    const tsConfigPath = pathFinder(`${vars.appRoot}/tsconfig.json`, `${__dirname}/tsconfig.json`); // `${vars.dartyRoot}/core/etc/tsconfig.json`
    const useDocumentStyleInjection = hasDocument && !vars.isProduction;

    const styleLoader = {
        // creates style nodes from JS strings
        loader: 'style-loader',
    };

    const extractCssChunksPluginLoader = {
        // After all CSS loaders we use plugin to do his work.
        // It gets all transformed CSS and extracts it into separate
        // single bundled file
        loader: ExtractCssChunksPlugin.loader,
    };

    const cssLoader = (importLoaders) => ({
        // This loader resolves url() and @imports inside CSS
        loader: 'css-loader',
        options: {
            modules: {
                mode: 'local',
                // localIdentName: '[local]___[hash:base64:5]',
                localIdentName: '[local]',
            },
            sourceMap: true,
            localsConvention: 'camelCase',
            importLoaders: importLoaders,
        },
    });

    const postCssLoader = {
        // Then we apply postCSS fixes like autoprefixer and minifying
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            // parser: 'postcss-js',
            sourceMap: true,
            config: {
                path: pathMapFinder({
                    [`${__dirname}/postcss.config.js`]: __dirname,
                    [`${vars.appRoot}/postcss.config.js`]: vars.appRoot,
                }),
            },
        },
    };

    return {
        mode: vars.isProduction ? 'production' : 'development',
        devtool: vars.isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        context: vars.appRoot,

        output: {
            filename: '[name].js',
            // chunkFilename: '[id].[chunkhash].js',
            chunkFilename: '[id].js',
            publicPath: '/',
            // hotUpdateChunkFilename: 'hot/hot-update.js',
            // hotUpdateMainFilename: 'hot/hot-update.json',
            path: path.join(vars.appRoot, 'dist'),
        },

        optimization: {
            // namedModules: true,
            // namedChunks: true,
        },

        module: {
            strictExportPresence: true,

            rules: [
                {
                    parser: {
                        requireEnsure: false,
                    },
                },
                {
                    test: /\.([tj]sx?)$/i,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                configFile: tsConfigPath,
                            },
                        },
                    ],
                    // exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: [
                        useDocumentStyleInjection ? extractCssChunksPluginLoader : styleLoader,
                        cssLoader(1),
                        postCssLoader,
                    ],
                },
                {
                    test: /\.(sa|sc)ss$/i,
                    use: [
                        useDocumentStyleInjection ? extractCssChunksPluginLoader : styleLoader,
                        cssLoader(2),
                        postCssLoader,
                        {
                            // First we transform SASS to standard CSS
                            loader: 'sass-loader',
                            options: {
                                implementation: require('sass'),
                                sassOptions: {
                                    fiber: require('fibers'),
                                },
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.less$/i,
                    use: [
                        useDocumentStyleInjection ? extractCssChunksPluginLoader : styleLoader,
                        cssLoader(2),
                        postCssLoader,
                        {
                            // First we transform LESS to standard CSS
                            loader: 'less-loader',
                        },
                    ],
                },
                // {
                //     test: /\.(sa|sc|c)ss$/i,
                //     use: [
                //         {
                //             // After all CSS loaders we use plugin to do his work.
                //             // It gets all transformed CSS and extracts it into separate
                //             // single bundled file
                //             loader: ExtractCssChunksPlugin.loader,
                //         },
                //         {
                //             // This loader resolves url() and @imports inside CSS
                //             loader: 'css-loader',
                //             options: {
                //                 modules: {
                //                     mode: 'local',
                //                     // localIdentName: '[local]___[hash:base64:5]',
                //                     localIdentName: '[local]',
                //                 },
                //                 sourceMap: true,
                //                 localsConvention: 'camelCase',
                //                 importLoaders: 2,
                //             },
                //         },
                //         {
                //             // Then we apply postCSS fixes like autoprefixer and minifying
                //             loader: 'postcss-loader',
                //             options: {
                //                 ident: 'postcss',
                //                 // parser: 'postcss-js',
                //                 sourceMap: true,
                //                 config: {
                //                     path: __dirname,
                //                 },
                //             },
                //         },
                //         {
                //             // First we transform SASS to standard CSS
                //             loader: 'sass-loader',
                //             options: {
                //                 implementation: require('sass'),
                //                 sassOptions: {
                //                     fiber: require('fibers'),
                //                 },
                //                 sourceMap: true,
                //             },
                //         },
                //     ],
                // },
            ],
        },

        resolve: {
            extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
            modules: [
                path.join(vars.appRoot, 'src'),
                path.join(vars.appRoot, 'node_modules'),
            ],
            mainFields: [ 'main', 'module' ],
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: tsConfigPath,
                    extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
                    baseUrl: vars.appRoot,
                }),
            ],
            alias: dependencyAliasesConverter(vars.manifest.dependencyAliases, vars),
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(vars.envValue),
                    PLATFORM: JSON.stringify(name),
                    DARTY_VARS: JSON.stringify(vars),
                },
            }),
            // new webpack.WatchIgnorePlugin([
            //     /css\.d\.ts$/
            // ]),
            new CaseSensitivePathsPlugin(),
            new ExtractCssChunksPlugin({
                filename: '[name].css',
                // chunkFilename: '[id].[chunkhash].css',
                chunkFilename: '[id].css',
                hot: !vars.isProduction,
                cssModules: true,
            }),
            new DotenvPlugin({
                // safe: `${vars.dartyRoot}/templates/.env.default`,
                // path: './.env',
                silent: true,
            }),
            new AsyncChunkNames(),
            // new BundleAnalyzerPlugin({
            //     // Start analyzer HTTP-server.
            //     // You can use this plugin to just generate Webpack Stats JSON file by setting
            //     // `startAnalyzer` to `false` and `generateStatsFile` to `true`.
            //     startAnalyzer: false,
            //     // Analyzer HTTP-server port
            //     analyzerPort: 8888,
            //     // Automatically open analyzer page in default browser if `startAnalyzer` is `true`
            //     openAnalyzer: true,
            //     // If `true`, Webpack Stats JSON file will be generated in bundles output directory
            //     generateStatsFile: true,
            //     // Name of Webpack Stats JSON file that will be generated if `generateStatsFile`
            //     // is `true`. Relative to bundles output directory.
            //     statsFilename: `${name}-stats.json`,
            // }),
        ],

        stats: {
            children: false,
            colors: true,
            entrypoints: true,
            env: true,
            modules: false,
        },
    };
});

module.exports = {
    configWrapper,
    commonConfig,
};
