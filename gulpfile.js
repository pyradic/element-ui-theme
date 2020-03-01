'use strict';

const {series, src, dest} = require('gulp');
// const sass = require('gulp-sass');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const {resolve} = require ('path')
const magicImporter = require('node-sass-magic-importer');
const packageImporter = require('node-sass-package-importer');

const options = {
    // Defines the path in which your node_modules directory is found.
    cwd: resolve(__dirname, '../../..'),
    // Define the package.json keys and in which order to search for them.
    packageKeys: [
        'sass',
        'scss',
        'style',
        'css',
        'main.sass',
        'main.scss',
        'main.style',
        'main.css',
        'main'
    ],
    // You can set the special character for indicating a module resolution.
    packagePrefix: '~',
    // Disable console warnings.
    disableWarnings: false,
    // Disable importing files only once.
    disableImportOnce: false,
    // Add custom node filters.
    customFilters: undefined
};


function compile() {
    return src('./src/*.scss')
        .pipe(sass.sync({

            // importer: magicImporter(options)
            importer: packageImporter({
                cwd: options.cwd,
                packagePrefix: options.packagePrefix
            })
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['ie > 9', 'last 2 versions'],
            cascade             : false,
        }))
        .pipe(cssmin())
        .pipe(dest('./lib'));
}

function copyfont() {
    return src('./src/fonts/**')
        .pipe(cssmin())
        .pipe(dest('./lib/fonts'));
}

exports.build = series(compile, copyfont);
exports.default = series(compile, copyfont);
