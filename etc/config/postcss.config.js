const fs = require("fs");
const path = require("path");

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);

  if (fs.existsSync(dirname)) {
    return;
  }

  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function writeToFile(target, content) {
  ensureDirectoryExistence(target);

  fs.writeFileSync(
    target,
    JSON.stringify(content),
  );
}

module.exports = (ctx) => {
  const isProduction = (ctx.env === "production");

  const configAutoprefixer = {
    browsers: ["last 2 versions", "> 5%"],
  };

  const configCssNano = {
    preset: [
      "default",
      {
        discardComments: { removeAll: true },
      },
    ],
  };

  return {
    plugins: {
      "postcss-import": { skipDuplicates: true },
      autoprefixer: isProduction ? configAutoprefixer : false,
      cssnano: isProduction ? configCssNano : false,
      "postcss-nesting": true,
    },
  };
};
