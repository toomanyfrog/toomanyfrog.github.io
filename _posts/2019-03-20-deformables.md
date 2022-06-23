---
layout: post
title: notes on particle-based systems and deformables
tags: simulation, class-notes
---

Unified particle-based system: 
Smoke done by advecting tiny particles along velocities provided by unified particle system.
Seems like it is a lot of non-physically-based implementations, for example, rigidbody collisions don't work that way.
But it is convenient to have everything using the same system (maybe).

### Deformables
#### Position-based Dynamics (PBD) 

At first, Position-based Dynamics seems to be similar to Verlet integrator, which I have previously used for cloth simulation. However, the author highlights that where Verlet stores velocity implicitly with the previous and current position, PBD uses velocities explicitly.

<img src="https://i1.wp.com/yuiwei.com/wp-content/uploads/2019/04/pbd1.png?fit=764%2C677" alt="" class="wp-image-714"/><img src="https://i2.wp.com/yuiwei.com/wp-content/uploads/2019/04/pbd2.png?fit=764%2C642" alt="" class="wp-image-715"/>

Later, I realised that for PBD, we try to treat everything as a constraint, including forces (except general forces like gravity, see my annotation on algorithm. When we used position constraints in the cloth simulation, it seemed to automatically correct for any instabilities given by the numerical integration method. But actually when everything is made into a constraint, this seems to shift the problem from the integration step to the constraint solver. As a result, the stability of PBD no longer depends on time-step but on the shape of the constraint functions.

TODO: look more into XPBD. Updates soon.

#### Finite Element Method

<img src="https://i2.wp.com/yuiwei.com/wp-content/uploads/2019/04/fracture.png?fit=764%2C556" alt="" class="wp-image-712"/><img src="https://i2.wp.com/yuiwei.com/wp-content/uploads/2019/04/fracture2.png?fit=764%2C662" alt="" class="wp-image-713"/>

The paper "Breaking Things" video by O'Brien and Hodgins uses continuous model and finite elements made up of tetrahedrons. I was unclear on the meaning of the vector ***u*** in the equations as it does not correspond to vertex locations, instead it refers to the location of the element? Do we just take the center of the tetrahedron as ***u***? 
Additionally, they say that the rows of *β* are the coefficients of the shape functions, which I don't understand.

#### Projective Dynamics

For PBD the constraint solver which does most of the work does it in a "Gauss-Seidel-like fashion", which means solving each constraint individually independent of each other. When we project particles, the modifications are visible to the process, so the order of constraints is extremely important. For projective dynamics, constraints are taken from a local/global optimization perspective. The authors say that PBD converges to inelastic behaviour (I'm not sure why yet) and PD converges to the "true implicit Euler solution". 

TODO: Self-study on deformables (lit review)