var fs = require("fs");
var browserify = require("browserify");
browserify("./src/main.js")
  .transform("babelify", {presets: ["es2015", "react", "stage-2"]})
  .bundle()
  .pipe(fs.createWriteStream("./src/server/resources/build.js"));