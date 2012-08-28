var should = require('should'),
    WebFont = require('../../lib/driver/webfont.js'),
    fs = require('fs');

describe('WebFont object', function() {

    describe('running with output path', function() {

        var fontPath = '_webFT_tmp',
            fontName = 'magra',
            fullPath;

        describe('with a single word for Font name', function() {

            after( function(done) {
                fs.unlink( fullPath , function() {
                    fs.rmdir( fontPath , done );
                });
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

        describe('with multiple words for Font name', function() {

            before(function(){
                fontName = 'droid sans';
            });

            after( function(done) {
                fs.unlink( fullPath , function() {
                    fs.rmdir( fontPath , done );
                });
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