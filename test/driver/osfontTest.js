var should = require('should'),
    events = require('events'),
    _      = require('lodash'),
    OsFont = require('../../lib/driver/osfont.js'),
    fs     = require('fs');

// mock stdin of process 'https://github.com/visionmedia/commander.js/blob/master/test/test.prompt.js'
    var _stdin = new events.EventEmitter();
    _.extend( _stdin , process.stdin );
    _stdin.setEncoding = _stdin.resume = function() {};
    _stdin.write = function(data) { _stdin.emit('data', data); };

    process.__defineGetter__('stdin', function() { return _stdin });

    //mock stdout of process
    var _stdout = new events.EventEmitter();
    _.extend( _stdout , process.stdout );
    _stdout.write = function(data) { this.emit('data', data) };
    // //var realOut = process.stdout;
    //process.__defineGetter__('stdout', function() { return _stdout });
// mock

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

            process.stdout.write('Y');

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