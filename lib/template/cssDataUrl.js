/*
 * ftpm - Font Package Manager
 * https://github.com/heldr/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var _ = require('lodash');

var template = [
    "@font-face {",
    "    font-family: '<%= name %>';",
    "    font-style: normal;",
    "    font-weight: normal;",
    "    src: url('data:application/x-font-woff;base64,<%= base64Code %>')",
    "    format('woff');",
    "}"
].join('\n');

module.exports = _.template(template);