---
layout: post
title: Spring Batch, Filtering Records
tags : [Spring, Batch, Spring Batch]
---

This post is a simple illustration of the records filtering technique 
described in the [Spring Batch documentation](http://docs.spring.io/spring-batch/reference/htmlsingle/#filiteringRecords)

Let's say we want to make a batch that process the following flat file 
and write the name of the players with an average of points per game greater or equal to 13 in a file.

{% highlight text %}
{% include spring-batch/one-step/src/test/resources/filtering-lines.txt %}
{% endhighlight %}

After running the batch we should get the following result

	Tony Parker
	Nicolas Batum

The filtering mecanism is based on the <code>ItemProcessor</code>. 
If the outcome of the <code>ItemProcessor</code> is <code>null</code> then the item is 
filtered from the <code>ItemWriter</code> point of view. 

The following unit test class shows how everything fit together.

## <code>FilteringRecordsTest</code>

{% highlight java %}
{% include spring-batch/one-step/src/test/java/gnavarro77/blog/spring/batch/FilteringRecordsTest.java %}
{% endhighlight %}

## <code>filtering-records-job.xml</code>

{% highlight xml %}
{% include spring-batch/one-step/src/main/resources/jobs/filtering-records-job.xml %}
{% endhighlight %}

## <code>simple-job-launcher-context.xml</code>

{% highlight xml %}
{% include spring-batch/one-step/src/main/resources/simple-job-launcher-context.xml %}
{% endhighlight %}

## <code>FilteringLinesProcessor.java</code>

{% highlight java %}
{% include spring-batch/one-step/src/main/java/gnavarro77/blog/spring/batch/processor/FilteringLinesProcessor.java %}
{% endhighlight %}

## <code>StatisticBean.java</code>

{% highlight java %}
{% include spring-batch/one-step/src/main/java/gnavarro77/blog/spring/batch/bean/StatisticBean.java %}
{% endhighlight %}

## <code>filtering-lines.txt</code>

{% highlight text %}
{% include spring-batch/one-step/src/test/resources/filtering-lines.txt %}
{% endhighlight %}