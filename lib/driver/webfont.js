/*
 * ftpm - Font Package Manager
 * https://github.com/heldr/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var ftpm     = require('../ftpm'),
    Provider = require('../provider/google');

function getFontConfig( name ) {

    name = name.toTitleCase();

    return {
        name : name,
        file : name.removeSpaces() + '.woff'
    };
}

function getWebFont( name , output, cb ) {

    var font = getFontConfig( name ), fontFullPath;

    if ( output ) {
        fontFullPath = output + '/' + font.file;
    } else {
        output = '';
        fontFullPath = font.file;
    }


    var fontData = new Provider( font.name , function(err) {

        ftpm.emit( 'checkError' , err , cb );

        ftpm.path.checkFontPath( output , function () {

            ftpm.emit('writeRemoteFile', fontData.getFontFileUrl() , fontFullPath , cb );

        });

    }, true);

}

module.exports = {
    download : getWebFont
};