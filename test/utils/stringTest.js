var _ = require('underscore');

describe('String helpers' , function() {

    var fb;

    before(function(){
        _.extend( String.prototype , require('../../lib/utils/string.js') );
    });

    describe('toTitleCase()', function(){

        it('should convert only the fisrt letter to Uppercase', function(){
            fb = 'foo bar'.toTitleCase();
            fb.should.be.equal('Foo Bar');
        });

        it('should use the first character as uppercase', function(){
            fb = 'FOO BAR'.toTitleCase();
            fb.should.be.equal('Foo Bar');
        });

        it('should convert a single word', function(){
            fb = 'fooBAR'.toTitleCase();
            fb.should.be.equal('Foobar');
        });

    });

    describe('removeSpaces()' , function() {

        it('should clear all spaces from 2 words', function() {

            fb = 'Foo Bar'.removeSpaces();
            fb.should.be.equal('FooBar');

        });

        it('should clear all spaces from 3 or more words', function() {

            fb = 'Foo Bar Foo'.removeSpaces();
            fb.should.be.equal('FooBarFoo');

        });

    });

    describe('addPlusBetweenWords()' , function() {

        it('should clear all spaces from 2 words', function() {

            fb = 'Foo Bar'.addPlusBetweenWords();
            fb.should.be.equal('Foo+Bar');

        });

        it('should replace spaces at end', function() {

            fb = 'Foo Bar '.addPlusBetweenWords();
            fb.should.be.equal('Foo+Bar');
        });

        it('should replace spaces at beginning', function() {

            fb = ' Foo Bar'.addPlusBetweenWords();
            fb.should.be.equal('Foo+Bar');

        });


        it('should clear all spaces from 3 or more words', function() {

            fb = 'Foo Bar Foo'.addPlusBetweenWords();
            fb.should.be.equal('Foo+Bar+Foo');

        });

    });

});