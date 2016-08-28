// Angular-CLI build configuration
// This file lists all the node_modules files that will be used in a build
// Also see https://github.com/angular/angular-cli/wiki/3rd-party-libs

/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');
var compileSass = require('broccoli-sass');
var mergeTrees = require('broccoli-merge-trees');
var _ = require('lodash');
var glob = require('glob');

var compileCSS = require('broccoli-postcss');
var cssnext = require('postcss-cssnext');
var cssnano = require('cssnano');

var postCssOptions = {
  plugins: [
    {
      module: cssnext,
      options: {
          browsers: ['> 1%'],
          warnForDuplicates: false
      }
    },
    {
      module: cssnano,
      options: {
          safe: true,
          sourcemap: true
      }
    }
  ]
};


module.exports = function(defaults) {
  var appTree = new Angular2App(defaults, {
    sassCompiler: {
      includePaths: [
        __dirname+'/node_modules/bootstrap/scss'
      ]
    },
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(ts|js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      'bootstrap/dist/js/bootstrap.js',
    ]
  });

  // return appTree;

  // var sass = mergeTrees(_.map(glob.sync('src/**/*.scss'), function(sassFile) {
  //   sassFile = sassFile.replace('src', '');

  //   return compileSass(['src'], sassFile, sassFile.replace(/.scss$/, '.css'));
  // }));

  var css = compileCSS(appTree, postCssOptions);

  return mergeTrees([appTree, css], {overwrite: true});
};
