#!/usr/bin/env node
/*
 * FTPM - Font Package Manager
 * http://heldr.github.com/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var ftpm = require('./lib/ftpm'),
    fontDriver = './lib/driver/';

ftpm.on('exitMessage', function( log , msg ) {

    log(msg);
    process.exit();

});

ftpm.on('exitWithAdvice', function( text ) {

    this.log.warn( text );
    this.emit( 'exitMessage' , this.log.info , 'Type ftpm -h to get some help :)' );

});

ftpm.on('checkError', function(err) {

    if (err) {
        this.log.error('Unexpected error:');
        this.emit( 'exitMessage' , ftpm.log.error , err );
    }

});

ftpm.on('osfont', function( action , fontName ) {

    if (this.platform === 'win32') {
        this.emit('warning', action  + ' is not available for Windows');
    }

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
        ftpm.emit( 'exitMessage' , ftpm.log.success , 'Crossbrowser fonts were successfully created' );

    });

});

ftpm.on('cssfont', function( action , fontName ) {

    var methods = {
            css: [ 'downloadCSS' , 'show' ],
            datauri: [ 'downloadDataUrl' , 'showDataUrl' ]
        };

    if ( !ftpm.show ) {

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
    this.emit( driverName , action , fontName );

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
    ftpm.show = true;
});

ftpm.cli.on('force', function() {
    ftpm.force = true;
});

if( process.argv.length > 2 ) {

    ftpm.cli.parse( process.argv );

    var action = process.argv[2],
        fontName = process.argv[3];

    if ( fontName || action === 'local' ) {

        switch ( action ) {

            case 'install':
            case 'local':
            case 'uninstall':
                ftpm.emit( 'runDriver' , 'osfont' , action , fontName );
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