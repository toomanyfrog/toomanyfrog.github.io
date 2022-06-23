---
layout: post
title: week 1-5
tags: simulation, class-notes
---


## Week 1: Techniques for creating animation
2D animators make use of keyframes to get poses before doing in-betweens. In 3D, keyframes can be set and automatically tweened. In 2D animation, they often make use of 2s due to not doing all in between frames for 24 fps. In the recent Spiderman animated movie, it was interesting to see that they sometimes used 2s in 3D by stepping the animation curves between keyframes as a stylistic choice. 


Procedural animation has some really cool applications - automatic skinning and animation has been used in games like Spore, where players can make their own creatures. Procedural generation of variants in animation can also help generate some natural look to character's scripted animation. 

## Week 2-4: Inverse Kinematics

In Week 2, we visited Motion Capture lab in CMU. As I've never been in a motion capture lab before, this experience was really enlightening for me. They use infrared cameras and plastic balls wrapped in reflective tape to capture positional data. There were different sized reflective balls for different types of data. For facial capture, the motion capture lab assistant has to reconfigure and calibrate all the infrared cameras. I've not used any motion capture system calibration and capture software before, but I think it might be similar to camera calibration systems in computer vision for 3D reconstruction, which I am somewhat more familiar with.

### Inverse Kinematics Methods

We talked about Jacobian transpose, pseudo-inverse and damped least squares method. We have to implement an inverse kinematics solution for Miniproject 1. Previously I have implemented CCD and I remember it was pretty fast. I seem to have lost my implementation to poor organisation in my filesystem but I did find my pseudo-inverse implementation! Which is much slower!

<video controls src="http://yuiwei.com/wp-content/uploads/2019/03/ikfkccd.mp4"></video>

Anyway, I can't remember most of my implementation so I'm looking forward to doing it again. It will be a good chance to revise what I learned. We also looked at more heuristic methods, like CCD. I have heard of FABRIK before, but not from class. Mostly from videos on the internet. But learning about it in class, it seemed really intuitive and to have really nice results. I might try my hand at implementing it somewhere.