/*
 * ftpm - Font Package Manager
 * https://github.com/heldr/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var fs = require('fs'),
    EventEmitter = require('events').EventEmitter,
    _  = require('underscore');

var ftpm = new EventEmitter(),
    version = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')).version;

module.exports = _.extend( ftpm , {

    platform: process.platform,

    name: 'FTPM - Font Package Manager ' + version,

    version: version,

    cli: require('commander'),

    log: require('./utils/log'),

    help: function() {

        return [
            'Examples:',
            '',
            '   # OS',
            '   ftpm install <fontname>                  install a system font',
            '   ftpm uninstall <fontname>                uninstall a system font',
            '   ftpm local                               list all ftpm installed fonts',
            '',
            '   # Webfile',
            '   ftpm web <fontname>                      download a web font file (".woff")',
            '   ftpm web <fontname> public/font          download a web font file (".woff") with output path',
            '',
            '   # CSS',
            '   ftpm css <fontname> public/font          download a css with a remote font path',
            '   ftpm datauri <fontname> public/font      download a css with a datauri font',
            '',
            '   # SHOW CSS CONTENT',
            '   ftpm css <fontname> -s | --show          show a css with a remote font path',
            '   ftpm datauri <fontname> -s | --show      show a css with a datauri font',
            ''
        ].join('\n');

    }

});