---
title: "Animate an overlay"
---

Animations let an overlay react to the game instead of staying on screen unchanged. Use opacity tracks to fade it, transform tracks to move it, or a trigger to play a transition.

Open the Animation Composer to preview the animation and test its triggers. Start with a short fade on one component so you can see what fires and when.

Tile modes decide how often a component appears: per actor, per player, per user, or once as a singleton. Choose that before fine-tuning the animation; otherwise a component can appear more times than you intended.

The preview helps with timing. Check the OBS source too, especially when the animation reads actor values or depends on a companion's events.
