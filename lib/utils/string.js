/*
 * ftpm - Font Package Manager
 * https://github.com/heldr/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var path = require('path'),
    _    = require('lodash');

var stringHelpers = {

    toTitleCase: function() {
        return this.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

    removeSpaces: function() {
        return this.replace(/\s/g, '');
    },

    addPlusBetweenWords: function() {
        return this.trim().replace(/\s/g, '+');
    }

};

_.extend( String.prototype , stringHelpers );