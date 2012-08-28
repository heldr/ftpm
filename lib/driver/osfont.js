/*
 * ftpm - Font Package Manager
 * https://github.com/heldr/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var _        = require('underscore'),
    ftpm     = require('../ftpm'),
    Provider = require('../provider/google');

function getFontConfig( name ) {

    name = name.toTitleCase();

    return {
        name : name,
        file : name.removeSpaces() + '.ftpm.ttf',
        path : ftpm.path.getFontPath( ftpm.platform )
    };
}

function searchInstalledFont( name , cb ) {

        var font = ( _.isObject(name) ) ? name : getFontConfig( name );

        ftpm.file.readdir( font.path , function( err , files ) {

            ftpm.emit( 'checkError' , err , cb );

            if( _.isEmpty( files ) ) {

                ftpm.emit( 'successCallback' , cb , files );

            } else {

                var matchedFonts = _.filter( files , function( file ) {
                    if( file.match( font.name.removeSpaces() ) ) {
                        return file;
                    }
                });

                ftpm.emit( 'successCallback' , cb , matchedFonts );

            }

        });

}

var OsFont = {

    install: function( name , cb ) {

        var font = getFontConfig( name ),
            fontFullPath = font.path + font.file;

        ftpm.path.checkFontPath( font.path , function () {

            searchInstalledFont( font , function( err , results ) {

                ftpm.emit( 'checkError' , err , cb );

                if( _.isEmpty( results ) ) {

                    var fontData = new Provider( font.name , function(err) {

                        ftpm.emit( 'checkError' , err , cb );

                        fontData.url = fontData.getFontFileUrl();

                        ftpm.file.getRemoteFile( fontData.url , fontFullPath , function( err , data ) {

                            ftpm.emit( 'checkError' , err , cb );

                            ftpm.emit( 'successCallback' , cb , fontFullPath );

                        });

                    });

                } else {

                    ftpm.emit('warning', font.name + ' Font is already installed');

                }

            });

        });

    },

    local: function( name, cb ) {

        name = name || '';

        searchInstalledFont( name , function( err , files ) {

            ftpm.emit( 'checkError' , err , cb );

            files = files.join('').split('.ftpm.ttf').join('\n');
            ftpm.emit( 'successCallback' , cb , files );

        });

    },

    uninstall : function( name , cb ) {

        var font = getFontConfig( name ),
            fontFullPath = font.path + font.file;

        searchInstalledFont( font , function( err , results ) {

            ftpm.emit( 'checkError' , err , cb );

            if( !_.isEmpty( results ) && _.isEqual( results[0] , font.file ) ) {

                ftpm.file.unlink( fontFullPath , cb );

            } else {

                ftpm.emit('warning', font.name + ' Font is not installed');

            }

        });
    }

};

module.exports = OsFont;