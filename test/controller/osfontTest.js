var should = require('should'),
    OsFont = require('../../lib/controller/osfont.js'),
    fs = require('fs');

describe('OSFont Object', function(){

    describe('with a single word for Font name', function() {

        var fontName = 'magra', path;

        it('should install', function(done) {

            OsFont.install( fontName , function( err, dir ) {

                should.not.exist(err);
                path = dir;

                done();
            });

        });

        it('font should be in the right path', function(done) {

            fs.readFile( path , function(err) {

                should.not.exist(err);
                done();

            });

        });

        it('should list all installed font', function(done) {

            OsFont.local( '', function( err , fonts ) {

                should.not.exist(err);
                fonts.should.be.a('string');
                fonts.should.not.be.empty;

                done();

            });

        });

        it('should uninstall a font', function(done) {

            OsFont.uninstall( fontName , function( err, fonts ) {

                should.not.exist(err);

                fs.readFile( path , function(err) {

                    should.exist(err);
                    done();

                });

            });

        });

    });

    describe('with multiple words for Font name', function() {

        var fontName = 'droid sans', path;

        it('should install', function(done) {

            OsFont.install( fontName , function( err, dir ) {

                should.not.exist(err);
                path = dir;

                done();
            });

        });

        it('font should be in the right path', function(done) {

            fs.readFile( path , function(err) {

                should.not.exist(err);
                done();

            });

        });

        it('should list all installed font', function(done) {

            OsFont.local( '', function( err , fonts ) {

                should.not.exist(err);
                fonts.should.be.a('string');
                fonts.should.not.be.empty;

                done();

            });

        });

        it('should uninstall a font', function(done) {

            OsFont.uninstall( fontName , function( err, fonts ) {

                should.not.exist(err);

                fs.readFile( path , function(err) {

                    should.exist(err);
                    done();

                });

            });

        });

    });

});