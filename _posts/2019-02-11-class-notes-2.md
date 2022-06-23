---
layout: post
title: week 4-5
tags: simulation, class-notes
---


### Motion Editing

We looked at PRECISION which can figure out what motions go with new geometry. I feel like this tool makes it much easier for large quantities of content in games and animations; however, it didn't seem like the artists had much control over how animations might look. There were also issues with transitioning between fixed motion captured animations.

### Skinning
Linear Blend Skinning is intuitive but the candy-wrapper problem is well known. Dual quaternion skinning I feel is a really smart way of using mathematical properties of quaternions to avoid the candy wrapper effect. But to be honest, skinning of organic bodies to skeletons has a lot of variations that can't be described just by one algorithm. I guess that's why there are still so many artists working to do weight-painting all the time. 

On the note of artist input, we looked at [this](https://graphics.ethz.ch/publications/papers/paperOzt13.php) paper for using line-of-action concept to generate 3D poses. Although this seemed like a very time-efficient method, the poses generated still needed to be tweaked by artists a fair bit, so I think the added value is not that much. 

On the topic of weight painting, we also looked at [this](http://motionlab.kaist.ac.kr/wp-content/uploads/2018/09/SplineSkinning_TOG_CameraReady.pdf) paper on spline-based weight painting. This concept was really exciting to me as an artist who has always found Maya's weight painting tools to feel very clumsy. Especially because it is hard to tell when your weight painting is blended properly:
<img src="http://www.3dfiggins.com/writeups/paintingWeights/contents/fig24_knuckle_smoothed.jpg" alt=""/>
Picture taken from <a href="http://www.3dfiggins.com/writeups/paintingWeights/">this really good resource</a> for learning how difficult and complex the weight-painting process is!

Using splines to determine the falloff or interpolation of weights seems very elegant. Although I have yet to try using a system like that. 

Using cages to warp the mesh seemed like a really intuitive idea as well. We see cage methods all the time in 2D animation software. I'm pretty sure <a href="https://www.live2d.com/en/about/whats_live2d">Live2D </a>is using a cage deformation method, and it has some really beautiful results. I'm really curious why we don't see cage methods in 3D more often. It seems really convenient, there are different methods for applying the cage transform to the cuboid or tetrahedron that can be used for artist control. Perhaps it is more difficult to determine what happens at the joints.

We also looked at implicit functions for mesh wrapping. Seems like we use a bounding mesh as a "cage", and the bounding mesh can be represented by an implicit function. This method seems like it will not be able to take care of sharp details that well. I also want to read more on implicit functions for meshes as the meta-balls or blobbys idea is unfamiliar to me.
