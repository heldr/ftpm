var should = require('should'),
    CssFont = require('../../lib/driver/cssfont.js'),
    fs = require('fs');

describe('CssFont object', function() {

    describe('download css', function() {

        describe('with output path', function() {

            var fontPath = '_cssFT_tmp',
                fontName = 'magra',
                fullPath;


            describe('with a single word for Font name', function() {

                after( function(done) {
                    fs.rmdir( fontPath , done );
                });

                describe('css with font link',function() {

                    it('should download', function(done) {

                        CssFont.downloadCSS( fontName , fontPath , function( err , output ) {
                            should.not.exist(err);

                            var rgp = new RegExp(fontPath);
                            output.should.match(rgp);
                            output.should.match(/\.css$/);

                            fullPath = output;
                            done();
                        });

                    });

                    it('should be a valid css file with font url', function(done) {

                        fs.readFile( fullPath , 'utf-8', function( err, style ) {

                            should.not.exist(err);
                            style.should.match(/^\@font\-face/g);
                            style.should.match(/(http\:\/\/)/g);

                            fs.unlink( fullPath , done );
                        });

                    });

                });

                describe('css with font data url',function() {

                    it('should download', function(done) {

                        CssFont.downloadDataUrl( fontName, fontPath , function( err , output ) {
                            should.not.exist(err);

                            var rgp = new RegExp(fontPath);
                            output.should.match(rgp);
                            output.should.match(/\.css$/);

                            fullPath = output;
                            done();
                        });

                    });

                    it('should be a valid css file with font data url', function(done) {

                        fs.readFile( fullPath , 'utf-8', function( err, style ) {
                            should.not.exist(err);
                            style.should.match(/^\@font\-face/g);
                            style.should.match(/(data\:application\/x\-font\-woff\;base64\,d09)/g);
                            style.should.match(/(format\(\'woff\'\))/g);

                            fs.unlink( fullPath , done );
                        });

                    });

                });

            });

            describe('with multiple words for Font name', function() {

                before(function(){
                    fontName = 'droid sans';
                });

                after( function(done) {
                    fs.rmdir( fontPath , done );
                });

                describe('css with font link',function() {

                    it('should download', function(done) {

                        CssFont.downloadCSS( fontName , fontPath , function( err , output ) {
                            should.not.exist(err);

                            var rgp = new RegExp(fontPath);
                            output.should.match(rgp);
                            output.should.match(/\.css$/);

                            fullPath = output;
                            done();
                        });

                    });

                    it('should be a valid css file with font url', function(done) {

                        fs.readFile( fullPath , 'utf-8', function( err, style ) {

                            should.not.exist(err);
                            style.should.match(/^\@font\-face/g);
                            style.should.match(/(http\:\/\/)/g);

                            fs.unlink( fullPath , done );
                        });

                    });

                });

                describe('css with font data url',function() {

                    it('should download', function(done) {

                        CssFont.downloadDataUrl( fontName, fontPath , function( err , output ) {
                            should.not.exist(err);

                            var rgp = new RegExp(fontPath);
                            output.should.match(rgp);
                            output.should.match(/\.css$/);

                            fullPath = output;
                            done();
                        });

                    });

                    it('should be a valid css file with font data url', function(done) {

                        fs.readFile( fullPath , 'utf-8', function( err, style ) {
                            should.not.exist(err);
                            style.should.match(/^\@font\-face/g);
                            style.should.match(/(data\:application\/x\-font\-woff\;base64\,d09)/g);
                            style.should.match(/(format\(\'woff\'\))/g);

                            fs.unlink( fullPath , done );
                        });

                    });

                });

            });

        });

        describe('without output path', function() {

            var fontName = 'magra',
                fullPath;

            describe('with a single word for Font name', function() {

                describe('css with font link',function() {

                    it('should download', function(done) {

                        CssFont.downloadCSS( fontName , false , function( err , output ) {

                            should.not.exist(err);
                            output.should.match(/\.css$/);

                            fullPath = output;
                            done();
                        });

                    });

                    it('should be a valid css file with font url', function(done) {

                        fs.readFile( fullPath , 'utf-8', function( err, style ) {

                            should.not.exist(err);
                            style.should.match(/^\@font\-face/g);
                            style.should.match(/(http\:\/\/)/g);

                            fs.unlink( fullPath , done );
                        });

                    });

                });

                describe('css with font data url', function() {

                    it('should download', function(done) {

                        CssFont.downloadDataUrl( fontName, false , function( err , output ) {
                            should.not.exist(err);

                            output.should.match(/\.css$/);

                            fullPath = output;
                            done();
                        });

                    });

                    it('should be a valid css file with font data url', function(done) {

                        fs.readFile( fullPath , 'utf-8', function( err, style ) {
                            should.not.exist(err);
                            style.should.match(/^\@font\-face/g);
                            style.should.match(/(data\:application\/x\-font\-woff\;base64\,d09)/g);
                            style.should.match(/(format\(\'woff\'\))/g);

                            fs.unlink( fullPath , done );
                        });

                    });

                });

            });

            describe('with multiple words for Font name', function() {

                before(function(){
                    fontName = 'droid sans';
                });

                describe('css with font link',function() {

                    it('should download', function(done) {

                        CssFont.downloadCSS( fontName , false , function( err , output ) {

                            should.not.exist(err);
                            output.should.match(/\.css$/);

                            fullPath = output;
                            done();
                        });

                    });

                    it('should be a valid css file with font url', function(done) {

                        fs.readFile( fullPath , 'utf-8', function( err, style ) {

                            should.not.exist(err);
                            style.should.match(/^\@font\-face/g);
                            style.should.match(/(http\:\/\/)/g);

                            fs.unlink( fullPath , done );
                        });

                    });

                });

                describe('css with font data url', function() {

                    it('should download', function(done) {

                        CssFont.downloadDataUrl( fontName, false , function( err , output ) {
                            should.not.exist(err);

                            output.should.match(/\.css$/);

                            fullPath = output;
                            done();
                        });

                    });

                    it('should be a valid css file with font data url', function(done) {

                        fs.readFile( fullPath , 'utf-8', function( err, style ) {
                            should.not.exist(err);
                            style.should.match(/^\@font\-face/g);
                            style.should.match(/(data\:application\/x\-font\-woff\;base64\,d09)/g);
                            style.should.match(/(format\(\'woff\'\))/g);

                            fs.unlink( fullPath , done );
                        });

                    });

                });

            });

        });

    });

    describe('show css', function() {

        var fontName = 'magra',
        //avoid console.log to be shown on spec
            disableConsole = function(){
                console._log = console.log;
                console.log = function(){
                    return;
                };
            },
            enableConsole = function(){
                console.log = console._log;
            };

        describe('with a single word for Font name', function() {

            it('should show css with font link', function(done) {

                disableConsole();

                CssFont.show( fontName , function( err , style ) {
                    enableConsole();

                    should.not.exist(err);
                    should.not.exist(err);
                    style.should.match(/(\@font\-face)/g);
                    style.should.match(/(http\:\/\/)/g);

                    done();
                });

            });

            it('should show css with font data url', function(done) {

                disableConsole();

                CssFont.showDataUrl( fontName , function( err , style ) {
                    enableConsole();

                    should.not.exist(err);
                    style.should.match(/(\@font\-face)/g);
                    style.should.match(/(data\:application\/x\-font\-woff\;base64\,d09)/g);
                    style.should.match(/(format\(\'woff\'\))/g);

                    done();
                });

            });

        });

        describe('with a single word for Font name', function() {

            before(function(){
                fontName = 'droid sans';
            });

            it('should show css with font link', function(done) {

                disableConsole();

                CssFont.show( fontName , function( err , style ) {
                    enableConsole();

                    should.not.exist(err);
                    should.not.exist(err);
                    style.should.match(/(\@font\-face)/g);
                    style.should.match(/(http\:\/\/)/g);

                    done();
                });

            });

            it('should show css with font data url', function(done) {

                disableConsole();

                CssFont.showDataUrl( fontName , function( err , style ) {
                    enableConsole();

                    should.not.exist(err);
                    style.should.match(/(\@font\-face)/g);
                    style.should.match(/(data\:application\/x\-font\-woff\;base64\,d09)/g);
                    style.should.match(/(format\(\'woff\'\))/g);

                    done();
                });

            });

        });


    });

});