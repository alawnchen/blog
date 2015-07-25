---
layout: post
title: Spring Batch, Step One
categorie: Spring Batch
tags : [Spring, Batch, Spring Batch]
---

In this post we are going to make a simple but very common type of batch.

{% include spring-batch/tony-parker-context.md %}

For **each line** we want to update for the **player** and the **season** the 
average number of points per game (the last field).


## Let's get started!

#### Naming

First we need to find a name to our job; As the aim is to update the player's average 
number of points per game on a season, let's go for <code>AveragePointsPerGameUpdateJob</code>.
 
#### Unit Test Class

We then create the unit test class <code>AveragePointsPerGameUpdateJobTest</code> 

{% highlight java %}
{% include spring-batch/one-step/src/test/java/gnavarro77/blog/spring/batch/step/one/AveragePointsPerGameUpdateJobTest.java %}
{% endhighlight %}

--------

{% highlight java %}
{% include spring-batch/one-step/src/main/java/gnavarro77/blog/spring/batch/bean/StatisticBean.java %}
{% endhighlight %}


### Maven
We add a property :

{% highlight xml %}
	<spring-batch.version>3.0.0.RELEASE</spring-batch.version>
{% endhighlight %}

and then a dependency :

{% highlight xml %}
	<dependency>
	<groupId>org.springframework.batch</groupId>
	<artifactId>spring-batch-core</artifactId>
	<version>${spring-batch.version}</version>
</dependency>
{% endhighlight %}
	
### Test

We create a Unit Test Class `SimpleBatchTest`.

Mind to add `junit:junit:4.x` and `org.springframework:spring-test:2.5` to your maven dependencies.



