---
layout: project
title: Home Transit Display
type: physical
status: ongoing
order: 1
key_photo: 1
n_photos: 4
captions: [
  'Transit Times',
  'Weather',
  'Flight Mode',
  'Commute Mode'
]
---

I programmed an eInk display to show when the next trains and buses are coming to the stops nearest me. Now I know whether to leave now or wait for the next train, whether I have time to grab a coffee on my way to work, whether the C train is horribly delayed after the next one and so I'd better not miss it, etc.

This display (which now lives next to my front door) is so useful that I was using it to time my commute from the moment it started displaying train times, while it was still sitting on my desk.

Over time I've added features like weather conditions and rain indicators, "commute mode" (activates on weekday mornings and shows the next train to work in a large font so I can read it from across the room), and "flight mode" (which shows various ways to get to JFK with live estimates of how long each will take).

Here's everything you need to make your own:
- [Display](https://www.amazon.com/dp/B0FX4PDW6M?lv=shuf&channelId=500&plpRedirect=mhFallback&th=1) on Amazon
- [Code](https://github.com/EvanDorsky/eink-transit-time) for the display
- [CAD](https://cad.onshape.com/documents/5a4dbc5b318ef2c36681ee57/w/e1c9ec511495c1722780b4bb/e/c849fad6e9a9a2983be2a4af) for the display case

The code includes hooks for receiving weather reports and alerts from Home Assistant over MQTT, but the display will run just fine as a standalone device too.

### Background

The C train is one of the [least reliable](https://howbadisthetrain.com/line/c) train lines in New York, and it runs every 10-15 minutes on a good day. I only live a 2 minute walk from the nearest station, so I'd rather leave the house about 5 minutes before the next train, but I don't want to pull out my phone and open an app just to see when I should leave.

I also wanted something that would fade into the background when I didn't need it, so I chose eInk over the [bright and colorful LED signs](https://www.nytransitmuseumstore.com/small-led-countdown-clock.html) that are on the market.

### Workflow

I wrote all the code for this project with Claude. I maintain a persistent Claude Code agent on the Raspberry Pi that runs my Home Assistant instance. This agent maintains the repo for the eInk display and OTA flashes the changes straight to the display. Ever since moving to this workflow, the display has never been bricked by a bad OTA. And I've specified all the followup features (weather display, commute mode, flight mode) with fairly vague natural language instructions.

This was my first experience vibing an embedded device and I'm totally blown away by Claude's performance. For a project like this (no safety or real-time considerations, no certifications, low cost hardware, no power consumption or compute constraints - and honestly, this describes a lot of embedded projects), I see no need to read or write the code myself ever again.

There is something lost from this way of working. I don't take as much pride in this project as I would have if I'd written the code myself. But the project got done *much* faster this way, which means I got to experience the joy of *having the thing* much sooner. And I got to spend my free time designing a nice case (AI didn't do that, though maybe it could now) instead of writing code. For me, for now, I'm okay with this trade.

<!-- ### what this is -->
<!-- - eink display that shows train times -->
<!-- - also shows the weather -->
<!-- - commute mode -->
<!-- - airport mode -->

<!-- ### why i did this -->
<!-- - rely on the C train and buses which are not super reliable -->
<!-- - want something hands free for the mornings, not my phone -->
<!-- - wanted something that could just be up all the time and blend in (so eink, not LEDs) -->
<!-- - existing stuff is [out of stock](https://www.nytransitmuseumstore.com/small-led-countdown-clock.html) and [too expensive](https://transitgifts.com/products/mta-subway-rail-arrival-sign) -->

<!-- ### workflow -->
<!-- - I had claude make an image previewer so that I could see how things would look without having to wait for the code to flash -->
<!-- - made sure to set up ota so i can flash this while it's on the wall -->
<!-- - I have a persistent agent that I can chat with to change this however I want -->
<!---->
<!-- ### digression -->
<!-- - you can make your hardware do anything you can think of, instantly and for free -->
<!-- - knowing how to make yourself more productive matters more than ever, because claude won't always suggest these things -->
<!--   - making an image preview to speed things up -->
<!--   - knowing that OTA updates are possible -->

<!-- This is the kind of project that I used to take pride in. And I would derive joy from the flow state that I'd enter while making it. But now that agents can write all the code (and set up the test harness, and flash the firmware), there's no flow state, and no pride. -->
<!---->
<!-- I do, however, get to enjoy the working thing much more quickly (time to first prototype was ~15 minutes), and I get to bring it to a level of polish that I never would have bothered with before. -->
<!---->
<!-- Since having this thing on my wall actually improves my quality of life a lot, I'm willing to trade away the pride and joy. -->
<!---->
<!-- Stepping back, this project has helped shape the way I think about what coding agents *mean* for the practice of writing software, and building software-reliant projects like this. -->
<!---->
<!-- In this project, all Claude really did was *speed up time*, the time it takes to build the thing. I *could* have put in the hours in my free time - across many weeks - and built this myself. -->
<!---->
<!-- I never would have done it, though. I already write code and build things for a living - I don't want to spend that much time coding outside of work. I would have just written off this project as something that would take too long. -->
<!---->
<!-- But Claude speeds up time *so much* that it changes the way I c:n plan. All I need to do is buy the hardware, plug it in, write a few prompts, and the thing works. -->
<!---->
