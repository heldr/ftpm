var should = require('should'),
    WebFont = require('../../lib/driver/webfont.js'),
    fs = require('fs'),
    wrench = require('wrench');

describe('WebFont object', function() {

    describe('running with output path', function() {

        var fontPath = '_webFT_tmp',
            fontName = 'magra',
            fullPath;

        describe('with a single word for Font name', function() {

            after( function(done) {
                wrench.rmdirRecursive( fontPath , done );
            });

            it('should download a web font', function(done) {

                WebFont.download( fontName , fontPath , function( err , output ) {
                    should.not.exist(err);

                    var rgp = new RegExp(fontPath);
                    output.should.match(rgp);
                    output.should.match(/\.woff$/);

                    fullPath = output;
                    done();
                });

            });

            it('should read the downloaded web font file', function(done) {

                fs.readFile( fullPath , function(err) {
                    should.not.exist(err);
                    done();
                });

            });

            // it('should download crossbrowser fonts #crossbrowser', function(done) {

            //     WebFont.downloadCrossBrowser( fontName , fontPath , function( err , output ) {
            //         should.not.exist(err);

            //         var rgp = new RegExp(fontPath);
            //         output.should.match(rgp);
            //         output.should.match(/\.ttf$/);

            //         fullPath = output;
            //         done();
            //     });

            // });

            // it('should read the the files css, eot, woff, svg and ttf #crossbrowser', function(done) {

            //     fs.readdir( fontPath , function( err , files ) {
            //         should.not.exist(err);

            //         files.should.not.be.empty;

            //         var filesStr = files.join('');
            //         filesStr.should.match(/\.ttf/);
            //         filesStr.should.match(/\.eot/);
            //         filesStr.should.match(/\.woff/);
            //         filesStr.should.match(/\.svg/);
            //         filesStr.should.match(/\.css/);

            //         done();

            //     });

            // });

        });

        describe('with multiple words for Font name', function() {

            before(function(){
                fontName = 'droid sans';
            });

            after( function(done) {
                wrench.rmdirRecursive( fontPath , done );
            });

            it('should download a web font', function(done) {

                WebFont.download( fontName , fontPath , function( err , output ) {
                    should.not.exist(err);

                    var rgp = new RegExp(fontPath);
                    output.should.match(rgp);
                    output.should.match(/\.woff$/);

                    fullPath = output;
                    done();
                });

            });

            it('should read the font file', function(done) {

                fs.readFile( fullPath , function(err) {
                    should.not.exist(err);
                    done();
                });

            });

        });

    });

    describe('running without output path', function() {

        var fontName = 'magra',
            fullPath;


        describe('with a single word for Font name', function() {

            after( function(done) {
                fs.unlink( fullPath , done );
            });

            it('should download a web font', function(done) {

                WebFont.download( fontName , false , function( err , output ) {
                    should.not.exist(err);

                    output.should.match(/\.woff$/);

                    fullPath = output;
                    done();
                });

            });

            it('should read the font file', function(done) {

                fs.readFile( fullPath , function(err) {
                    should.not.exist(err);
                    done();
                });

            });

        });

        describe('with multiple words for Font name', function() {

            before(function(){
                fontName = 'droid sans';
            });

            after( function(done) {
                fs.unlink( fullPath , done );
            });

            it('should download a web font', function(done) {

                WebFont.download( fontName , false , function( err , output ) {
                    should.not.exist(err);

                    output.should.match(/\.woff$/);

                    fullPath = output;
                    done();
                });

            });

            it('should read the font file', function(done) {

                fs.readFile( fullPath , function(err) {
                    should.not.exist(err);
                    done();
                });

            });

        });

    });

});