/*
 * ftpm - Font Package Manager
 * https://github.com/heldr/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

require('../utils/string');

var _        = require('underscore'),
    ftpm     = require('../ftpm'),
    Provider = require('../provider/google'),
    file     = require('../utils/file'),
    path     = require('../utils/path'),
    log      = require('../utils/log');


function getFontConfig( name ) {

    name = name.toTitleCase();

    return {
        name : name,
        file : name.removeSpaces() + '.ftpm.ttf',
        path : path.getFontPath( ftpm.platform )
    };
}

function searchInstalledFont( name , cb ) {

        var font = ( _.isObject(name) ) ? name : getFontConfig( name );

        file.readdir( font.path , function( err , files ) {

            if(err) {
                cb(err);
            } else if( _.isEmpty( files ) ) {
                cb( null, files);
            } else {

                var matchedFonts = _.filter( files , function( file ) {
                    if( file.match( font.name.removeSpaces() ) ) {
                        return file;
                    }
                });

                cb( null , matchedFonts );

            }

        });

}

var OsFont = {

    install: function( name , cb ) {

        var font = getFontConfig( name ),
            fontFullPath = font.path + font.file;

        path.checkFontPath( font.path , function () {

            searchInstalledFont( font , function( err , results ) {
                if (err) {
                    cb(err);
                }

                if( _.isEmpty( results ) ) {

                    var fontData = new Provider( font.name , function(err) {
                        if (err) {
                            cb(err);
                        }

                        fontData.url = fontData.getFontFileUrl();

                        file.getRemoteFile( fontData.url , fontFullPath , function( err , data ) {
                            if (err) {
                                cb(err);
                            }

                            cb( null , fontFullPath );
                        });

                    });

                } else {

                    log.warn( font.name + ' Font is already installed' );
                    process.exit();

                }

            });

        });

    },

    local: function( name, cb ) {

        name = name || '';

        searchInstalledFont( name , function( err , files ) {

            if(err) {
                cb( err );
            } else {

                files = files.join('').split('.ftpm.ttf').join('\n');
                cb( null, files );

            }

        });

    },

    uninstall : function( name , cb ) {

        var font = getFontConfig( name ),
            fontFullPath = font.path + font.file;

        searchInstalledFont( font , function( err , results ) {

            if (err) {
                cb( err );
            }

            if( !_.isEmpty( results ) && _.isEqual( results[0] , font.file ) ) {

                file.unlink( fontFullPath , cb );

            } else {

                log.warn( font.name + ' Font is not installed' );
                process.exit();

            }

        });
    }

};

module.exports = OsFont;