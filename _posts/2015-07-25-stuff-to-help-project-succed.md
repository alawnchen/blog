---
layout: post
title: Stuff that should help make a project successful
category : Agility
tags : [project management, agility, continous delivery]
---

Of course there is no recipe to make a project successful. But I believe continuous delivery is a great key to success and should be considered at a project early stage.

### Continuous delivery

Continuous delivery is a practice meant to reduce to the minimum the time between the moment a line of code is written and the moment that line of code is available to the user. It also implies a notion of automation in the way the artifact is delivered. 

The concept sound reasonable but why should that be so important in regard of the project success?

### What benefit should I expect?

To me the most important benefit of such an approach is to keep the user/product owner/client as close to the project as possible.

- user/product owner/client has an open view on the project progress, reassuring him and making him more willing to get involved in the project
- user/product owner/client can validate that a functionnality fit his need on a early stage letting opportunities for changes/modifications

Another benefit is to detect bugs related to the production platform that would have gone unnoticed by the unit tests.

Last but not least it avoid stressful late night unchecked production delivery.

### What does it cost me?

Things would have been too sweet if no cost was involved. This approach implies :

- to manage different environments (dev, integration, production) at an early stage
- to run and configure the different environments
- to run the platform automating the deliveries
- to establish rollback mechanisms in case of corrupted deliveries

This list is not exhautive.

### Were do we go from here?

The burden seems heavy compared to the benefits! That means I missed my point. To me the benefits overcomes the costs by far. Agility highlights iterative and incremental approaches, continuous delivery is no different. Start with what brings the most benefits at the lower costs and build upon it.

> In software, if something is painful, do it more often. 

  

