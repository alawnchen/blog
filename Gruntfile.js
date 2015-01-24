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
	    files : [ 'assets/theme/hellish-simplicity/*.scss' ],
	    tasks : [ 'sass' ]
	},
	buildcontrol : {
	    options : {
		dir : '_site',
		commit : true,
		push : true,
		message : 'auto commit'
	    },
	    blog : {
		options : {
		    remote : 'https://github.com/gnavarro77/gnavarro77.github.com.git',
		    branch : 'master'
		}
	    }
	}
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-build-control');

    grunt.registerTask('deploy', [ 'buildcontrol' ]);
};