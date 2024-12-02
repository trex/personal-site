---
title: Fireworkin' It
description: A dancefloor controller provides input to visualization software, displayed by a rear-lit projector.
year: 2018
medium: Interactive custom software & hardware, video projector
image: /art/fireworkin-it-dancing-3.gif
imageAlt: Kiddo Dancing on Interactive Dancefloor
tags:
  - "art"
  - "technology"
---

# Fireworkin' It
###### October 19, 2018
---

[Fireworkin' It Demo Video](/art/fireworkin-it.mp4)

## Project Description
![Kiddo Dancing on Interactive Dancefloor](/art/fireworkin-it-dancing-3.gif)
My family engages in a nightly dance party, and it was only a matter of time before we turned our 550 sq ft home into da clurb.

This project served as a proof of concept for me in the practices of both building large-scale physical input controllers and producing visual output.

I created a dance floor controller with several pressure sensors running the width of the floor.  As you move, visualizations project onto a screen tracing your movements across the floor.

## Hardware
![Dancefloor Controller](/art/fireworkin-it-controller.jpg)
The dance floor controller is made of linoleum, aluminum stripping, duct-tape, speaker wire, electrical tape, and aluminum foil.  The dance floor wires into a Makey Makey which acts like a keyboard that can be plugged into any computer.  This enables the mapping of different subsections of the dance floor to unique keyboard input keys on a computer.  The Makey Makey plugs into a Raspberry Pi computer to provide input for software programs.  Visual output from the computer is sent to a projector that back lights a projection screen to avoid shadows cast from the dancer.

## Software
![Processing3 Visualization](/art/fireworkin-it-particles.gif)
The visualization software for this project was written in Processing 3.  The nice thing about this project is the controller can be leveraged as input for infinite software applications, and I have plans to write additional visualizations for the dance floor.

[Check out the project source code on GitHub!](https://github.com/trex/ParticleSteps)