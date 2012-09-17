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
    Provider = require('../provider/google'),
    cssTemplate = require('../template/cssCrossBrowser'),
    showContent;

function getFontConfig( name , crossbrowser ) {

    name = name.toTitleCase();

    return {
        name : name,
        filePattern : name.removeSpaces(),
        file : name.removeSpaces() + '.woff'
    };
}

function createCrossBrowserFonts( font , fontFullPath , cb ) {

    var ttfFontPath = fontFullPath.replace(/\.woff$/,'.ttf'),
        ttfFontData = new Provider( font.name , function(err) {

            ftpm.emit( 'checkError' , err , cb );

            ftpm.emit('writeRemoteFile', ttfFontData.getFontFileUrl() , ttfFontPath , function( err , ttfFontPath ) {

                ftpm.emit( 'checkError' , err , cb );

                ftpm.converter.ttf2svg( ttfFontPath , function() {

                    ftpm.converter.ttf2eot( ttfFontPath , function() {

                        var content = cssTemplate( font );

                        ftpm.emit( ( (!showContent) ? 'writeFile' : 'showCss' ) , fontFullPath.replace(/\.woff$/,'.css') , content , function( err ) {
                            ftpm.emit( 'validateFile' , err, cb , fontFullPath );
                        });
                    });

                });

            });

        });

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

            ftpm.emit('writeRemoteFile', fontData.getFontFileUrl() , fontFullPath , function() {
                ftpm.emit( 'checkError' , err , cb );
                createCrossBrowserFonts( font , fontFullPath , cb );
            });

        });

    }, true );

}

module.exports = {
    download : function( name , output , cb , show ) {
        showContent = show || false;
        getWebFont( name , output, cb , true );
    }
};