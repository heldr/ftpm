var should = require('should'),
    file = require('../../lib/utils/file.js'),
    converter = require('../../lib/utils/converter.js'),
    gprovider = require('../../lib/provider/google.js'),
    fontName = 'Magra',
    font = {
        ttf: fontName + '.ttf',
        svg: fontName + '.svg',
        eot: fontName + '.eot',
        woff: fontName + '.woff'
    };

describe('Font converter', function() {

    before( function(done) {
        var fontData = new gprovider( fontName , function() {

            file.getRemoteFile( fontData.getFontFileUrl() , font.ttf , done );

        });
    });

    after( function(done) {
        file.unlink( font.ttf , done );
    });

    describe('should convert ttf to svg', function() {

        after(function(done) {
            file.unlink( font.svg , done );
        });

        it('should run the svg converter', function(done) {
            converter.ttf2svg( font.ttf , done );
        });

        it('should exist the svg file', function(done) {
            file.readFile( font.svg , done );
        });

    });

    describe('should convert ttf to woff', function() {

        after(function(done) {
            file.unlink( font.woff , done );
        });

        it('should run the woff converter', function(done) {
            converter.ttf2woff( font.ttf , done );
        });

        it('should exist the woff file', function(done) {
            file.readFile( font.woff , done );
        });

    });


    describe('should convert ttf to eot', function() {

        after(function(done) {
            file.unlink( font.eot , done );
        });

        it('should run the eot converter', function(done) {
            converter.ttf2eot( font.ttf , done );
        });

        it('should exist the eot file', function(done) {
            file.readFile( font.eot , done );
        });

    });

});