/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const configWrapper = (targetConfigFunction) => (env, argv) => {
    const appRoot = process.cwd();
    const dartRoot = path.resolve(__dirname, '../../');

    const envValue = argv.mode || process.env.NODE_ENV || 'development';
    const isProduction = (envValue === 'production');

    let manifest;

    try {
        manifest = require(`${appRoot}/manifest.json`);
    }
    catch (ex) {
        manifest = {};
    }

    return targetConfigFunction({
        env,
        argv,
        manifest,
        appRoot,
        dartRoot,
        envValue,
        isProduction,
    });
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

        module: {
            strictExportPresence: true,

            rules: [
                {
                    parser: {
                        requireEnsure: false,
                    },
                },
                {
                    test: /\.[tj]sx?$/,
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
                    exclude: /node_modules/,
                },
            ],
        },

        resolve: {
            extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
            modules: [
                path.join(vars.appRoot, 'src'),
                path.join(vars.appRoot, 'node_modules'),
            ],
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: `${vars.dartRoot}/core/etc/tsconfig.json`,
                    extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
                    baseUrl: vars.appRoot,
                }),
            ],
            alias: {
                'react-native': 'react-native-web',
            },
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(vars.envValue),
                    DART_VARS: JSON.stringify(vars),
                },
            }),
            new webpack.WatchIgnorePlugin([
                /css\.d\.ts$/
            ]),
            new CaseSensitivePathsPlugin(),
            new DotenvPlugin({
                sample: `${vars.dartRoot}/templates/.env.default`,
                path: './.env',
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
