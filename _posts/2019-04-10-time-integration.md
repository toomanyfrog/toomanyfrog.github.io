---
layout: post
title: notes on energy drift in time integrators
tags: simulation, class-notes
---

## Final Project Idea

Energy drift - usually damping - is substantial for numerical integration schemes that are not [symplectic](https://en.wikipedia.org/wiki/Symplectic_integrator), such as the [Runge-Kutta](https://en.wikipedia.org/wiki/Runge-Kutta) family.

<img src="http://yuiwei.com/wp-content/uploads/2019/03/Screenshot-2019-03-06-at-12.05.00-PM-1024x619.png" alt="" class="wp-image-394"/>

<img src="http://yuiwei.com/wp-content/uploads/2019/03/Screenshot-2019-03-06-at-12.05.18-PM-1024x628.png" alt="" class="wp-image-395"/>

<img src="http://yuiwei.com/wp-content/uploads/2019/03/Screenshot-2019-03-06-at-12.05.45-PM-1024x542.png" alt="" class="wp-image-396"/>

<img src="http://yuiwei.com/wp-content/uploads/2019/03/Screenshot-2019-03-06-at-12.05.53-PM-1024x597.png" alt="" class="wp-image-397"/>

<img src="http://yuiwei.com/wp-content/uploads/2019/03/Screenshot-2019-03-06-at-12.06.07-PM-1024x634.png" alt="" class="wp-image-398"/>

<img src="http://yuiwei.com/wp-content/uploads/2019/03/Screenshot-2019-03-06-at-12.06.13-PM-1024x642.png" alt="" class="wp-image-399"/>

Symplectic integrators usually used in molecular dynamics, such as the [Verlet integrator](https://en.wikipedia.org/wiki/Verlet_integration) family, exhibit increases in energy over very long time scales, though the error remains roughly constant. These integrators do not in fact reproduce the [Hamiltonian mechanics](https://en.wikipedia.org/wiki/Hamiltonian_mechanics) of the system; instead, they reproduce a closely related "shadow" Hamiltonian whose value they conserve many orders of magnitude more closely. 

https://www.youtube.com/watch?v=VyaJVuRaW9E
<img src="http://www.reactiongifs.com/r/bth.gif" alt=""/>

## Paper Presentation - FEPR

This week we have paper presentations and I talk about this paper to the class, Fast Energy Projection for Real-time Simulation of Deformable Objects by Dinev, Liu et. al. Reference links are at the bottom.

<div class="message">
### Disclaimer
Tiantian Liu made a much better video explaining the paper. You can find that in the references as well. My presentation is very much tailored to the class and what we know collectively, which is not that much.
</div>

<video controls src="http://yuiwei.com/wp-content/uploads/2019/04/my-fepr-presentation.mp4"></video><

The link to the slides is http://bit.ly/yuifepr


#### References
- [FEPR: Fast Energy Projection for Real-time Simulation of Deformable Objects](https://www.cs.utah.edu/~ladislav/dinev18FEPR/dinev18FEPR.html)
- [Superior video by Liu explaining the method they used](https://www.youtube.com/watch?v=xyB-VlesB-M)
- [Erin Catto's slides with the mass-spring phase portrait](http://box2d.org/files/GDC2015/ErinCatto_NumericalMethods.pdf)
- [Position-based Dynamics](http://matthias-mueller-fischer.ch/publications/posBasedDyn.pdf)
- [Projective Dynamics](https://www.cs.utah.edu/~ladislav/bouaziz14projective/bouaziz14projective.pdf)
- [Fast Projection (Goldenthal et al)](http://www.cs.columbia.edu/cg/pdfs/131-ESIC.pdf)
- [Selector Matrices](https://stanford.edu/class/ee103/lectures/matrix_examples_slides.pdf)

## Final Project Presentation

<iframe src="https://drive.google.com/file/d/1sxFrRZN9afnka3dR_s0ui9CiJLRZiG28/preview" width="1080" height="800"></iframe>