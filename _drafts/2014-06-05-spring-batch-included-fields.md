---
layout: post
title: Spring Batch, Included Fields
tags : [Spring, Batch, Spring Batch, DelimitedLineTokenizer]
---

This post is a tip on the <code>DelimitedLineTokenizer</code> class. 

We want to go from a flat file line like this

	Tony Parker,2013-14,,,,,16.7,,,

to an instance of <code>StatisticBean</code>

{% highlight java %}
{% include spring-batch/one-step/src/main/java/gnavarro77/blog/spring/batch/bean/StatisticBean.java %}
{% endhighlight %}


To ignore the blank values we are going to specify the fields to include through the use 
of the <code>includedFields</code>  attribut of the <code>DelimitedLineTokenizer</code> class.

Below is a demonstration of the complete solution.

{% highlight java %}
{% include spring-batch/one-step/src/test/java/gnavarro77/blog/spring/batch/IncludeFieldsTest.java %}
{% endhighlight %}