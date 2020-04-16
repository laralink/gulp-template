
// Load package.json for banner
const pkg = require('./package.json');

const
    COPY = [
        //VENDOR
        {
            source: './src/assets/fonts',
            destination: './dist/assets/fonts'
        },
        {
            source: './src/assets/img',
            destination: './dist/assets/img'
        },
        {
            source: './node_modules/font-awesome/fonts',
            destination: './dist/assets/fonts'
        }

    ],

    VENDOR_SCSS = [
        "./node_modules/font-awesome/css/font-awesome.css",
        "./node_modules/bootstrap/dist/css/bootstrap.css",
    ],
    SCSS = [
        "./src/assets/sass/*.scss",
    ],
    VENDOR_JS = [
        "./node_modules/jquery/dist/jquery.js",
        "./node_modules/bootstrap/dist/js/bootstrap.js",
    ],
    JS = [
        "./src/assets/js/*.js",
    ],
    BANNER = ['',
            '  Laralink - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
            '  Copyright 2020-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
            '  Licensed under <%= pkg.license %> (https://github.com/laralink/<%= pkg.name %>/blob/master/LICENSE)\n',
            ''
        ].join('');

exports.default = {COPY, SCSS, VENDOR_JS, VENDOR_SCSS, BANNER, JS}
