module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-coverage"),
    ],
    client: { jasmine: { random: false } },
    coverageReporter: {
      dir: require("path").join(__dirname, "coverage/wumpus-hunt"),
      subdir: ".",
      reporters: [
        { type: "html" },
        { type: "text-summary" },
        { type: "lcovonly" },
      ],
    },
    reporters: ["progress"],
    browsers: ["ChromeHeadless"],
    restartOnFileChange: true,
    singleRun: true,
  });
};
