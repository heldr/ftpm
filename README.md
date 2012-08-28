FTPM - Font Package Manager [![Build Status](https://secure.travis-ci.org/heldr/ftpm.png)](http://travis-ci.org/heldr/ftpm)
===========================
FTPM is a Font helper built on top of [Google Web Fonts][gwebfonts] and [Node.js][nodejs]. To install FTPM, just run:

`npm install -g ftpm` with Root privileges.

HOW TO USE
----------
FTPM allows you to manage system fonts (.ttf). You can also generate web font files(.woff), CSS from google and CSS with datauri code schema.

### System font (for Mac and Linux ... Windows maybe soon)

FTPM would install a True Type font into your User font path

```CLI
$ ftpm install magra

$ ftpm install "droid sans"
```

You can see all FTPM installed fonts just typing

```CLI
$ ftpm local
```

And uninstall it

```CLI
$ ftpm uninstall "droid sans"
```

### Web font file

If want to host a web font files (.woff) without need an Google request, just use:

```CLI
$ ftpm web magra
```
with output path
```CLI
$ fptm web magra public/font
```

### CSS @font-face file

You can generate the traditional Google web font CSS

```CLI
$ ftpm css magra

$ ftpm css "quantico:700italic"

$ ftpm css "quantico:400,400italic,700italic"
```
with output path
```CLI
$ fptm css magra public/css
```

### CSS with datauri schema

Some folks prefer to use datauri encoding schema to avoid file request, FTPM gives you a simple way to do it

```CLI
$ ftpm datauri magra
```
with output path
```CLI
$ fptm datauri magra public/css
```

### Printing CSS @font-face

If you have a single css file for everything, FTPM has options that show css font code

```CLI
$ ftpm css magra -s #you can use --show

$ fptm datauri magra -s #once you have enough scrollback on your terminal :)
```

DEVELOPING
----------
FTPM uses [Grunt][grunt] with JSHint and [Mocha Test Framework][mocha].

Into FTPM base files directory you should run:

```CLI
$ npm install
$ make
```

You can run separated tasks

```CLI
$ make lint
$ make test
```

Note: Pull requests are only accepted on development branch

## License

MIT License
(c) [Helder Santana](http://heldr.com)

[nodejs]: http://nodejs.org/download
[gwebfonts]: http://www.google.com/webfonts/
[grunt]: https://github.com/cowboy/grunt
[mocha]: http://visionmedia.github.com/mocha/