var should = require('should')
    OSpath = require('../../lib/utils/path.js'),
    fs = require('fs'),
    path = require('path');


describe('OS Path',function() {

    var fontPath;

    describe('getFontPath()' ,function(){

        it('should be a valid MacOS font path',function() {

            fontPath = OSpath.getFontPath('darwin');
            fontPath.should.be.equal(process.env.HOME + '/Library/Fonts/');

        });

        it('should be a valid Linux font path',function() {

            fontPath = OSpath.getFontPath('linux');
            fontPath.should.be.equal(process.env.HOME + '/.fonts/');

        });

    });

    describe('checkFontPath()', function() {

        it('should create a font path even if it does not exist', function(done){

            var fakePath = '/tmp/_getFontPath/';

            OSpath.checkFontPath( fakePath , function() {

                //for node 0.6
                var existsHelper = fs.exists || path.exists;

                existsHelper( fakePath , function(exists) {

                    exists.should.be.true;
                    fs.rmdirSync(fakePath);

                    done();
                });

            });

        });

        it('should return the same directory', function(done){

            var fakePath = '';

            OSpath.checkFontPath( fakePath , function(path) {

                path.should.equal(fakePath);
                path.should.be.empty;

                done();

            });

        });

    });

});