module.exports = function( grunt ) {

    grunt.initConfig({
        lint: {
            files: [
                'grunt.js',
                'ftpm.js',
                'lib/**/*.js'
            ]
        },
        jshint: {
            options: {
                es5: true,
                esnext: true,
                bitwise: true,
                curly: true,
                eqeqeq: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                regexp: true,
                undef: true,
                strict: false,
                trailing: true,
                smarttabs: true,
                node: true
            }
        }
    });

    grunt.registerTask( 'default', 'lint' );

};