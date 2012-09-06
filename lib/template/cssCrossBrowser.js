/*
 * FTPM - Font Package Manager
 * http://heldr.github.com/ftpm
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/ftpm/master/MIT-LICENSE.txt
 */

'use strict';

var _ = require('underscore');

var template = [
    "@font-face {",
    "    font-family: '<%= name %>';",
    "    src: url('<%= name %>.eot');",
    "    src: url('<%= name %>.eot?iefix') format('eot'),",
    "         url('<%= name %>.woff') format('woff'),",
    "         url('<%= name %>.ttf') format('truetype'),",
    "         url('<%= name %>.svg#<%= name %>') format('svg');",
    "    font-style: normal;",
    "    font-weight: normal;",
    "}"
].join('\n');

module.exports = _.template(template);