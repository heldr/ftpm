var should = require('should'),
    file = require('../../lib/utils/file.js');

describe('File utils', function() {

    describe('getRemoteContent()', function(){

        it('should force an error with a wrong url', function() {
            file.getRemoteContent('adshdhas', function( err ) {
                should.exist(err);
            });
        });


        describe('#with a successful request', function(){

            var content, response;

            before(function(done) {

                file.getRemoteContent('http://google.com', function( err, res, data ) {

                    if ( err ) {
                        done( err );
                    }
                    response = res;
                    content = data;
                    done();

                });

            });

            it('should have content', function() {
                content.should.not.be.empty;
            });

            it('should be html', function() {
                response.should.be.html;
            });

        });

    });

    describe('getRemoteFile()', function() {

        var response;

        before(function(done) {

            file.getRemoteFile('http://google.com', 'google.html', function( err, res ) {
                response = res;
                done();
            });

        });

        after(function(done) {
            file.unlink( response.output, done );
        });

        it('should return http status 200', function() {
            response.should.have.property('statusCode', 200);
        });

        it('should write a file', function(done) {
            file.readFile( response.output, function( err, content ) {
                should.not.exist(err);
                done();
            });
        });

        it('should have content in written file', function(done) {

            file.readFile( response.output, 'utf-8', function( err, content ) {

                var doctype = new RegExp('^\<\!doctype html\>');
                content.should.match(doctype);

                done();
            });

        });

    });

});