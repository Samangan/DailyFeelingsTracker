module.exports = function(grunt) {
    grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'),
        
        //Lint the src and tests
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                trailing: true,
                globals: {
                    jQuery: true
                },
            },
            files : { 
                src:  ['src/**/*.js', 'test/**/*.js'],
            }
        },

        nodeunit: {
            all: ['test/**/*_test.js']
        }
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('default', ['jshint']);
};