/*
 * ftpm - Font Package Manager
 * https://github.com/heldr/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

var ftpm   = require('./lib/ftpm'),
    log    = require('./lib/utils/log'),
    events = require('events'),
    evt    = new events.EventEmitter();


evt.on('exitMessage', function( log , msg ) {
    log(msg);
    process.exit();
});

evt.on('showAdvice', function() {
    evt.emit( 'exitMessage' , log.info , 'Type ftpm -h to get some help :)' );
});

evt.on('checkError', function(err) {
    if (err) {
        log.error('Unexpected error:');
        evt.emit( 'exitMessage' , log.error , err );
    }
});

if( process.argv.length > 2 && process.argv[2] !== '-h') {

    var action = process.argv[2],
        fontName = process.argv[3],
        fontDriver = './lib/controller/';

    if ( fontName || action === 'local' ) {

        if( action.match(/^((un)?install|local)$/) ) {

            fontDriver = require( fontDriver + 'osfont' );

            fontDriver[action]( fontName , function( err , results ) {

                evt.emit( 'checkError' , err );

                if(fontName) {
                    evt.emit( 'exitMessage' , log.success , fontName + ' Font was successfully ' + action + 'ed' );
                } else if(results) {
                    evt.emit( 'exitMessage' , log.info , '\n' + results );
                }

            });

        } else if( action === 'web' ) {

            fontDriver = require( fontDriver + 'webfont' );

            fontDriver.download( fontName , process.argv[4] , function( err , output ){

                evt.emit( 'checkError' , err );
                evt.emit( 'exitMessage' , log.success , 'new webfont: ' + output );

            });

        } else if( action.match(/^(css|dataurl)$/) ) {

            fontDriver = require( fontDriver + 'cssfont' );

            var showContent = ( process.argv[4] && process.argv[4].match(/(\-(\-)?s(how)?)/i) );

            switch(action) {

                case 'css':

                    if ( !showContent ) {

                        var output = process.argv[4] || false;

                        fontDriver.downloadCSS( fontName , output, function( err , output ) {

                            evt.emit( 'checkError' , err );
                            evt.emit( 'exitMessage' , log.success , action + ' file created: ' + output );

                        });

                    } else {

                        fontDriver.show( fontName , function(err) {

                            evt.emit( 'checkError' , err );
                            process.exit();

                        });

                    }

                break;

                case 'dataurl':

                    if ( !showContent ) {

                        var output = process.argv[4] || false;

                        fontDriver.downloadDataUrl( fontName , output, function( err, output ) {

                            evt.emit( 'checkError' , err );
                            evt.emit( 'exitMessage' , log.success , action + ' file created: ' + output );

                        });

                    } else {

                        fontDriver.showDataUrl( fontName , function(err) {

                            evt.emit( 'checkError' , err );
                            process.exit();

                        });

                    }

                break;

            }

        } else {

            log.error('Invalid command: ' + action );
            evt.emit('showAdvice');

        }

    } else {

        log.warn(action + ' needs more arguments');
        evt.emit('showAdvice');
    }

} else {
    evt.emit( 'exitMessage' , log.info , ftpm.help() );
}