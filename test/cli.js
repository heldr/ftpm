var should = require('should'),
    fs = require('fs'),
    pathHelper = require('../lib/utils/path'),
    child = require('child_process'),
    execute = child.exec,
    wrench = require('wrench'),
    cli = './bin/ftpm ';

describe('FTPM Client', function() {

    describe('Help description', function() {

        var expected;

        before(function(){

            expected = new RegExp('Examples:');

        });

        it('should run only typing ftpm on terminal', function(done) {

            execute( cli , function( err, stdout ) {

                should.not.exist(err);
                stdout.should.not.be.empty;
                stdout.should.match( expected );

                done();

            });

        });

        it('should run typing ftpm -h on terminal', function(done) {

            execute( cli + '-h' , function( err, stdout ) {

                should.not.exist(err);
                stdout.should.not.be.empty;
                stdout.should.match( expected );

                done();

            });

        });

    });

    describe('Os Font' , function() {

        it('should install', function(done) {

            execute( cli + 'install magra' , function( err, stdout ) {

                should.not.exist(err);
                stdout.should.not.be.empty;
                stdout.should.match( /(installed)/gi );

                done();

            });

        });

        it('should install a font file on the right directory', function(done) {

            fs.readFile( pathHelper.getFontPath( process.platform ) + 'Magra.ftpm.ttf' , 'binary', function( err , content ) {

                should.not.exist(err);
                content.should.not.be.empty;

                done();

            });

        });

        it('should list all installed fonts' , function(done) {

            execute( cli + 'local' , function( err, stdout ) {

                should.not.exist(err);
                stdout.should.not.be.empty;
                stdout.should.match( /(magra)/gi );

                done();

            });

        });

        it('should force uninstall' , function(done) {

            execute( cli + 'uninstall magra -f' , function( err, stdout ) {

                should.not.exist(err);
                stdout.should.not.be.empty;

                done();

            });

        });

        it('should not exist an uninstalled font', function(done) {

            fs.readFile( pathHelper.getFontPath( process.platform ) + 'Magra.ftpm.ttf' , 'binary', function( err , content ) {

                should.exist(err);

                done();

            });

        });

    });

    describe('Web font',function() {

        describe('with output path', function() {

            var fontPath = '_ftCliTest',
                fontFile = 'Magra.woff';

            after(function(done) {
                wrench.rmdirRecursive( fontPath , done );
            });

            it('should download', function(done) {

                execute( cli + 'web magra ' + fontPath , function( err, stdout ) {

                    should.not.exist(err);
                    stdout.should.not.be.empty;

                    done();

                });

            });

            it('should download a woff file', function(done){

                fs.readFile( fontPath + '/' + fontFile , 'binary', function( err , content ) {

                    should.not.exist(err);
                    content.should.not.be.empty;

                    done();

                });

            });

            it('should download a eot file', function(done){

                fs.readFile( fontPath + '/' + fontFile.replace( /\.woff$/g , '.eot' ) , 'binary', function( err , content ) {

                    should.not.exist(err);
                    content.should.not.be.empty;

                    done();

                });

            });

            it('should be created a css file', function(done) {

                fs.readFile( fontPath + '/' + fontFile.replace( /\.woff$/g , '.css' ) , 'utf8', function( err , content ) {

                    should.not.exist(err);
                    content.should.not.be.empty;
                    content.should.match(/^\@font\-face/g);

                    done();

                });

            });

            it('should be created a svg file', function(done) {

                fs.readFile( fontPath + '/' + fontFile.replace( /\.woff$/g , '.svg' ) , 'utf8', function( err , content ) {

                    should.not.exist(err);
                    content.should.not.be.empty;
                    content.should.match(/^\<\?xml/g);

                    done();

                });

            });

        });

        describe('without path', function() {

            var fontFile = 'Magra.woff';

            after(function(done) {
                fs.unlinkSync( 'Magra.ttf' );
                fs.unlinkSync( 'Magra.eot' );
                fs.unlinkSync( 'Magra.svg' );
                fs.unlinkSync( 'Magra.css' );
                fs.unlink( 'Magra.woff' , done );
            });

            it('should download', function(done) {

                execute( cli + 'web magra' , function( err, stdout ) {

                    should.not.exist(err);
                    stdout.should.not.be.empty;

                    done();

                });

            });

            it('should download a woff file', function(done){

                fs.readFile( fontFile , 'binary', function( err , content ) {

                    should.not.exist(err);
                    content.should.not.be.empty;

                    done();

                });

            });

            it('should download a eot file', function(done){

                fs.readFile( fontFile.replace( /\.woff$/g , '.eot' ) , 'binary', function( err , content ) {

                    should.not.exist(err);
                    content.should.not.be.empty;

                    done();

                });

            });

            it('should be created a css file', function(done) {

                fs.readFile( fontFile.replace( /\.woff$/g , '.css' ) , 'utf8', function( err , content ) {

                    should.not.exist(err);
                    content.should.not.be.empty;
                    content.should.match(/^\@font\-face/g);

                    done();

                });

            });

            it('should be created a svg file', function(done) {

                fs.readFile( fontFile.replace( /\.woff$/g , '.svg' ) , 'utf8', function( err , content ) {

                    should.not.exist(err);
                    content.should.not.be.empty;
                    content.should.match(/^\<\?xml/g);

                    done();

                });

            });

        });


    });

    describe('CSS font', function() {

        var cssPath = '_cssCliTest',
            cssFile = 'Magra.css';

        describe('get',function() {

            describe('css with font link',function() {

                describe('with output path', function() {

                    after(function(done) {
                        wrench.rmdirRecursive( cssPath , done );
                    });

                    it('should download', function(done) {

                        execute( cli + 'css magra ' + cssPath , function( err, stdout ) {

                            should.not.exist(err);
                            stdout.should.not.be.empty;

                            done();

                        });

                    });

                    it('should exist the downloaded file', function(done){

                        fs.readFile( cssPath + '/' + cssFile , 'utf-8', function( err , style ) {

                            should.not.exist(err);
                            style.should.match(/^\@font\-face/g);
                            style.should.match(/(http\:\/\/)/g);

                            done();

                        });

                    });

                });

                describe('without path', function() {

                    after(function(done) {
                        fs.unlink( cssFile , done );
                    });

                    it('should download', function(done) {

                        execute( cli + 'css magra' , function( err, stdout ) {

                            should.not.exist(err);
                            stdout.should.not.be.empty;

                            done();

                        });

                    });

                    it('should exist the downloaded file', function(done){

                        fs.readFile( cssFile , 'utf-8', function( err , style ) {

                            should.not.exist(err);
                            style.should.match(/^\@font\-face/g);
                            style.should.match(/(http\:\/\/)/g);

                            done();

                        });

                    });

                });

            });

            describe('css with data url',function() {

                describe('with output path', function() {

                    after(function(done) {
                        wrench.rmdirRecursive( cssPath , done );
                    });

                    it('should download', function(done) {

                        execute( cli + 'datauri magra ' + cssPath , function( err, stdout ) {

                            should.not.exist(err);
                            stdout.should.not.be.empty;

                            done();

                        });

                    });

                    it('should exist the downloaded file', function(done){

                        fs.readFile( cssPath + '/' + cssFile , 'utf-8', function( err , style ) {

                            should.not.exist(err);
                            style.should.match(/^\@font\-face/g);
                            style.should.match(/(data\:application\/x\-font\-woff\;base64\,d09)/g);
                            style.should.match(/(format\(\'woff\'\))/g);

                            done();

                        });

                    });

                });

                describe('without path', function() {

                    after(function(done) {
                        fs.unlink( cssFile , done );
                    });

                    it('should download', function(done) {

                        execute( cli + 'datauri magra' , function( err, stdout ) {

                            should.not.exist(err);
                            stdout.should.not.be.empty;

                            done();

                        });

                    });

                    it('should exist the downloaded file', function(done){

                        fs.readFile( cssFile , 'utf-8', function( err , style ) {

                            should.not.exist(err);
                            style.should.match(/^\@font\-face/g);
                            style.should.match(/(data\:application\/x\-font\-woff\;base64\,d09)/g);
                            style.should.match(/(format\(\'woff\'\))/g);

                            done();

                        });

                    });

                });

            });

        });

        describe('show',function(){

            describe('with param -s', function() {

                it('should show css with link', function(done) {

                    execute( cli + 'css magra -s' , function( err, stdout ) {

                        should.not.exist(err);
                        stdout.should.match(/(\@font\-face)/g);
                        stdout.should.match(/(http\:\/\/)/g);

                        done();
                    });

                });

                it('should show css with data url', function(done) {

                    execute( cli + 'datauri magra -s' , function( err, stdout ) {

                        should.not.exist(err);
                        stdout.should.match(/(\@font\-face)/g);
                        stdout.should.match(/(data\:application\/x\-font\-woff\;base64\,d09)/g);
                        stdout.should.match(/(format\(\'woff\'\))/g);

                        done();
                    });

                });

            });

            describe('with param --show', function() {

                it('should show css with link', function(done) {

                    execute( cli + 'css magra --show' , function( err, stdout ) {

                        should.not.exist(err);
                        stdout.should.match(/(\@font\-face)/g);
                        stdout.should.match(/(http\:\/\/)/g);

                        done();
                    });

                });

                it('should show css with data url', function(done) {

                    execute( cli + 'datauri magra --show' , function( err, stdout ) {

                        should.not.exist(err);
                        stdout.should.match(/(\@font\-face)/g);
                        stdout.should.match(/(data\:application\/x\-font\-woff\;base64\,d09)/g);
                        stdout.should.match(/(format\(\'woff\'\))/g);

                        done();
                    });

                });

            });

        });

    });

});