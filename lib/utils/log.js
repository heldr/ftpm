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
    color;

LogHelper.skin = {
    success: 'green',
    warn: 'yellow',
    info: 'grey',
    error: 'red',
    file: 'white'
};

colors.setTheme(LogHelper.skin);

function addLogColor( skin , color ) {

    LogHelper[color] = function(msg) {
        console.log('\n   ' + msg[ skin[color] ] + '\n');
    };

}

for( color in LogHelper.skin ) {

    addLogColor( LogHelper.skin , color );

}

module.exports = LogHelper;