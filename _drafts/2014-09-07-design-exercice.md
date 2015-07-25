---
layout: post
title: Design exercice
tags : [conception, design]
---

## Exercice

We have a table with two columns. The first one is used to pick up the background color of the second. 
To do that we will use `JQuery`.

<table class="table table-bordered table-striped">
	<thead>
		<tr>
			<th>Pick a color</th>
			<th>Change the input background</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<select class="form-control">
				  <option></option>
				  <option>CadetBlue</option>
				  <option>DarkSlateBlue</option>
				  <option>Indigo</option>
				  <option>Lavender</option>
				  <option>LightSteelBlue</option>
				</select>
			</td>
			<td>
				<input type="text" class="form-control" />
			</td>
		</tr>
		<tr>
			<td>
				<select class="form-control">
				  <option></option>
				  <option>CadetBlue</option>
				  <option>DarkSlateBlue</option>
				  <option>Indigo</option>
				  <option>Lavender</option>
				  <option>LightSteelBlue</option>
				</select>
			</td>
			<td>
				<input type="text" class="form-control" />
			</td>
		</tr>
		<tr>
			<td>
				<select class="form-control">
				  <option></option>
				  <option>CadetBlue</option>
				  <option>DarkSlateBlue</option>
				  <option>Indigo</option>
				  <option>Lavender</option>
				  <option>LightSteelBlue</option>
				</select>
			</td>
			<td>
				<input type="text" class="form-control" />
			</td>
		</tr>
	</tbody>
</table>

## Implementation


<div class="row">
<div class="col-md-12">
{% highlight js  %}
<script>
// Run the code after document is loaded
$( document ).ready(function() {
	// Object handling communication between the differents elements. (see mediator design pattern) 
	var mediator = {
		targets : $('table td:nth-child(2) input'), // Elements of the second column
		setBackgroundColor : function(index, color){
			$(this.targets[index]).css("background-color", color);
		}
	};
	// Bind change event to the elements of the first column
	$('table tr td:nth-child(1) select').each(function(index){
		// Note that we pass the index value to the function called on the 'change' event
		$(this).bind('change', { index : index}, function(event){
			mediator.setBackgroundColor(event.data.index, $(this).val());
		});
	});
});	
</script>
{% endhighlight %}
</div>
<div class="col-md-4">
</div>
</div>


<script>
// Run the code after document is loaded
$( document ).ready(function() {
	// Object handling communication between the differents elements. (see mediator design pattern) 
	var mediator = {
		targets : $('table td:nth-child(2) input'), // Elements of the second column
		setBackgroundColor : function(index, color){
			$(this.targets[index]).css("background-color", color);
		}
	};
	// Bind change event to the elements of the first column
	$('table tr td:nth-child(1) select').each(function(index){
		// Note that we pass the index value to the function called on the 'change' event
		$(this).bind('change', { index : index}, function(event){
			mediator.setBackgroundColor(event.data.index, $(this).val());
		});
	});
});	
</script>