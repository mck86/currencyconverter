var fs = require('fs'),
    ini = require('ini'),
    os = require("os");

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            src: 'src',
            dist: 'dist'
        },
        hostname: os.hostname() || 'localhost',

        htmlhint: {
            all: {
                options: {
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'attr-value-not-empty': false,
                    'attr-no-duplication': true,
                    'doctype-first': false,
                    'tag-pair': true,
                    'tag-self-close': false,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'src-not-empty': true
                },
                src: ['<%= project.src %>/**/*.html']
            }
        },

        jshint: {
            options: {
                'eqnull': true
            },
            all: {
                src: ['Gruntfile.js', '<%= project.src %>/app/**/*.js']
            }
        },

        clean: {
            index: ['<%= project.dist %>/index.html'],
            js: ['<%= project.dist %>/app/bundle.js'],
            html: ['<%= project.dist %>/app/**/*.html'],
            css: ['<%= project.dist %>/styles/**'],
            main: ['<%= project.dist %>/**'],
            assets: ['<%= project.dist %>/data/**', '<%= project.dist %>/fonts/**', '<%= project.dist %>/images/**']
        },

        concat: {
            main: {
                options: {
                    sourceMap: true
                },
                files: {
                    '<%= project.dist %>/app/bundle.js': [
                        '<%= project.src %>/app/**/*.js'
                    ]
                }
            }
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= project.src %>',
                    src: ['app/**/*.html'],
                    dest: '<%= project.dist %>'
                }]
            },
            assets: {
                files: [{
                    expand: true,
                    cwd: '<%= project.src %>',
                    src: ['data/**', 'fonts/**', 'images/**'],
                    dest: '<%= project.dist %>'
                }]
            },
            dependencies: {
                files: [{
                    expand: true,
                    cwd: 'bower_components',
                    src: ['**'],
                    dest: '<%= project.dist %>/vendors'
                }]
            }
        },

        less: {
            dist: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'main.css.map',
                    sourceMapFilename: '<%= project.dist %>/styles/main.css.map'
                },
                files: {
                    '<%= project.dist %>/styles/main.css': '<%= project.src %>/styles/main.less'
                }
            }
        },

        htmlbuild: {
            main: {
                src: '<%= project.src %>/index.html',
                dest: '<%= project.dist %>/index.html',
                options: {
                    beautify: true,
                    relative: true
                }
            }
        },

        connect: {
            options: {
                port: 3010,
                hostname: '*',
                livereload: 34749
            },
            livereload: {
                options: {
                    open: 'http://<%= hostname %>:<%= connect.options.port %>',
                    base: ['<%= project.dist %>']
                }
            }
        },

        watch: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            index: {
                files: ['<%= project.src %>/index.html'],
                tasks: ['htmlhint', 'clean:index', 'htmlbuild']
            },
            scripts: {
                files: ['<%= project.src %>/app/**/*.js'],
                tasks: ['jshint', 'clean:js', 'concat:main'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['<%= project.src %>/app/**/*.html'],
                tasks: ['htmlhint', 'clean:html', 'copy:html']
            },
            less: {
                files: ['<%= project.src %>/app/**/*.less', '<%= project.src %>/styles/**'],
                tasks: ['less']
            },
            assets: {
                files: ['<%= project.src %>/data/*', '<%= project.src %>/fonts/*', '<%= project.src %>/images/*'],
                tasks: ['clean:assets', 'copy:assets']
            }
        }
    });

    grunt.event.on('watch', function(action, filepath) {
        grunt.config('jshint.all.src', filepath);
    });

    grunt.registerTask('test', ['htmlhint', 'jshint']);
    grunt.registerTask('build', ['test', 'clean:main', 'concat:main', 'copy', 'less', 'htmlbuild:main']);
    grunt.registerTask('serve', ['build', 'connect:livereload', 'watch']);
};
