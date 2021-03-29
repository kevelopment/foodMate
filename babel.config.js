module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json",
          ],
          alias: {
            "@models": "./src/models",
            "@theme": "./native-base-theme/variables/theme",
            "@components": "./src/components",
            "@navigation": "./src/navigation",
          },
        },
      ],
    ],
  };
};
