# Dead Channel

## Concept

Dead Channel is an experimental digital broadcast interface.

The visitor is not simply browsing a website. They are **tuning into a transmission** that may be incomplete, unstable, interrupted, or coming from somewhere unknown.

The experience combines:

* analog television
* broadcast graphics
* experimental video art
* lost-media aesthetics
* transmission errors
* station identification
* archival television
* technical instrumentation

The central concept is:

> **You are not visiting the channel. You are receiving it.**

The website should feel like an intercepted broadcast rather than a conventional portfolio.

It should be strange, atmospheric, occasionally unstable, and highly intentional.

This is NOT a generic retro website and should NOT look like a collection of 1980s UI components.

---

## Design Philosophy

The experience should combine:

**broadcast structure + visual interruption**

**technical precision + analog imperfection**

**information + distortion**

**controlled composition + unexpected signal behavior**

The visitor should always feel that the page is an active transmission.

---

# Visual Direction

## Base Environment

Use a dark broadcast environment.

Possible foundation:

* near-black
* dark charcoal
* very dark blue
* desaturated gray

Do not make everything pure black.

The environment should resemble the darkness surrounding an illuminated CRT display.

---

## Color

Use broadcast-inspired color strategically.

Possible colors:

* white
* warm gray
* broadcast red
* cyan
* electric blue
* green
* yellow

Do not make everything neon.

Color should primarily appear through:

* station graphics
* signal indicators
* color bars
* warning states
* transmission artifacts
* selected content

The base composition should remain restrained.

---

# Typography

Use typography inspired by broadcast systems rather than simply choosing an "80s font."

Possible combinations:

* technical monospace
* condensed grotesk
* utilitarian sans-serif
* oversized broadcast headlines

Use strong contrast between:

* huge titles
* tiny technical metadata
* channel numbers
* timestamps
* transmission codes

Possible language:

`CHANNEL 07`

`SIGNAL DETECTED`

`TRANSMISSION ACTIVE`

`FRAME 004831`

`SOURCE UNKNOWN`

`NO CARRIER`

`LIVE`

`REC`

Typography should feel like part of the broadcast equipment.

Avoid excessive decorative retro typography.

---

# Composition

Do NOT structure the page as:

hero → cards → features → CTA.

Instead think of the experience as a broadcast timeline.

Possible states:

**TUNE → ACQUIRE → BROADCAST → INTERRUPT → REPLAY → ARCHIVE → END**

Each state should feel like part of the same transmission.

Large visual fields should dominate.

Text, imagery, graphics and distortion can overlap.

---

# Required Experience

## 01 — TUNING / OPENING

The opening should immediately feel like a television being tuned.

Possible elements:

* unstable signal
* channel number
* scan movement
* brief static
* synchronization indicators
* station identifier
* distorted typography
* broadcast tone visualization

Do not create a conventional hero.

The first interaction could allow the visitor to:

**TUNE SIGNAL**

or select a channel.

The transition from tuning into the main transmission should be part of the experience.

---

# 02 — LIVE BROADCAST

Once the signal is acquired, introduce the main content.

This should be a large broadcast composition containing:

* imagery/video-like visual field
* oversized typography
* channel identifier
* timestamp
* signal status
* transmission information

The composition should feel like a television frame.

However, do not simply place everything inside a decorative rectangle.

The viewport itself should behave like the broadcast surface.

---

# 03 — CHANNEL SELECTOR

Create an interactive channel selector.

Possible channels:

`CH 01 — ARCHIVE`

`CH 02 — SIGNAL`

`CH 03 — FIELD`

`CH 04 — UNKNOWN`

Different channels should reveal different content states.

Changing channels should produce a deliberate transition:

* static
* scan
* brief interruption
* frame shift
* color change
* signal lock

Do not make this a conventional navigation menu.

It should feel like operating a television receiver.

---

# 04 — SIGNAL CALIBRATION

Create an interactive signal-control widget.

Possible controls:

* frequency
* horizontal sync
* vertical sync
* noise
* interference
* brightness
* contrast

Controls should actually affect the visual output.

For example:

Increasing interference could:

* distort the image
* introduce scan artifacts
* shift typography
* increase static
* alter the waveform

Do not create sliders that merely change decorative numbers.

Every control should visibly affect the transmission.

---

# 05 — BROADCAST ARCHIVE

Create a collection of recovered transmissions.

Do NOT use normal portfolio cards.

Present them as fragments from an archive:

* frame captures
* timestamps
* channel numbers
* transmission IDs
* short descriptions
* corrupted thumbnails
* recovered sequences

Selecting an item should open it as a broadcast fragment.

Possible interaction:

**PLAY TRANSMISSION**

The visitor can move through recovered frames.

---

# 06 — INTERRUPTION

Introduce an unexpected broadcast interruption.

For example:

`NO SIGNAL`

`PLEASE STAND BY`

`TRANSMISSION INTERRUPTED`

or:

`SOURCE LOST`

This should not simply be an animation.

Use it as a transition into another part of the experience.

The interruption can briefly change:

* typography
* composition
* color
* audio-like visual representation
* signal quality

Keep it controlled and intentional.

Do not make the page randomly glitch constantly.

---

# 07 — TRANSMISSION LOG

Present technical information as part of the broadcast.

Possible values:

* channel
* frequency
* frame
* transmission ID
* signal strength
* source
* duration
* timestamp
* status

These should feel like broadcast instrumentation rather than dashboard statistics.

---

# 08 — CAPTURE / RECORD

Allow the visitor to capture the current transmission state.

For example:

`REC`

When activated:

1. capture the current visual state
2. assign a frame number
3. assign a timestamp
4. store it locally
5. show it in a recovered-frame archive

Use `localStorage` for persistence.

The capture should feel like recording a strange television transmission.

---

# 09 — END TRANSMISSION

The closing should feel like the station is disappearing.

Possible sequence:

`TRANSMISSION ENDING`

`SIGNAL STRENGTH: 08%`

`CARRIER LOST`

`CHANNEL CLOSED`

Then provide:

`← BACK TO AESTHETIC`

The ending should feel like leaving a broadcast, not reaching a conventional CTA.

---

# Interactive Widgets

Interactive elements are REQUIRED.

Implement at minimum:

### 1. Channel selector

Changing the channel changes the visual/content state.

### 2. Signal calibration

At least two parameters must visibly modify the broadcast.

Examples:

* interference
* frequency
* brightness
* sync

### 3. Signal visualization

Include a live waveform, spectrum, scan pattern, or equivalent broadcast visualization.

### 4. Frame capture

Allow users to capture/save a transmission state using `localStorage`.

### 5. Recovered transmission viewer

Allow users to browse previously captured/recovered frames.

Interactions must have meaningful visual consequences.

Do not add fake controls simply for visual decoration.

---

# Analog Effects

Use analog artifacts carefully.

Possible effects:

* scanlines
* subtle noise
* chromatic offset
* frame jitter
* tracking distortion
* signal tearing
* static
* horizontal displacement
* slight color separation
* compression artifacts
* imperfect synchronization

These effects should appear according to the state of the transmission.

For example:

Normal:

> stable image

High interference:

> distortion + noise + color displacement

Lost signal:

> static / black frame / technical message

Do NOT permanently cover the entire website with scanlines or VHS noise.

The effect should communicate state.

---

# Motion

Motion is fundamental.

Use:

* signal acquisition
* channel switching
* scanning
* waveform movement
* occ
