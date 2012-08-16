var gprovider = require('../../lib/provider/google.js');

describe('Google font provider', function() {

    var fontData,
        fontName = 'Magra',
        urlPattern = new RegExp('^http\:\/\/themes\.googleusercontent\.com\/static\/fonts\/' + fontName.toLocaleLowerCase());

    describe('#TrueType', function() {

        before( function(done) {
            fontData = new gprovider( fontName, done );
        });

        describe('getFontStyle()', function() {

            var style;

            before(function(){
                style = fontData.getFontStyle();
            });

            it('should return style content', function(){
                style.should.not.be.empty;
            });

            it('should start with css at-rule font-face', function() {
                style.should.match(/^\@font\-face/g);
            });

            it('should have TrueType path', function() {
                style.should.match(/\.ttf/g);
            });

        });

        describe('getFontFileUrl()', function() {

            var fontUrl;

            before(function(){
                fontUrl = fontData.getFontFileUrl();
            });

            it('should not be empty', function(){
                fontUrl.should.not.be.empty;
            });

            it('should return the right uri pattern', function() {
                fontUrl.should.match(urlPattern);
            });

            it('should finishes with TrueType extension', function() {
                fontUrl.should.match(/\.ttf$/);
            });

        });
    });

    describe('#Web Open Font', function(){
        before( function(done) {
            fontData = new gprovider( fontName, done, true );
        });

        describe('getFontStyle()', function() {

            var style;

            before(function(){
                style = fontData.getFontStyle();
            });

            it('should return style content', function(){
                style.should.not.be.empty;
            });

            it('should start with css at-rule font-face', function() {
                style.should.match(/^\@font\-face/g);
            });

            it('should be Web Open Font path', function() {
                style.should.match(/\.woff/g);
            });

        });

        describe('getFontFileUrl()', function() {

            var fontUrl;

            before(function(){
                fontUrl = fontData.getFontFileUrl();
            });

            it('should not be empty', function(){
                fontUrl.should.not.be.empty;
            });

            it('should return the right uri pattern', function() {
                fontUrl.should.match(urlPattern);
            });

            it('should finishes with Web Open Font extension', function() {
                fontUrl.should.match(/\.woff$/);
            });

        });
    });

});