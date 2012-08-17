FTPM - Font Package Manager [![Build Status](https://secure.travis-ci.org/heldr/ftpm.png)](http://travis-ci.org/heldr/ftpm)
===========================
Ftpm is a Font manager helper built on top of Google Web Fonts and Node.js. To install you should have NPM and run:
npm install -g ftpm with Root privileges.

HOW TO USE
--------------
FTPM allows you to manage system fonts (.ttf). You can also generate web font files(.woff), CSS from google and CSS with datauri code schema. Those helpers works perfect with Mac and Linux. (Windows maybe soon).

To install a system font:

```CLI
$ ftpm install magra

$ ftpm install "droid sans"
```

You can see all ftpm installed fonts just typing

```CLI
$ ftpm local
```

And uninstall it

```CLI
$ ftpm uninstall "droid sans"
```

If want to host a web font files (.woff) without need an Google request, just use:

```CLI
$ ftpm web magra

#with output path
$ fptm web magra public/font
```

You can generate the traditional Google web font CSS

```CLI
$ ftpm css magra

#with output path
$ fptm css magra public/css
```

Some folks prefer to use datauri encoding schema to avoid file request, ftpm gives you a simple way to do it

```CLI
$ ftpm datauri magra

#with output path
$ fptm datauri magra public/css
```

If you have a single css file for everything, ftpm has options that show css font code

```CLI
$ ftpm css magra -s #you can use --show

$ fptm datauri magra -s #Be sure to have enough scrollback on your terminal :)
```