# angular2-seed

Cloned from https://github.com/angular/angular2-seed.
This repo adds gulp and production build tools for a Node.js server.

**Still under development.**

## Prerequisites
- Make sure you have [node.js](https://nodejs.org/) installed version 5+
- Make sure you have NPM installed version 3+
- `WINDOWS ONLY` run `npm install -g gulp-cli webpack webpack-dev-server typescript` to install global dependencies

## Usage
- run `npm install` to install dependencies
- run `gulp all:build` to build server-side
- run `npm run build` to build client-side
- run `gulp client:static` to copy static files
- run `node dist/server/main.js` to start server
- open browser to [`http://localhost:3000`](http://localhost:3000)

## (OLD CONF) Dev-server
- run `npm install` to install dependencies
- run `npm start` to fire up dev server
- open browser to [`http://localhost:3000`](http://localhost:3000)
- if you want to use other port, open `package.json` file, then change port in `--port 3000` script
