/*
 * ftpm - Font Package Manager
 * https://github.com/heldr/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

require('../utils/string');

var ftpm        = require('../ftpm'),
    Provider    = require('../provider/google'),
    file        = require('../utils/file'),
    Evt         = require('events').EventEmitter,
    path        = require('../utils/path'),
    log         = require('../utils/log'),
    cssTemplate = require('../template/cssDataUrl');


var evt = new Evt();

evt.on('cssError', function( err , cb ) {
    cb(err);
});

evt.on('cssEncoded', function( err , cb , fontFullPath ) {
    if (err) {
        evt.emit( 'cssError' , err , cb );
    }

    cb( null , fontFullPath );
});

evt.on('writeCss', function( fontFullPath , css , cb ) {

    file.writeFile( fontFullPath , css , 'utf-8' , function(err) {
        if (err) {
            evt.emit( 'cssError' , err , cb );
        }

        evt.emit( 'cssEncoded' , err , cb , fontFullPath );
    });

});

evt.on('showCss', function( fontFullPath , css , cb ) {

    log.file( '\n' + css );

    cb( null , css );

});

function getFontConfig( name ) {

    name = name.toTitleCase();

    return {
        name : name,
        file : name.removeSpaces() + '.css'
    };
}

function getCSS( name , output, base64, cb , showContent ) {

    var font = getFontConfig( name ),
        fontFullPath;

    if ( output ) {
        fontFullPath = output + '/' + font.file;
    } else {
        output = '';
        fontFullPath = font.file;
    }

    var fontData = new Provider( font.name , function(err) {
        if (err) {
            evt.emit( 'cssError' , err , cb );
        }

        var css = fontData.getFontStyle();


        path.checkFontPath( output , function () {

            if ( !base64 ) {

                evt.emit( ( (!showContent) ? 'writeCss' : 'showCss' ) , fontFullPath , css , cb );

            } else {

                var url     = fontData.getFontFileUrl(),
                    tmpFile = '__tmpFont' + Math.floor(Math.random()*1000);

                file.getRemoteFile( url , tmpFile , function( err , data ) {
                    if (err) {
                        evt.emit( 'cssError' , err , cb );
                    }

                    file.readFile( tmpFile , 'base64', function( err, content ) {
                        if (err) {
                            evt.emit( 'cssError' , err , cb );
                        }

                        content = cssTemplate({
                            name: font.name,
                            base64Code: content
                        });

                        file.unlink( tmpFile , function(err) {
                            if (err) {
                                evt.emit( 'cssError' , err , cb );
                            }

                            evt.emit( ( (!showContent) ? 'writeCss' : 'showCss' ) , fontFullPath , content , cb );

                        });

                    });

                });

            }

        });

    }, true);
}


var CssFont = {

    showDataUrl : function( name , cb ) {
        getCSS( name , false , true , cb , true );
    },

    show : function( name , cb ) {
        getCSS( name , false , false , cb , true );
    },

    downloadCSS : function( name , output , cb ) {
        getCSS( name , output , false , cb );
    },

    downloadDataUrl : function( name , output , cb ) {
        getCSS( name , output , true , cb );
    }

};

module.exports = CssFont;