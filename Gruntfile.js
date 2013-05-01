module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            build: {
                src: [
                'public/js/modules/*.js'
                ],
                dest: 'public/js/app.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */\n'
            },
            build: {
                src: [
                'public/js/modules/*.js'
                ],
                dest: 'public/js/app.min.js'
            }
        },
        jshint : {            
            files: {
                "camelcase": true,
                "curly": true,
                "eqeqeq": true,
                "indent": 4,
                "latedef": false,
                "strict": true,
                "undef": false,
                "globals": {
                "jQuery": true
                },
                src: ['sites/all/themes/tradecraft/js/modules/*.js']
            }
        },
        watch: {
            js: {
                files: ['public/js/modules/*.js'],
                tasks: ['concat', 'jshint']
            }
        }
    });
    
    // NPM tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Grunt tasks
    grunt.registerTask('default', ['uglify', 'concat', 'jshint']);

};