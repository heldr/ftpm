/*
 * ftpm - Font Package Manager
 * https://github.com/heldr/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

require('../utils/string.js');

var file  = require('../utils/file.js'),
    _     = require('lodash');

var GoogleFontProvider = function ( fontName , cb , woff ) {

    var self = this;

    file.getRemoteContent('http://fonts.googleapis.com/css?family=' + fontName.addPlusBetweenWords() , function( err, res, data ){

        if ( err ) {
            cb(err);
        } else if(res.statusCode !== 200) {
            cb('The requested font is not available. Error: ' + res.statusCode);
        }

        self.css = data;
        cb();

    }, (woff));
};

_.extend( GoogleFontProvider.prototype , require('../utils/provider.js') );

module.exports = GoogleFontProvider;