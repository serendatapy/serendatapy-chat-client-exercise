const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const del = require('del');
const $ = require('gulp-load-plugins')();

// Utility to ignore unnecessary files
// when generating the glob patterns array for gulp.src()
function addDefSrcIgnore (srcArr) {
  return srcArr.concat([
    '!**/REMOVE{,/**}',
    '!node_modules{,/**}',
    '!private{,/**}',
    '!dist{,/**}',
    '!.git{,/**}',
    '!**/.DS_Store'
  ]);
}

gulp.task('default', function () {
  const npmConfig = require('./package.json');
  browserSync.init({
    server: {
      baseDir: `./app${npmConfig.name.includes('master') ? '/REMOVE' : ''}`
    }
  });
  gulp
    .watch(['app/index.html', 'app/style.css', 'app/script.js'])
    .on('change', browserSync.reload);
});

// JavaScript and JSON linter
gulp.task('lint-js', function () {
  return gulp
    .src(addDefSrcIgnore(['**/*.js', '**/*.json']), { dot: true })
    .pipe($.eslint({ dotfiles: true }))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

// HTML linter
gulp.task('lint-html', function () {
  return gulp
    .src(addDefSrcIgnore(['**/*.html']))
    .pipe($.htmlLint({ htmllintrc: '.htmllintrc.json' }))
    .pipe($.htmlLint.format())
    .pipe($.htmlLint.failAfterError());
});

// CSS linter
gulp.task('lint-css', function () {
  return gulp.src(addDefSrcIgnore(['**/*.css'])).pipe(
    $.stylelint({
      failAfterError: true,
      reporters: [{ formatter: 'string', console: true }]
    })
  );
});

// Lint all files
gulp.task('lint', gulp.series('lint-js', 'lint-html', 'lint-css'));

// Remove solutions from exercises
gulp.task(
  'remove-solutions',
  gulp.series('lint', function () {
    del.sync('dist');
    return gulp
      .src(addDefSrcIgnore(['**']), { dot: true })
      .pipe(
        $.replace(
          /^\s*(\/\/|<!--|\/\*)\s*REMOVE-START[\s\S]*?REMOVE-END\s*(\*\/|-->)?\s*$/gm,
          ''
        )
      )
      .pipe(gulp.dest('dist'));
  })
);

// Prepare for distribution to students
gulp.task(
  'dist',
  gulp.series('remove-solutions', function (done) {
    function removeMaster (str) {
      var strArr = str.split('-');
      strArr[strArr.length - 1] === 'master' && strArr.pop();
      return strArr.join('-');
    }

    const npmConfig = require('./package.json');
    npmConfig.name = removeMaster(npmConfig.name);
    npmConfig.repository.url = removeMaster(npmConfig.repository.url);
    npmConfig.scripts['precommit'] = 'gulp lint';
    fs.writeFileSync('dist/package.json', JSON.stringify(npmConfig, null, 2));

    const esLintConfig = require('./.eslintrc.json');
    esLintConfig.rules['no-undef'] = 'off';
    esLintConfig.rules['no-unused-vars'] = 'off';
    fs.writeFileSync(
      'dist/.eslintrc.json',
      JSON.stringify(esLintConfig, null, 2)
    );
    done();
  })
);
