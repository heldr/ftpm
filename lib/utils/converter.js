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
    ftpm    = require('../ftpm');

module.exports = {
    ttf2svg: function( ttfFile , cb ) {
        execute( 'java -jar ' +  __dirname + '/../vendor/batik-ttf2svg.jar ' + ttfFile + ' -o ' + ttfFile.replace('.ttf','.svg') + ' -id ' + ttfFile.replace('.ttf','') , cb );
    },
    ttf2eot: function( ttfFile , cb ) {
        var platform = process.platform,
            extension = '';

        switch(platform) {
            case 'darwin':
            case 'linux':
                extension = '_' + platform;

                if (platform === 'linux') {
                    extension += process.arch.match(/\d+/g)[0];
                }
            break;
            case 'win32':
                extension = '.exe';
            break;
            default:
                ftpm.emit('warning', 'Feature not available for ' + platform );
            break;
        }

        execute( __dirname + '/../vendor/ttf2eot' + extension + ' < ' + ttfFile + ' > ' + ttfFile.replace('.ttf','.eot') , cb );
    }
};