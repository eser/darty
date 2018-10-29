/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const configWrapper = (targetConfigFunction) => (env, argv) => {
    const varsConstructor = require('./varsConstructor');

    const vars = varsConstructor(env, argv);

    return targetConfigFunction(vars);
};

const commonConfig = (name) => configWrapper((vars) => {
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
                    test: /\.([tj]sx?|mjs)$/,
                    enforce: 'pre',
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                configFile: `${__dirname}/tsconfig.json`,
                            },
                        },
                    ],
                    // exclude: /node_modules/,
                },
            ],
        },

        resolve: {
            extensions: [ '.ts', '.tsx', '.js', '.jsx', '.mjs' ],
            modules: [
                path.join(vars.appRoot, 'src'),
                path.join(vars.appRoot, 'node_modules'),
            ],
            mainFields: [ 'main', 'module' ],
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: `${vars.dartRoot}/core/etc/tsconfig.json`,
                    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.mjs' ],
                    baseUrl: vars.appRoot,
                }),
            ],
            alias: (vars.manifest.dependencyAliases || {}),
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(vars.envValue),
                    PLATFORM: JSON.stringify(name),
                    DART_VARS: JSON.stringify(vars),
                },
            }),
            new webpack.WatchIgnorePlugin([
                /css\.d\.ts$/
            ]),
            new CaseSensitivePathsPlugin(),
            new DotenvPlugin({
                // safe: `${vars.dartRoot}/templates/.env.default`,
                // path: './.env',
                silent: true,
            }),
            new AsyncChunkNames(),
            new BundleAnalyzerPlugin({
                // Start analyzer HTTP-server.
                // You can use this plugin to just generate Webpack Stats JSON file by setting
                // `startAnalyzer` to `false` and `generateStatsFile` to `true`.
                startAnalyzer: false,
                // Analyzer HTTP-server port
                analyzerPort: 8888,
                // Automatically open analyzer page in default browser if `startAnalyzer` is `true`
                openAnalyzer: true,
                // If `true`, Webpack Stats JSON file will be generated in bundles output directory
                generateStatsFile: true,
                // Name of Webpack Stats JSON file that will be generated if `generateStatsFile`
                // is `true`. Relative to bundles output directory.
                statsFilename: `${name}-stats.json`,
            }),
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
