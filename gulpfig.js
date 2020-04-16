
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
        }
    ],

    VENDOR_SCSS = [
        "./src/assets/sass/*.scss",
    ],
    SCSS = [
        "./src/assets/sass/*.scss",
    ],
    VENDOR_JS = [
        "./src/assets/js/*.js",
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
