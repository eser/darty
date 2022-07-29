const { configWrapper, commonConfig } = require("./webpack.common");

const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

const serverConfig = configWrapper((vars) => {
  const common = commonConfig("server", false)(vars.webpackOptions, vars.argv);

  // const packageJson = require(`${vars.appRoot}/package.json`);
  // const whiteListModules = [
  //     ...Object.keys(packageJson.dependencies || {}),
  //     ...Object.keys(packageJson.devDependencies || {}),
  // ];

  return {
    ...common,

    bail: true,

    target: "node",
    externals: [
      nodeExternals({
        allowlist: /^(?!fs$|path$|express$|webpack$).*/, // anything but fs, path, express and webpack
      }),
    ],

    entry: {
      "server": [`${vars.dartyRoot}/etc/entryPoints/index.server.tsx`],
    },

    output: {
      ...common.output,
      // library: 'app',
      libraryExport: "default",
      libraryTarget: "commonjs2",
    },

    optimization: {
      ...common.optimization,
      moduleIds: "named",
    },

    module: {
      ...common.module,

      rules: [
        ...common.module.rules,
        // {
        //     test: /\.(jpe?g|png|gif|ico)([\?]?.*)$/i,
        //     type: 'asset/resource',
        // },
        // {
        //     test: /\.(woff2?|ttf|otf|eot)([?]?.*)$/i,
        //     type: 'asset/resource',
        // },
        // {
        //     test: /\.(svg)([\?]?.*)$/i,
        //     type: 'asset/resource',
        // },
      ],
    },

    plugins: [
      ...common.plugins,
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  };
});

module.exports = serverConfig;
