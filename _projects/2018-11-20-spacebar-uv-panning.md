---
layout: post
title: Soda gun stream effect and UV panner
description: Created soda gun stream and simple UV panner
image: assets/images/bvw/spacebar/scripting/tentacless.png
tags: shader unity tech-art
---

To accomplish the effect of a soda gun, I wrote a shader to animate the texture on liquid flow with UV panning. It was also used as a projection on the bar walls.

The soda gun stream was done by rigging a subdivided cylinder with 50 joints and applying it along a 3 point parabolic LineRenderer component.  

The UV panning is shown as normal on the bar walls, and in the video on the right you can see how the soda gun finally looked like.
<video width="45%" height="100%" controls>
  <source src="/assets/images/bvw/spacebar/SPACEBAR.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video><video width="50%" height="100%" controls>
  <source src="/assets/images/bvw/spacebar/soda-bartender-view.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
