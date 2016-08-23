var gulp = require('gulp');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');

var PUBLIC = `${__dirname}/public`;

var paths = {
    scss: {
        all: [ `${PUBLIC}/styles/**/*.scss` ],
        compileReady: [ `${PUBLIC}/styles/pages/*.scss` ]
    },
    css: `${PUBLIC}/static/css`
};

gulp.task( 'styles', () => {

    return gulp.src( paths.scss.compileReady )
    .pipe( maps.init() )
    .pipe( sass() )
    .pipe( maps.write() )
    .pipe( gulp.dest( paths.css ) );

});

gulp.task( 'watch', ['styles'], () => {

    gulp.watch( paths.scss.all, ['styles'] );

});
