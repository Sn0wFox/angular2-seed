"use strict"

const gulp = require("gulp");
const del = require('del');                       // To erase some file during cleaning tasks
const typescript = require('gulp-typescript');    // To make gulp work with TypeScript compiler
const sourcemaps = require('gulp-sourcemaps');    // To produce .map.js files while compiling
const gwebpack = require('gulp-webpack');

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

gulp.task('all:build', ['lib:build', 'server:build']);

gulp.task('all:clean', () => {
  return del('dist/**/*');
});