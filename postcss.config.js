const Autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    new Autoprefixer({
      browsers: [">1%", "last 2 versions"],
    }),
  ],
};
