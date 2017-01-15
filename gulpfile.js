"use strict"

const gulp = require("gulp");
const gpug = require("gulp-pug");                 // To support pug compile
const gsass = require("gulp-sass");               // To support scss and sass compile
const typescript = require('gulp-typescript');    // To make gulp work with TypeScript compiler
const sourcemaps = require('gulp-sourcemaps');    // To produce .map.js files while compiling
const gwebpack = require('gulp-webpack');         // To use webpack with gulp
const del = require('del');                       // To erase some file during cleaning tasks


// TODO: separate this config
const tscConfig = require('./tsconfig.json');     // Gather the options for TypeScript compiler
const wpconf = require('./webpack.config.js');

/**
 * Compiles TypeScript files using the typings,
 * and generates .map.js files too.
 */
gulp.task('server:build', () => {
  return gulp
    .src(['src/server/**/*.ts', 'node_modules/@types/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("dist/server"));
});

gulp.task('lib:build', () => {
  return gulp
    .src(['src/lib/**/*.ts', 'node_modules/@types/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("dist/lib"));
});

gulp.task('client:build', () => {
  return gulp
    .src('src/client/app/main.ts')
    .pipe(gwebpack(wpconf))
    .pipe(gulp.dest('dist/client'));
});

gulp.task('client:pug', () => {
  return gulp
    .src('src/client/index.pug')
    .pipe(gpug())
    .pipe(gulp.dest('dist'));   // TODO: in a /client
});

gulp.task('client:sass', () => {
  return gulp
    .src('src/client/index.scss')
    .pipe(gsass())
    .on('error', (err) => {
      console.error('\x07'); // so it doesn't just fail (literally) silently!
      gsass.logError.bind(this)(err);
    })
    .pipe(gulp.dest('dist'));   // TODO: in a /client
});

gulp.task('client:static', () => {
  return gulp
    .src(['src/client/favicon.ico'])
    .pipe(gulp.dest('dist'));   // TODO; in a /client
});

gulp.task('client:assets', ['client:pug', 'client:sass', 'client:static']);

gulp.task('all:build', ['lib:build', 'server:build']);

gulp.task('all:clean', () => {
  return del('dist/**/*');
});