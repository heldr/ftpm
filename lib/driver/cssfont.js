/*
 * ftpm - Font Package Manager
 * https://github.com/heldr/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var ftpm        = require('../ftpm'),
    Provider    = require('../provider/google'),
    cssTemplate = require('../template/cssDataUrl');

ftpm.on('showCss', function( fontFullPath , css , cb ) {

    this.log.file( '\n' + css );

    ftpm.emit( 'successCallback' , cb , css );

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

        ftpm.emit( 'checkError' , err , cb );

        var css = fontData.getFontStyle();


        ftpm.path.checkFontPath( output , function () {

            if ( !base64 ) {

                ftpm.emit( ( (!showContent) ? 'writeFile' : 'showCss' ) , fontFullPath , css , cb );

            } else {

                var url     = fontData.getFontFileUrl(),
                    tmpFile = '__tmpFont' + Math.floor(Math.random()*1000);

                ftpm.file.getRemoteFile( url , tmpFile , function( err , data ) {

                    ftpm.emit( 'checkError' , err , cb );

                    ftpm.file.readFile( tmpFile , 'base64', function( err, content ) {

                        ftpm.emit( 'checkError' , err , cb );

                        content = cssTemplate({
                            name: font.name,
                            base64Code: content
                        });

                        ftpm.file.unlink( tmpFile , function(err) {

                            ftpm.emit( 'checkError' , err , cb );

                            ftpm.emit( ( (!showContent) ? 'writeFile' : 'showCss' ) , fontFullPath , content , cb );

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