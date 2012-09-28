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
    request = require('request'),
    path = require('path'),
    util = require('util');

var fileUtils = _.extend( require('fs') , {

    getRemoteContent: function( url, cb, browserUserAgent ) {

        var requestConfig = {
            uri : url,
            encoding : 'binary'
        };

        if ( browserUserAgent ) {

            requestConfig.headers = {
                'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11'
            };

        }

        request( requestConfig, function ( err, res, content ) {

            if ( err ) {
                cb( err );
            }

            if ( res && res.statusCode === 200 ) {
                cb( null, res, content);
            } else {
                cb( err, res );
            }

        });

    },

    getRemoteFile: function( url, output, cb ) {

        var self = this;

        this.getRemoteContent( url, function( err, res, content ) {

            if ( err ) {
                cb( err );
            }

            self.writeFile( output, content, 'binary', function(err) {

                if ( err ) {
                    cb( err );
                }

                cb( null, {
                    statusCode: res.statusCode,
                    output: output
                });

            });

        });

    }

});

module.exports = fileUtils;