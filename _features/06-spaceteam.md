---
layout: feature
key: spaceteam
title:  "Spaceteam Penny Arcade"
img-fmt: jpg
---
For "Elecanisms" – an advanced mechatronics course – my team of five designed and built a penny arcade-style game cabinet inspired by the smartphone game [Spaceteam](https://spaceteam.ca). Our cabinet design included

- 3 player stations
- 12 dynamic LCD character displays
- Over 30 diverse actuators (buttons, switches, dials, etc.)
- An addressable RGB LED strip to display the players' progress: a blue starship chased by a growing red wall of fire

We implemented all the game logic and peripheral interfaces in embedded C code that ran on four 16-bit [PIC microcontrollers](https://en.wikipedia.org/wiki/PIC_microcontroller) (PICs). One PIC held all game state and ran the game loop, and the other three each managed one of the three player stations. I designed a simple protocol (over [SPI](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface)) that allowed the central PIC to send commands to the outer PICs (messages to display on the LCDs) and receive state from the outer PICs (which buttons have been pressed).

