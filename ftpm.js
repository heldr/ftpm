#!/usr/bin/env node
/*
 * ftpm - Font Package Manager
 * https://github.com/heldr/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var ftpm = require('./lib/ftpm'),
    fontDriver = './lib/controller/',
    showContent = false,
    force = false;

ftpm.on('exitMessage', function( log , msg ) {

    log(msg);
    process.exit();

});

ftpm.on('exitWithAdvice', function( text ) {

    ftpm.log.warn( text );
    ftpm.emit( 'exitMessage' , ftpm.log.info , 'Type ftpm -h to get some help :)' );

});

ftpm.on('checkError', function(err) {

    if (err) {
        ftpm.log.error('Unexpected error:');
        ftpm.emit( 'exitMessage' , ftpm.log.error , err );
    }

});

ftpm.on('osfont', function( action , fontName ) {

    fontDriver[action]( fontName , function( err , results ) {

        ftpm.emit( 'checkError' , err );

        if(fontName) {
            ftpm.emit( 'exitMessage' , ftpm.log.success , fontName + ' Font was successfully ' + action + 'ed' );
        } else if(results) {
            ftpm.emit( 'exitMessage' , ftpm.log.info , '\n' + results );
        }

    });

});

ftpm.on('webfont', function( action , fontName ) {

    fontDriver.download( fontName , process.argv[4] , function( err , output ){

        ftpm.emit( 'checkError' , err );
        ftpm.emit( 'exitMessage' , ftpm.log.success , 'new webfont: ' + output );

    });

});

ftpm.on('cssfont', function( action , fontName ) {

    var methods = {
            css: [ 'downloadCSS' , 'show' ],
            datauri: [ 'downloadDataUrl' , 'showDataUrl' ]
        };

    if ( !showContent ) {

        var output = process.argv[4] || false;

        fontDriver[ methods[action][0] ]( fontName , output, function( err , output ) {

            ftpm.emit( 'checkError' , err );
            ftpm.emit( 'exitMessage' , ftpm.log.success , action + ' file created: ' + output );

        });

    } else {

        fontDriver[ methods[action][1] ]( fontName , function(err) {

            ftpm.emit( 'checkError' , err );
            process.exit();

        });

    }

});

ftpm.on('runDriver', function( driverName , action , fontName ) {

    fontDriver = require( fontDriver + driverName );
    ftpm.emit( driverName , action , fontName );

});

// options
ftpm.cli.version( ftpm.name )
    .usage('[action] [font name] [output] [options]')
    .option('-s, --show', 'show css font content when "ftpm css" or "ftpm datauri"')
    .option('-f, --force', 'force system font uninstall without message');

ftpm.cli.on('--help', function() {
    ftpm.emit( 'exitMessage' , ftpm.log.info , ftpm.help() );
});

ftpm.cli.on('show', function() {
    showContent = true;
});

ftpm.cli.on('force', function() {
    force = true;
});

if( process.argv.length > 2 ) {

    ftpm.cli.parse( process.argv );

    var action = process.argv[2],
        fontName = process.argv[3];

    if ( fontName || action === 'local' ) {

        switch ( action ) {

            case 'install':
            case 'local':
                ftpm.emit( 'runDriver' , 'osfont' , action , fontName );
            break;

            case 'uninstall':
                if (!force) {
                    ftpm.cli.confirm('Are you sure to uninstall ' + fontName + ' ? (Y/N) ', function(ok) {
                        if (ok) {
                            ftpm.emit( 'runDriver' , 'osfont' , 'uninstall' , fontName );
                        } else {
                            process.exit();
                        }
                    });
                } else {
                    ftpm.emit( 'runDriver' , 'osfont' , 'uninstall' , fontName );
                }
            break;

            case 'web':
                ftpm.emit( 'runDriver' , 'webfont' , action , fontName );
            break;

            case 'css':
            case 'datauri':
                ftpm.emit( 'runDriver' , 'cssfont' , action , fontName );
            break;

            default:
                ftpm.emit( 'exitWithAdvice' , 'Invalid command: ' + action );
            break;

        }

    } else {
        ftpm.emit('exitWithAdvice', action + ' needs more arguments' );
    }

} else {
    ftpm.cli.emit('--help');
}