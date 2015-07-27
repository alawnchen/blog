module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.initConfig({
	injector : {
	    bower : {
		options : {
		    starttag : '<!-- bower:{{ext}} -->',
		    endtag : '<!-- endbower -->',
		    min : true,
		    addRootSlash : false
		},
		files : {
		    'index.html' : [ 'bower.json' ],
		}
	    },
	    app : {
		options : {
		    addRootSlash : false,
		    relative : true
		},
		files : {
		    // the path to the yours files depend on your project structure
		    'index.html' : [ 'src/app/**/*.css', 'src/app/**/*.js' ],
		}
	    }
	}
    });

    grunt.registerTask('inject:bower:min:concat', function() {
	var path = require('path');
	var log = grunt.log.write;
	var basename = 'bower-deps', basedir = 'target';
	var dirs = {
	    css : path.join(basedir, 'css'),
	    js : path.join(basedir, 'js')
	};
	var files = {
	    config : {
		css : path.join(basedir, basename + '-css.txt'),
		js : path.join(basedir, basename + '-js.txt')
	    },
	    out : {
		css : path.join(basedir, basename + '.css'),
		js : path.join(basedir, basename + '.js')
	    }
	};

	var configFiles = {};
	configFiles[files.config.js] = [ 'bower.json' ];
	configFiles[files.config.css] = [ 'bower.json' ];

	// Write the bower dependencies resolved by the grunt-injector plugin to
	// a config file
	grunt.config.merge({
	    injector : {
		bower_all_config : {
		    options : {
			min : true, // inject min version when available
			addRootSlash : false,
			transform : function(filepath, index) {
			    return filepath;
			}
		    },
		    files : configFiles
		},
		// inject the concatened bower dependencies to index.html
		bower_all : {
		    options : {
			starttag : '<!-- bower:{{ext}} -->',
			endtag : '<!-- endbower -->',
			addRootSlash : false,
			relative : true
		    },
		    files : {
			'public/index.html' : [ 'public/lib/*.css', 'public/lib/*.js' ],
		    }
		}
	    }
	});

	// Copy the dependencies of the config file to directory conserving the
	// order resolved by the grunt-injector plugin
	grunt.registerTask('copy-bower-deps', 'Copy bower dependencies', function() {
	    var dest = null, ext = null, tokens = null, data = null;
	    for ( var ext in files.config) {
		data = grunt.file.read(files.config[ext]);
		tokens = data.split("\n");
		for (var i = 1; i < tokens.length - 2; i++) {
		    dest = path.join(dirs[ext], (('000' + i).substr(-3)) + '.' + ext);
		    grunt.file.copy(tokens[i], dest);
		}
	    }
	});

	// Concat all bower dependencies to a single file
	grunt.config.merge({
	    concat : {
		options : {
		    separator : ';\n',
		},
		bower_all_css : {
		    src : [ path.join(dirs.css, '*.css') ],
		    dest : files.out.css,
		},
		bower_all_js : {
		    src : [ path.join(dirs.js, '*.js') ],
		    dest : files.out.js,
		}
	    }
	});

	// Copy files to the application directory
	grunt.config.merge({
	    copy : {
		bower_all : {
		    files : [ {
			expand : true,
			src : [ files.out.css, files.out.js ],
			dest : 'public/lib',
			flatten : true,
			filter : 'isFile'
		    }, ],
		}
	    }
	});

	// create files to inject the bower dependencies resolved by the
	// grunt-injector plugin
	grunt.file.write(files.config.css, '<!-- injector:css --><!-- endinjector -->');
	grunt.file.write(files.config.js, '<!-- injector:js --><!-- endinjector -->');
	grunt.task.run('injector:bower_all_config');
	// Copy dependencies resolved by grunt-injector
	grunt.task.run('copy-bower-deps');
	// Concat bower dependencies into a single file
	grunt.task.run('concat:bower_all_css');
	grunt.task.run('concat:bower_all_js');
	// Copy the built file to the application directory
	grunt.task.run('copy:bower_all');
	// inject the concatened bower dependencies to the index.html
	grunt.task.run('injector:bower_all');
    });

    grunt.registerTask('build:prod', [ 'inject:bower:min:concat' ]);
};
