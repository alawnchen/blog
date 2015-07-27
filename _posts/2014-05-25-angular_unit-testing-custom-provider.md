---
layout: post
title: AngularJS, Unit Testing Custom Provider
category : AngularJS
tags : [AngularJS, Unit test]
---

On one of my project i ran into the need of testing a custom provider and after a few online search i realized that it was not so trivial so i decided to share the solution i used in case it might help someone.

## Where it all started from!

I had a service that eventually was meant to send a request. I managed to stick a default URI for the service 
to call but i wanted the user to be able to change that URI if he wanted to do so.

I ended up with a provider that look something like that

{% highlight js  %}
myApp.provider('myService', function () {
   var uri = '/my/uri';
   
   this.setUri = function(val) {
      uri = val;
   };

   this.$get = function () {
      return {
         myMethod : function() {
            // do whatever i want with my uri variable
         }
      }
   };
});
{% endhighlight %}

## How it ended up!

To test the configuration capabilities of my provider, i ended up with the following kind of test

{% highlight js  %}
describe('myService', function() {
	var myService;
	
	// Load the module of the 'myService' service
	beforeEach(module('myModule'));
	
	beforeEach(inject(function(_myService_) {
		myService = _myService_;
	}));
	
	it('should...',function(){
		// Up here the uri value used is the default one
	})
});

describe('myService', function() {
	var myService;
	
	// Load the module of the 'myService' service and configure the 'myService' service
	beforeEach(module('myModule', function(myServiceProvider) {
       		myServiceProvider.setUri('/my/new/uri');
	}));
	
	beforeEach(inject(function(_myService_) {
		myService = _myService_;
	}));	

	it('should...',function(){
		// Up here the uri value used is the one defined throught the service provider
	})
	
});
{% endhighlight %}

This solution is not perfect as it represents code duplication but what i like is 
the clear separation between the default service behavior and the specialized one 
as the two are encapsulated in their own `describe` function.
