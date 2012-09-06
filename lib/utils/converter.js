/*
 * FTPM - Font Package Manager
 * http://heldr.github.com/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var execute = require('child_process').exec,
    isWin = (process.platform === 'win32');

module.exports = {
    ttf2svg: function( ttfFile , cb ) {
        execute( 'java -jar ' +  __dirname + '/../vendor/batik-ttf2svg.jar ' + ttfFile + ' -o ' + ttfFile.replace('.ttf','.svg') + ' -id ' + ttfFile.replace('.ttf','') , cb );
    },
    ttf2woff: function( ttfFile , cb ) {
        execute( __dirname + '/../vendor/sfnt2woff' + ( (!isWin) ? ' ' : '.exe ') + ttfFile , cb );
    },
    ttf2eot: function( ttfFile , cb ) {
        execute( __dirname + '/../vendor/ttf2eot' + ( (!isWin) ? ' ' : '.exe ') + ttfFile + ' > ' + ttfFile.replace('.ttf','.eot') , cb );
    }
};