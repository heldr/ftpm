/*
 * ftpm - Font Package Manager
 * https://github.com/heldr/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var ftpm = {

    platform: process.platform,

    help: function() {

        return [
            ' FTPM - Font Package Manager',
            '',
            '   # OS',
            '   ftpm install %fontname%                  install a system font',
            '   ftpm uninstall %fontname%                uninstall a system font',
            '   ftpm local                               list all ftpm installed fonts',
            '',
            '   # Webfile',
            '   ftpm web %fontname%                      download a web font file (".woff")',
            '   ftpm web %fontname% public/font          download a web font file (".woff") with output path',
            '',
            '   # CSS',
            '   ftpm css %fontname% public/font          download a css with a remote font path',
            '   ftpm datauri %fontname% public/font      download a css with a datauri font',
            '',
            '   # SHOW CSS CONTENT',
            '   ftpm css %fontname% -s | --show          show a css with a remote font path',
            '   ftpm datauri %fontname% -s | --show      show a css with a datauri font',
            ''
        ].join('\n');

    }

};

module.exports = ftpm;