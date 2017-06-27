var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var zip = require('gulp-vinyl-zip');

var appsPath = 'apps';

function getApps(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

gulp.task('default', ['pack']);

gulp.task('pack', function() {
   var apps = getApps(appsPath);

   return apps.map(function(folder) {
      return gulp.src(path.join(appsPath, folder, '/**/*'))
        .pipe(zip.dest('lambda/' + folder + '.zip'));
   });
});
