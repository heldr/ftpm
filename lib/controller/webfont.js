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

var ftpm     = require('../ftpm'),
    Provider = require('../provider/google'),
    file     = require('../utils/file'),
    path     = require('../utils/path');


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
        if (err) {
            cb(err);
        }

        path.checkFontPath( output , function () {

            fontData.url = fontData.getFontFileUrl();

            file.getRemoteFile( fontData.url , fontFullPath , function( err , data ) {
                if (err) {
                    cb(err);
                }

                cb( null , fontFullPath );
            });

        });

    }, true);

}

module.exports = {
    download : getWebFont
};