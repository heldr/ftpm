/*
 * FTPM - Font Package Manager
 * http://heldr.github.com/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var LogHelper = {},
    colors    = require('colors'),
    skin      = {
        success: 'green',
        warn: 'yellow',
        info: 'grey',
        error: 'red',
        file: 'white'
    },
    color;

colors.setTheme(skin);

function addLogColor( skin , color ) {

    LogHelper[color] = function(msg) {
        console.log('\n   ' + msg[ skin[color] ] + '\n');
    };

}

for( color in skin ) {

    addLogColor( skin , color );

}

module.exports = LogHelper;