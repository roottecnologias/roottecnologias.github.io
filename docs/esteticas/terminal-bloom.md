# Terminal Bloom

## Identity

Terminal Bloom is an experimental visual direction exploring the
intersection between botanical archives and early computational
interfaces.

The central tension is:

> organic life presented through rigid computational systems.

The website should feel like an imaginary digital botanical
research archive created somewhere between a field scientist's
notebook and an old computer terminal.

This is a design study, not a real botanical organization.

---

# Conceptual qualities

The experience should feel:

- curious
- scientific
- tactile
- archival
- slightly strange
- precise
- organic
- experimental
- intelligent
- nostalgic without becoming retro parody

The design should create tension between things that normally
do not coexist:

- organic / geometric
- natural / computational
- fragile / precise
- archival / digital
- scientific / poetic

---

# Visual direction

This aesthetic should be substantially different from the main
Root Tecnologías website.

Do not simply recolor the existing Root Tecnologías design.

The microsite should have its own visual identity.

A light or warm-toned interface is encouraged if it serves the
concept.

Possible visual territory:

- aged paper
- warm off-white
- dark ink
- muted botanical greens
- restrained warning/annotation colors
- technical grid systems
- thin rules
- index numbers
- specimen labels
- monospaced metadata
- serif or editorial typography for botanical names
- utilitarian interface typography for data

Do not use all of these automatically.

The final composition should feel designed rather than assembled
from a list of visual clichés.

---

# Typography

Typography should reinforce the contrast between organic and
technical.

Consider combining:

- an expressive editorial/serif face for botanical names,
  titles, or poetic statements
- a restrained monospace or technical sans-serif for metadata,
  measurements, labels and navigation

Typography should be a major part of the visual identity.

Avoid using huge typography everywhere simply for dramatic effect.

---

# Layout philosophy

The website should feel like an actual microsite, not a moodboard.

It should have a clear information hierarchy while allowing
interesting asymmetry and editorial composition.

Avoid turning every section into a generic rounded card.

Avoid standard SaaS grids.

Use:

- indexes
- annotations
- rules
- columns
- specimen labels
- unusual alignment
- whitespace
- layered information
- carefully controlled irregularity

The layout should feel like a system built to catalogue living
things.

---

# Required website structure

Build a complete one-page landing page.

The exact layout is intentionally flexible.

The page should contain enough content to demonstrate the aesthetic
as a complete website.

At minimum, include conceptual equivalents of:

## Navigation

A distinctive navigation/header appropriate to Terminal Bloom.

It should not resemble the Root Tecnologías global navigation.

Include a subtle way to return to the Root Tecnologías aesthetic
detail page.

The return action should navigate to:

`/esteticas/terminal-bloom`

Use the same browser tab.

---

## Hero

Create a strong opening statement introducing the fictional
Terminal Bloom archive.

The hero should establish the contrast between botanical life
and computation immediately.

Avoid generic agency copy.

The title should feel like part of the fictional world.

---

## Archive / specimen area

Create a substantial section representing a collection of
botanical specimens, observations, or indexed discoveries.

The content may be fictional.

Use the content to demonstrate the visual system.

Each item could contain things such as:

- specimen number
- botanical name
- status
- location
- observation
- date
- classification

Do not make this look like a conventional product-card grid.

---

## Featured specimen

Create one visually dominant specimen or botanical subject.

This should be the strongest visual moment on the page.

It may use:

- CSS-generated forms
- abstract botanical graphics
- geometric compositions
- carefully chosen generated/placeholder imagery
- typography

Do not rely on stock photography.

The visual should feel native to the aesthetic.

---

## Research / data section

Introduce a section where botanical observations are presented
through a computational or scientific interface.

This could include:

- measurements
- coordinates
- environmental observations
- classification
- timeline
- status indicators

The presentation should feel designed specifically for the
Terminal Bloom world.

---

## Conceptual statement

Include a quieter section that explains the philosophy behind
the archive.

The writing should be short and atmospheric rather than corporate.

---

## Closing / CTA

End the microsite with a strong closing composition.

It should feel like the end of an archive entry rather than a
generic marketing CTA.

Include a clear way to return to the Root Tecnologías aesthetic
detail page.

---

# Interaction

Include a few meaningful interactions.

Examples:

- specimen hover/focus states
- index navigation
- subtle data reveal
- cursor interaction
- transitions between archive states
- subtle botanical movement

Do not animate everything.

Motion should reinforce the relationship between organic life
and computational systems.

All interactions must remain usable with keyboard navigation.

Respect `prefers-reduced-motion`.

---

# Responsive behavior

The design must work intentionally on:

- desktop
- tablet
- mobile

Do not simply shrink the desktop layout.

The archive/index system should be reconsidered for smaller screens.

Avoid horizontal overflow.

---

# Technical requirements

Implement this as part of the existing Vue application.

Create an isolated aesthetic implementation.

Prefer a structure such as:

`src/aesthetics/terminal-bloom/`

Keep aesthetic-specific CSS and components isolated from the
main Root Tecnologías design system.

Do not modify the visual identity of:

- `/`
- `/esteticas`
- `/esteticas/:slug`
- `/lab`
- `/contacto`

unless a change is explicitly required for routing integration.

---

# Important creative constraint

Do not produce a generic "retro terminal website."

The terminal/computational language is only one half of the concept.

The other half is botanical life.

The strongest result should come from the tension between those
two systems.

The finished page should feel like a real visual direction that
could plausibly be presented as a design study in a professional
creative studio portfolio.

Do not mention that this is an AI-generated concept.

Do not use placeholder text such as:

"Lorem ipsum"

"Coming soon"

"Content goes here"

"Example text"

Create enough fictional content for the page to feel complete.

---

# Definition of done

When `/esteticas/terminal-bloom/live` is opened, it should feel
like entering a completely different website.

It should not feel like the Root Tecnologías website with a new
color palette.

The visitor should be able to understand the aesthetic through
the complete experience rather than through an explanatory
description alone.