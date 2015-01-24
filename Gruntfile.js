module.exports = function(grunt) {

    grunt.initConfig({
	sass : {
	    options : {

	    },
	    build : {
		files : {
		    'assets/theme/hellish-simplicity/style.css' : 'assets/theme/hellish-simplicity/style.scss'
		}
	    }
	},
	watch : {
	    files : [ 'assets/sass/*' ],
	    tasks : [ 'sass' ]
	},
	'gh-pages' : {
	    options : {
		base : '_site',
		message : 'Auto-generated commit',
		branch: 'master'
	    },
	    src : [ 'index.html', 'app/**', 'bower_components/**', 'partials/**', 'style/**' ]
	}
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-gh-pages');
};