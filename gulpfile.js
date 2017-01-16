"use strict"

const gulp = require('gulp');                     // Local gulp lib
const gpug = require('gulp-pug');                 // To support pug compile
const gsass = require('gulp-sass');               // To support scss and sass compile
const gwebpack = require('gulp-webpack');         // To use webpack with gulp
const typescript = require('gulp-typescript');    // To make gulp work with TypeScript compiler
const sourcemaps = require('gulp-sourcemaps');    // To produce .map.js files while compiling
const del = require('del');                       // To erase some file during cleaning tasks

// TODO: separate this config
const tscConfig = require('./tsconfig.json');     // Gather the options for TypeScript compiler
const wpconf = require('./webpack.config.js');


/* BASIC TASKS */

/**
 * Compiles TypeScript files from src/server
 * using the typings, and generates .map.js files too.
 */
gulp.task('server:build', () => {
  return gulp
    .src(['src/server/**/*.ts', 'node_modules/@types/**/*.ts', 'src/custom-typings/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("dist/server"));
});

/**
 * Compiles TypeScript files from src/lib
 * using the typings, and generates .map.js files too.
 */
gulp.task('lib:build', () => {
  return gulp
    .src(['src/lib/**/*.ts', 'node_modules/@types/**/*.ts', 'src/custom-typings/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("dist/lib"));
});

/**
 * Build client javascript with webpack.
 */
gulp.task('client:build:ts', () => {
  // NOTE:  for some reasons, gulp-webpack can't resolve files when
  //        their extension is already written without an empty string
  //        in the resolve.extensions array in the config file.
  //        However, webpack CLI considers it as a not well formated
  //        config file, so we have to add it manually here.
  wpconf.resolve.extensions.push('');
  return gwebpack(wpconf)
    .pipe(gulp.dest('dist/client'));
});

/**
 * Compiles Pug files at the root of src/client.
 */
gulp.task('client:build:pug', () => {
  return gulp
    .src('src/client/*.pug')
    .pipe(gpug())
    .pipe(gulp.dest('dist/client'));
});

/**
 * Compiles Sass (.sass and .scss) files at the root of src/client.
 */
gulp.task('client:build:sass', () => {
  return gulp
    .src(['src/client/*.scss', 'src/client/*.sass'])
    .pipe(gsass())
    .pipe(gulp.dest('dist/client'));
});

/**
 * Copies html and css files at the root of src/client.
 */
gulp.task('client:build:htmlcss', () => {
  return gulp
    .src(['src/client/*.html', 'src/client/*.css'])
    .pipe(gulp.dest('dist/client'));
});

/**
 * Copies static files (e.g. pictures, .ico)
 * from src/client/static into dist/client/static.
 */
gulp.task('client:build:static', () => {
  return gulp
    .src('src/client/static/*')
    .pipe(gulp.dest('dist/client/static'));
});

/**
 * Cleans the dist folder by removing it.
 */
gulp.task('all:clean', () => {
  return del('dist/**/*');
});


/* COMPOSED TASKS */

/**
 * Builds all files other than javascript needed client-side.
 */
gulp.task('client:build:assets', ['client:build:pug', 'client:build:sass', 'client:build:htmlcss', 'client:build:static']);

/**
 * Build all files needed client-side
 * (.ts, .pug, .html, .sass, .scss, .css, client/static/*).
 */
gulp.task('client:build', ['client:build:ts', 'client:build:assets']);

/**
 * Build all javascript files,
 * except those needed client-side.
 * NOTE:  when client:build will work,
 *        this should build client too.
 */
gulp.task('all:build', ['lib:build', 'server:build', 'client:build']);
