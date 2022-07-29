const path = require('path');
const webpack = require('webpack');
const sass = require('sass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const variables = require('../../src/variables');
// const { variables } = require('darty');

const configWrapper = targetConfigFunction => (env, argv) => {
    const vars = variables(env, argv);

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
    const tsConfigPath = vars.pathFinder(`${vars.appRoot}/tsconfig.json`, `${__dirname}/tsconfig.json`); // `${vars.dartyRoot}/etc/config/tsconfig.json`
    const useDocumentStyleInjection = hasDocument && !vars.isProduction;

    const imageInlineSizeLimit = vars.imageInlineSizeLimit || 10000;

    const styleLoader = {
        // creates style nodes from JS strings
        loader: 'style-loader',
    };

    const miniCssExtractPluginLoader = {
        // After all CSS loaders we use plugin to do his work.
        // It gets all transformed CSS and extracts it into separate
        // single bundled file
        loader: MiniCssExtractPlugin.loader,
        options: {
            // publicPath: '../',
            // esModule: false,
        },
    };

    const cssLoader = (customOptions) => ({
        // This loader resolves url() and @imports inside CSS
        loader: 'css-loader',
        options: {
            sourceMap: true,
            ...(customOptions ?? {}),
            modules: {
                mode: 'icss',
                ...(customOptions?.modules ?? {}),
            },
        },
    });

    const postCssLoader = {
        // Then we apply postCSS fixes like autoprefixer and minifying
        loader: 'postcss-loader',
        options: {
            // parser: 'postcss-js',
            sourceMap: true,
            postcssOptions: {
                config: vars.pathMapFinder({
                    [`${__dirname}/postcss.config.js`]: __dirname,
                    [`${vars.appRoot}/postcss.config.js`]: vars.appRoot,
                }),
            },
        },
    };

    return {
        mode: vars.isProduction ? 'production' : 'development',
        devtool: vars.isProduction ? 'source-map' : 'inline-source-map',
        context: vars.appRoot,

        output: {
            filename: '[name].js',
            // chunkFilename: '[id].[chunkhash].js',
            chunkFilename: '[id].js',
            publicPath: '/',
            // hotUpdateChunkFilename: 'hot/hot-update.js',
            // hotUpdateMainFilename: 'hot/hot-update.json',
            path: path.join(vars.appRoot, 'dist'),

            assetModuleFilename: 'assets/[name]-[contenthash].[ext]',
        },

        optimization: {
            // moduleIds: 'hashed',
            // chunkIds: 'named', // total-size
            // moduleIds: 'named', // hashed, size
            // emitOnErrors: true,
            // splitChunks: {
            //     cacheGroups: {
            //         defaultVendors: {
            //         },
            //     },
            // },
        },

        module: {
            strictExportPresence: true,

            rules: [
                {
                    oneOf: [
                        {
                            enforce: 'pre',
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
                            exclude: /\.module\.css$/i,
                            use: [
                                useDocumentStyleInjection ? styleLoader : miniCssExtractPluginLoader,
                                cssLoader({
                                    importLoaders: 1,
                                }),
                                postCssLoader,
                            ],
                            sideEffects: true,
                        },
                        {
                            test: /\.module\.css$/i,
                            use: [
                                useDocumentStyleInjection ? styleLoader : miniCssExtractPluginLoader,
                                cssLoader({
                                    importLoaders: 1,
                                    modules: {
                                        mode: 'local',
                                        // localIdentName: '[local]___[hash:base64:5]',
                                        localIdentName: '[local]',
                                        auto: true,
                                        namedExport: true,
                                        exportLocalsConvention: 'camelCase',
                                    },
                                }),
                                postCssLoader,
                            ],
                        },
                        {
                            test: /\.(sa|sc)ss$/i,
                            exclude: /\.module\.(scss|sass)$/i,
                            use: [
                                useDocumentStyleInjection ? styleLoader : miniCssExtractPluginLoader,
                                cssLoader({
                                    importLoaders: 3,
                                }),
                                postCssLoader,
                                {
                                    // First we transform SASS to standard CSS
                                    loader: 'sass-loader',
                                    options: {
                                        implementation: sass,
                                        sassOptions: {
                                        },
                                        sourceMap: true,
                                    },
                                },
                            ],
                        },
                        {
                            test: /\.module\.(scss|sass)$/i,
                            use: [
                                useDocumentStyleInjection ? styleLoader : miniCssExtractPluginLoader,
                                cssLoader({
                                    importLoaders: 3,
                                    modules: {
                                        mode: 'local',
                                        // localIdentName: '[local]___[hash:base64:5]',
                                        localIdentName: '[local]',
                                        auto: true,
                                        namedExport: true,
                                        exportLocalsConvention: 'camelCase',
                                    },
                                }),
                                postCssLoader,
                                {
                                    // First we transform SASS to standard CSS
                                    loader: 'sass-loader',
                                    options: {
                                        implementation: sass,
                                        sassOptions: {
                                        },
                                        sourceMap: true,
                                    },
                                },
                            ],
                        },
                        {
                            test: /\.less$/i,
                            exclude: /\.module\.less$/i,
                            use: [
                                useDocumentStyleInjection ? styleLoader : miniCssExtractPluginLoader,
                                cssLoader({
                                    importLoaders: 3,
                                }),
                                postCssLoader,
                                {
                                    // First we transform LESS to standard CSS
                                    loader: 'less-loader',
                                    options: {
                                        lessOptions: {
                                            javascriptEnabled: true,
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            test: /\.module\.less$/i,
                            use: [
                                useDocumentStyleInjection ? styleLoader : miniCssExtractPluginLoader,
                                cssLoader({
                                    importLoaders: 3,
                                    modules: {
                                        mode: 'local',
                                        // localIdentName: '[local]___[hash:base64:5]',
                                        localIdentName: '[local]',
                                        auto: true,
                                        namedExport: true,
                                        exportLocalsConvention: 'camelCase',
                                    },
                                }),
                                postCssLoader,
                                {
                                    // First we transform LESS to standard CSS
                                    loader: 'less-loader',
                                    options: {
                                        lessOptions: {
                                            javascriptEnabled: true,
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            exclude: [
                                /^$/,
                                /\.([tj]sx?|json|mdx?|html?)$/i,
                            ],
                            type: 'asset/resource',
                        },
                    ],
                },
            ],
        },

        resolve: {
            extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
            modules: [
                path.join(vars.appRoot, 'src'),
                path.join(vars.appRoot, 'node_modules'),
                path.join(vars.dartyRoot, 'node_modules'),
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

        resolveLoader: {
            extensions: [ '.js', '.json' ],
            modules: [
                path.join(vars.appRoot, 'node_modules'),
                path.join(vars.dartyRoot, 'node_modules'),
            ],
            mainFields: [ 'loader', 'main' ],
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(vars.envValue),
                'process.env.PLATFORM': JSON.stringify(name),
                'process.env.DARTY_VARS': JSON.stringify(vars),
            }),
            // new webpack.WatchIgnorePlugin([
            //     /css\.d\.ts$/
            // ]),
            new CaseSensitivePathsPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash:8].css',
                chunkFilename: '[name].[contenthash:8].chunk.css',
            }),
            // new webpack.HotModuleReplacementPlugin(),
            new DotenvPlugin({
                // safe: `${vars.dartyRoot}/templates/.env.default`,
                // path: './.env',
                silent: true,
            }),
            // new BundleAnalyzerPlugin({
            //     // Start analyzer HTTP-server.
            //     // You can use this plugin to just generate Webpack Stats JSON file by
            //     // setting `startAnalyzer` to `false` and `generateStatsFile` to `true`.
            //     startAnalyzer: false,
            //     // Analyzer HTTP-server port
            //     analyzerPort: 8888,
            //     // Automatically open analyzer page in default browser
            //     // if `startAnalyzer` is `true`
            //     openAnalyzer: true,
            //     // If `true`, Webpack Stats JSON file will be generated
            //     // in bundles output directory
            //     generateStatsFile: true,
            //     // Name of Webpack Stats JSON file that will be generated
            //     // if `generateStatsFile` is `true`. Relative to bundles output directory.
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
