---
layout: post
title: Front side environment management example
category : AngularJS
tags : [Grunt, AngularJS, environment management]
---

In this post we are going to consider a front side application built using `AngularJS`, `Grunt`, `Bower` as part of its technical stack.

For the purpose of this example we will only consider `development` and `production` environments. 

### Why the `dev` and the `production` environments should differ?

In development stage, we need the changes made to `html` markup or the `javascript` code to be made available to the browser as quick as possible. In most cases loading time of a the initial page is not a big concern. Moreover the `javascript` code must support debbuging.

In production, the main concern is to make the ui as \'quick\' as possible; The time needed to display a fragment of the ui must be reduce to the minimum. Some of the most common means to meet those goals are : 

- minifying and compressing `css` files
- minifying and compressing `javascript` files
- for `AngularJS`, minifying, combining, and automatically caching your HTML

You can also consider using `javascript` optimizer tools such as [google closure](https://developers.google.com/closure).

### Example

In `dev` we will inject the `bower` dependencies and the application resources in two different locations of the `index.html` using the `Grunt` plugin `grunt-injector`.

First we had the placeholders required for injection in the `index.html`.

{% highlight html %}
<html>
<head>
<!-- bower:css -->
// bower css dependencies
<!-- endbower -->


<!-- injector:css -->
// application specific css injection
<!-- endinjector -->
</head>
<body>

<!-- bower:js -->
// bower js dependencies
<!-- endbower -->

<!-- injector:css -->
// application js injection
<!-- endinjector -->
</body>
</head>
{% endhighlight %}

then we declare the injection into the `Gruntfile.js` (customize to match your project structure).

{% highlight js %}
injector : {
	// inject bower css and js dependencies into the file index.html
    bower : {
		options : {
		    starttag : '<!-- bower:{{ext}} -->',
		    endtag : '<!-- endbower -->',
		    addRootSlash : false // depends on your project
		},
		files : {
		    'index.html' : [ 'bower.json' ],
		}
    },
    // 
    app : {
		options : {
		    addRootSlash : false, // depends on your project
		    relative : true // depends on your project
		},
		files : {
		    'index.html' : [ 'ordered application js files', 'another file', '...' ],
		}
    }
}
{% endhighlight %}

and with the following registered `Grunt` task 

{% highlight js %}
grunt.registerTask('build:dev', [ 'injector:bower', 'injector:app' ]);
{% endhighlight %}

calling `grunt build:dev` will inject all the css and js files into the file `index.html`.

---

For production we want to have the bower dependencies minified and concatened into a single file. In this example I decided to use the minified version published within the bower dependency package (note that none might exists and the unminified version will be used in that case).
As the order in which files are concatened is imperative I use a trick and use the dependency resolution of `grunt-injector` to have the files in the right order.

The grunt task to create and inject a minified and concatened version of the bower dependencies into the `index.html` file do the following steps :

- create two files to write the dependencies, one for the `js` dependencies and the other for the `css` dependencies
- inject the dependencies into those files
- copy the dependencies keeping the order
- concatenate the files
- copy the concatened files into the source code of the application
- inject the concatened files into the `index.html` file


{% highlight js %}
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
		    // paths are up to your project structure
			'index.html' : [ 'app/lib/*.css', 'app/lib/*.js' ],
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
			dest : 'app/lib', // path is up to your project structure
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
    
{% endhighlight %}



---

In this example we just handle the bower dependencies. We still have to take care of the code of the application. This might be the subject of a future post.

---

[download `Gruntfile.js`](/assets/resources/front-side-environment-management-example/Gruntfile.js)



 

