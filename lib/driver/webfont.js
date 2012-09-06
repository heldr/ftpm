/*
 * FTPM - Font Package Manager
 * http://heldr.github.com/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var ftpm     = require('../ftpm'),
    Provider = require('../provider/google');

function getFontConfig( name , crossbrowser ) {

    name = name.toTitleCase();

    return {
        name : name,
        file : name.removeSpaces() + '.' + ( (crossbrowser) ? 'ttf' : 'woff' )
    };
}

function getWebFont( name , output, cb , crossbrowser ) {

    var font = getFontConfig( name , crossbrowser ), fontFullPath;

    if ( output ) {
        fontFullPath = output + '/' + font.file;
    } else {
        output = '';
        fontFullPath = font.file;
    }


    var fontData = new Provider( font.name , function(err) {

        ftpm.emit( 'checkError' , err , cb );

        ftpm.path.checkFontPath( output , function () {

            if (!crossbrowser) {
                ftpm.emit('writeRemoteFile', fontData.getFontFileUrl() , fontFullPath , cb );
            } else {

                var tempDir = '__tempCrossWebFT';

                fontFullPath = tempDir + '/' + font.file;

                ftpm.file.mkdir( tempDir , function(err){

                    ftpm.emit('writeRemoteFile', fontData.getFontFileUrl() , fontFullPath , function ( err ) {

                        ftpm.emit( 'checkError' , err , cb );

                    });

                });

            }

        });

    }, (!crossbrowser) );

}

module.exports = {
    download : getWebFont,
    downloadCrossBrowser : function( name , output , cb ) {
        getWebFont( name , output, cb , true );
    }
};