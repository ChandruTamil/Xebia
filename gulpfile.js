"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  Server = require('karma').Server,
  uglify = require("gulp-uglify");

var paths = {
    webroot:'js'
};

paths.js = paths.webroot + "/controllers/*.js";
paths.directive = paths.webroot + "/directives/*.js";
paths.concatJsDest = paths.webroot + "/controllers/controllers.min.js";
paths.concatJsDestDirective = paths.webroot + "/directives/directives.min.js";
paths.service = paths.webroot + "/services/*.js";
paths.concatJsDestService = paths.webroot + "/services/service.min.js";


gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});
gulp.task("clean:dirjs", function (cb) {
    rimraf(paths.concatJsDestDirective, cb);
});
gulp.task("clean:servicejs", function (cb) {
    rimraf(paths.concatJsDestService, cb);
});

gulp.task("clean", ["clean:js", "clean:dirjs", "clean:servicejs"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
      .pipe(concat(paths.concatJsDest))
      .pipe(uglify())
      .pipe(gulp.dest("."));
});
gulp.task("min:dirjs", function () {
    return gulp.src([paths.directive, "!" + paths.minJs], { base: "." })
      .pipe(concat(paths.concatJsDestDirective))
      .pipe(uglify())
      .pipe(gulp.dest("."));
});

gulp.task("min:servicejs", function () {
    return gulp.src([paths.service, "!" + paths.minJs], { base: "." })
      .pipe(concat(paths.concatJsDestService))
      .pipe(uglify())
      .pipe(gulp.dest("."));
});


gulp.task("min", ["min:js", "min:dirjs", "min:servicejs"]);
//gulp.task("test", ["min:js", "min:dirjs", "min:servicejs"]);
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/test/config/karma.conf.js',
        singleRun: true
    }, done).start();
});