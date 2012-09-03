module.exports = function( grunt ) {

    grunt.initConfig({

        lint: {
            files: [
                'grunt.js',
                'ftpm.js',
                'lib/**/*.js'
            ]
        },

        mocha: {
            all: {
                src: 'test/**/*.js',
                options: {
                    globals: ['should'],
                    timeout: 10000,
                    ignoreLeaks: false,
                    ui: 'bdd',
                    reporter: 'spec'
                }
            }
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
                node: true,
                globalstrict: true
            }
        }

    });

    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask( 'default', 'lint mocha' );

};