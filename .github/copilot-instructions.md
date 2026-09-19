# Root Tecnologías — Development Guidelines

## Project identity

This repository contains the website for Root Tecnologías,
a small creative technology studio.

The main website and the Estéticas microsites are themselves
part of the studio's portfolio.

Code quality matters, but visual originality is equally important.

---

## Main website architecture

The main site contains:

- `/`
- `/esteticas`
- `/esteticas/:slug`
- `/lab`
- `/lab/:id`
- `/contacto`

The main Root Tecnologías site should maintain a coherent visual
identity across these routes.

---

## Estéticas architecture

Each entry in Estéticas represents an independent visual direction.

Each aesthetic has two different experiences:

1. An editorial/detail page:
   `/esteticas/:slug`

2. A full aesthetic microsite:
   `/esteticas/:slug/live`

The detail page belongs to the Root Tecnologías website.

The `/live` page belongs to the aesthetic being explored.

---

## Aesthetic microsites

Aesthetic microsites must be treated as independent design studies.

Do not simply recolor the Root Tecnologías website.

Do not reuse the main site's visual language unless the aesthetic
specifically calls for it.

An aesthetic may radically change:

- typography
- colors
- layout
- grid
- navigation
- spacing
- buttons
- borders
- animation
- imagery
- interaction patterns

However, every microsite must remain:

- responsive
- accessible
- usable
- performant
- semantically structured
- navigable

---

## Creative freedom

Do not force every aesthetic into the same page template.

The shared requirement is structural consistency, not visual sameness.

Avoid generic SaaS layouts, generic agency sections,
AI-generated visual clichés, excessive cards, excessive gradients,
and unnecessary animation.

Every aesthetic should feel like a deliberate design direction.

---

## Navigation

The aesthetic microsite must provide a subtle way to return
to its Root Tecnologías detail page:

`← BACK TO AESTHETIC`

The destination should be:

`/esteticas/:slug`

The transition happens in the same browser tab.

Do not open aesthetic experiences in a new tab unless explicitly requested.

---

## Main aesthetic gallery

The `/esteticas` page provides two actions for each aesthetic:

- Primary: `OPEN EXPERIENCE`
  → `/esteticas/:slug/live`

- Secondary: `DETAILS`
  → `/esteticas/:slug`

The primary action represents the actual design experience.
The secondary action represents the documentation/case study.

---

## Detail pages

The detail page should document the aesthetic without attempting
to become the aesthetic itself.

The Visual Area should eventually contain a preview of the
microsite and a clear CTA:

`OPEN FULL EXPERIENCE ↗`

This links to:

`/esteticas/:slug/live`

---

## Technical principles

Prefer reusable Vue components and composables.

Avoid unnecessary dependencies.

Do not introduce a UI framework.

Do not create abstractions unless they provide meaningful reuse.

Keep aesthetic-specific styling isolated from the global site.

Avoid leaking aesthetic-specific CSS variables or styles into
the Root Tecnologías global design system.

Respect `prefers-reduced-motion`.

Maintain keyboard accessibility.

Avoid horizontal overflow.

---

## Important

The Root Tecnologías website should feel coherent.

The Estéticas microsites should feel diverse.

Do not solve this tension by making every page look the same.
Use shared technical architecture while allowing visual
experimentation.

## Aesthetic implementation isolation

Each aesthetic microsite must isolate its visual system from the
Root Tecnologías website.

Do not globally modify:

- body styles
- global typography
- global CSS variables
- navigation styles
- buttons
- cards
- layout primitives

unless the change is explicitly required by the main site.

Prefer an aesthetic-specific namespace, component tree, or scoped
style system.

For example:

src/
  aesthetics/
    terminal-bloom/
      TerminalBloom.vue
      terminal-bloom.css

The aesthetic microsite should be able to radically change its
visual language without affecting `/`, `/esteticas`, `/lab`,
`/contacto`, or the Root Tecnologías detail pages.