/*
 * ftpm - Font Package Manager
 * https://github.com/heldr/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    wrench = require('wrench');

var fontPaths = {
    darwin: process.env.HOME + '/Library/Fonts/',
    linux: process.env.HOME + '/.fonts/'
};

var PathHelpers = _.extend( require('path') , {

    getFontPath : function( os ) {
        return fontPaths[os];
    },

    checkFontPath : function( fontPath, cb ) {

        if(fontPath) {

            //for node 0.6
            var existsHelper = fs.exists || this.exists;

            if( !existsHelper(fontPath) ) {

                wrench.mkdirSyncRecursive( fontPath );
                cb( fontPath );

            } else {
                cb( fontPath );
            }

        } else {
            cb( fontPath );
        }

    }

});

module.exports = PathHelpers;