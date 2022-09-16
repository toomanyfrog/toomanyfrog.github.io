---
layout: post
title: ue4 lighting learning notes
tags: class-notes
---

when to use reflection probes - rule of thumb:
areas of contrast, going from dark to light


feedback:

1. orange/teal

- could use more god rays/volumetric fog, opening is very bright
- water could use a bit more work in terms of lighting in the bottom right, looks lackluster. add caustic maybe lighting, or textures or glowiness.

- lumen would give the bounce lights thats not present in the scene or fake with the point light
- get rid of some rocks to make the water play a bigger part
- maybe remove the ceiling because the concept art is an open sky. that would help with the darkness/occlusion that makes it clearly a cave
- directional/foggy color where the light hits. decrease the intensity of the directional and create the point lights to show the bounce light coming out from the water
- achieve final result before optimization to figure which ones are necessary



2. purple/yellow

- open the ceiling to let the sky impact the interior, especially since the concept has a very blue sky
- angle is different, can see the depth and horizon. therefore lacks the blue color of the faraway fog
- use color grading in postprocessing to achieve the vibrancy of orange leaves
- try to focus on the color palette instead of the ratio of the colors and depth/distance of the scene
- add some water as well 



3. sketches

- pink: occlusion from the ceiling is making things a lot darker plus the materials (marble vs rock)
- blue: getting somewhere interesting, increase the ambient with the sky light, feels like an open space and not a cave. 
- sword: lacks bounce light from the sunlight, but has potential

CAREER STUFF

technical lighting artist - close to engineer, script stuff and code stuff, not just lighting
bridge between rendering engineer and artist
rarely see junior technical lighting artist, usually its a senior job or someone with a lot of experience from a different job
technical artist is different from lighting artist- usually take care of scripting for physics, rigging, complex shaders like water or clouds, 
stuff that requires coding. same for technical lighting artists. need to know how to code. 
entry artist usually paired with senior. technical lighting artist - sometimes complex setups for specific cases/procedural lighting stuff. procedural lighting - games that are very big - each area has some lighting that is procedural because impossible to hand-place those presets. or setting up editor settings and presets, which parameters to expose to artists etc