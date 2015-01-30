module.exports = function(grunt) {

    grunt.initConfig({
	sass : {
	    options : {

	    },
	    build : {
		files : {
		    'assets/theme/hellish-simplicity/style.css' : 'assets/theme/hellish-simplicity/style.scss',
		    'assets/css/blog.css' : 'assets/sass/blog.css'
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
	},
	clean : {
	    deploy : {
		src : [ '_site/.git' ]
	    }
	}
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-build-control');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('deploy', [ 'clean:deploy', 'buildcontrol' ]);
};