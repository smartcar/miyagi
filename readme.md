# miyagi

A collection of gulp tools for linting web components.

## Install

```
$ npm install --save-dev miyagi
```

## Usage

Miyagi exposes separate methods for linting html, css, javascript, and polymer components. Each method draws on a list of default settings that can be overridden by passing in an 'options' object.

Each method utilizes a different gulp plugin. [polymer](https://github.com/Banno/polymer-lint) [html](https://github.com/coditorium/gulp-html-lint) [css](https://github.com/lazd/gulp-csslint) [javascript](https://github.com/adametry/gulp-eslint)

Configuration for eslint is an extension of [eslint-config-smartcar.](https://github.com/smartcar/eslint-config-smartcar)

```js
var miyagi = require('miyagi');

gulp.task('lint-javascript', miyagi.eslint('directory/myfile.html'));

gulp.task('lint-css', miyagi.csslint('directory/**/*.html', {'box-model': true}));

gulp.task('lint-html', miyagi.htmllint(['directory/**/*.html', '!directory/myfile.html']));

gulp.task('lint-polymer', miyagi.polymerlint('directory/myfile.html', {'one-component': false}));
```
