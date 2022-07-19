---
layout: post
title: ue4 lighting learning notes
tags: class-notes
---
hi! its been maybe a couple years. i've been stagnating. i know. but i'm not anymore and that's what matters. recently i am learning lighting for games/real-time in ue4 (but maybe also 5?) and i thought i would just post my learning notes here as i go.

## week 01: exterior environment part 1

#### i'll come back to this learning list later, for sure...
[ ] How to think about lighting for games, from a practical production POV.
[ ] Considering player pathing, and mood.
[ ] Gathering reference.
[ ] Setting up the sun direction, color, and intensity.
[ ] Setting up the sky light. (IBL)
[ ] Setting up the sky dome.
[ ] Setting up simple reflections.
[ ] Setting up a lightmass importance volume.
[ ] Baking a GI solution.
[ ] Understanding the bake
[ ] Runtime vs Pre-Computed
[ ] Direct vs Indirect Lighting


![](/_media/_images/2022.07.17-14.55.14_ue4_week1_castle_warm.png)
![](/_media/_images/2022.07.17-14.56.30_ue4_week1_castle_warm.png)
![](/_media/_images/2022-07-17-ue4_week1_castle_warm3.png)
for the first scene - i focused on the outdoor lighting using only the skybox and directional light. so i didn't capture the interior since it is all very dark. and thought about the player's path into the castle. the geometry on the castle exterior didn't lend itself to visually lead the player to the castle, so i chose a low sun that would encourage the player to walk forward even with nothing else that was visually interesting. 

![](/_media/_images/2022.07.17-21.46.51_ue4_week1_castle_cold.png)
![](/_media/_images/2022.07.17-21.47.55_ue4_week1_castle_cold.png)
![](/_media/_images/2022.07.17-22.01.28_ue4_week1_castle_cold.png)
for the second scene, i wanted to play up the ice vs fire theme with a cold sky light. i chose a low contrast sky texture. and i started to experiment with some of the lights that weren't covered, like area and point lights. but i think there is some foundational knowledge that i need to clarify. like which lights contribute to the bake, or which are static and which are dynamic? i wanted the cold light to stream in from that gap in the castle rocks to visually divide the space but was unable to achieve the effect i wanted with just local lights (i.e. not a full-on directional light, which i don't want to use because that's needed for the exterior environment). as you can see in img #6 the strip of light extending past the hard shadow-line from the directional light is very weak in comparison. i also tried to experiment with some volumetric fog but i couldn't get it the way i wanted. particles would have helped but i want to see how much we can accomplish with just the basic blocks. 

![](/_media/_images/2022.07.17-problems.png)
i attached some screenshots of issues that i ran into. mainly my doubts are which lights are influencing the bake, and which objects get to have baked lights (i found that objects which are controlled dynamically can not have baked light textures, which i guess makes sense lol). i also ran into a weird thing with the second scene where i have a ghost light falling onto a wall in the pretty dark/enclosed room.. i was using local lights to enhance it/give the illusion of the exterior directional light doing all the work, but couldn't find the culprit of that one.. 

lastly, i have some technical or workflow questions (which are maybe better asked in the q&a? i will ask them if we have time. but also post it here in case you could answer them!):
* is there a performance impact by making the skybox material rotatable + real-time capture on the sky light? since omar did not do that in the demo and just offset the hdri in photoshop.
* when looking out for things like contrast and exposure, should we try to achieve that with just lights before turning to post-processing? i understand adding every new light leads to a significant render cost. what's a good rule of thumb for this? 