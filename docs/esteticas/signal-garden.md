# Signal Garden

## Concept

Signal Garden is an experimental digital environment where information behaves like a living signal.

The website should feel less like a conventional website and more like entering an active generative system: part scientific instrument, part digital ecosystem, part interactive art installation.

The central idea is:

> A system that is continuously producing something.

The interface should communicate that the visual state is alive, changing, and responsive to the visitor.

This is NOT a dashboard, SaaS interface, cyberpunk UI, or generic "futuristic" website.

---

## Design Philosophy

The visual system should combine:

- generative art
- scientific instrumentation
- experimental web design
- data visualization
- organic movement
- precise technical typography
- controlled visual noise

The tension is between:

**precision ↔ unpredictability**

**measurement ↔ emergence**

**system ↔ organism**

The visitor should feel that they are observing and influencing a living digital process.

---

## Visual Direction

### Base

Use a deep, atmospheric background rather than a standard white website.

Possible base colors:

- deep charcoal
- dark blue-black
- very dark green
- near-black violet

Avoid making the entire page pure black.

### Accent colors

Use a limited but expressive set of energetic colors:

- electric cyan
- acid/lime green
- vivid orange
- violet

Do not use all accents equally everywhere.

Color should behave like signal:
small areas of intense color against a restrained environment.

### Typography

Primary typography:

- technical grotesk
- monospace
- contemporary sans-serif

Typography should have strong scale contrast.

Use:

- very large display statements
- tiny instrumentation labels
- numerical values
- timestamps
- coordinates
- frequency values
- system states

Typography should feel like part of the instrumentation.

Avoid excessive text.

---

## Composition

Do NOT use a conventional:

hero → cards → feature sections → CTA

structure.

Instead, think in terms of:

**FIELD → SIGNAL → EXPERIMENT → OBSERVATION → SYSTEM**

Each viewport should feel like a different state of the same environment.

Large visual fields should dominate.

Allow generative graphics to occupy substantial areas of the screen.

Typography can overlap visualizations.

Data can sit beside or inside generative elements.

Whitespace should coexist with areas of intense visual activity.

---

## Required Experience

The page should contain approximately these experiences:

### 01 — SIGNAL / Opening

The opening should immediately establish that the website is alive.

Possible elements:

- large statement
- animated waveform
- moving particles
- system status
- continuously changing numerical values
- subtle timestamp

Avoid a conventional centered hero.

The visitor should encounter a visual field before they encounter normal website structure.

---

### 02 — LIVE FIELD

A large generative visualization.

This should be one of the primary visual moments of the site.

Possible systems:

- particle field
- flowing lines
- noise field
- waveform
- reaction-diffusion-inspired pattern
- procedural geometry

The exact implementation is up to the developer.

The visualization should respond to interaction.

---

### 03 — SIGNAL MONITOR

Create an interactive instrumentation area.

Include an actual interactive widget such as:

- waveform
- frequency graph
- amplitude monitor
- signal history

Values should change dynamically.

The visitor should be able to influence at least one parameter.

This should feel like operating an experimental instrument, NOT filling out a form.

---

### 04 — EXPERIMENTS

Create several interactive experiments.

Do not present them as ordinary cards.

Each experiment should be a small interactive visual system.

Examples:

#### Frequency

A frequency control changes the geometry of a waveform.

#### Entropy

A noise/entropy slider changes the complexity of a particle or line field.

#### Field

Mouse position influences a particle field.

#### Chromatic

A parameter changes the behavior of the accent colors.

Each experiment should have a clear visual response.

---

### 05 — OBSERVATION

Present changing data as part of the artwork.

Possible information:

- current frequency
- amplitude
- entropy
- particles
- field velocity
- system uptime
- current frame
- generated seed

Values should update naturally.

Avoid turning these into dashboard cards.

---

### 06 — CAPTURE

Allow the visitor to capture the current state of the system.

For example:

**CAPTURE SIGNAL**

When activated:

1. freeze or capture the current visual state
2. generate a unique seed/index
3. add the captured state to a small local gallery
4. allow the visitor to inspect previous captures

Use `localStorage` for persistence.

This should feel like collecting specimens from the digital system.

---

### 07 — SYSTEM

A quieter section explaining the conceptual idea.

Use typography and visual composition rather than a conventional content block.

The text should explain that the system is designed around:

- signal
- interaction
- emergence
- observation
- transformation

---

### 08 — EXIT / CLOSING

The ending should feel like shutting down or leaving an active system.

Possible language:

`SIGNAL ENDED`

`FIELD STABILIZED`

`SYSTEM IDLE`

The final action can return to the aesthetic detail page.

---

## Interactive Widgets

Interactive elements are REQUIRED.

At minimum implement:

1. A live generative visualization.
2. One parameter control that visibly changes it.
3. A mouse/touch-reactive field.
4. A capture/save interaction using localStorage.
5. At least one dynamically updating data visualization.

Interactions should be meaningful.

Do not add sliders and buttons merely to satisfy the requirement.

Every control should modify something visible.

---

## Motion

Motion is fundamental to this aesthetic.

Use:

- continuous subtle movement
- flowing particles
- oscillation
- waveform animation
- interpolation
- procedural variation
- mouse interaction
- scroll-driven transitions where appropriate

However:

Do not make everything move constantly.

Create hierarchy between:

- stable elements
- slow elements
- active elements
- interactive elements

Respect `prefers-reduced-motion`.

When reduced motion is enabled:

- preserve the visualization
- reduce or stop continuous animation
- retain interactive controls where possible
- avoid flashing

---

## Responsive Design

The experience must be deliberately responsive.

Test at:

- 1440px+
- 1024px
- 768px
- 480px
- 390px
- 320px

Mobile is NOT simply a stacked desktop layout.

Generative visualizations should be recomposed for smaller screens.

Controls must remain usable with touch.

Do not require hover to understand or operate an interaction.

No horizontal overflow.

No clipped typography.

No controls extending beyond the viewport.

---

## Accessibility

Maintain semantic HTML.

Interactive widgets must be keyboard accessible where applicable.

Important dynamic information should not rely exclusively on animation.

Respect:

`prefers-reduced-motion`

Maintain readable contrast.

Do not make the entire experience dependent on canvas content.

Where canvas is used, provide semantic/accessibility alternatives in the DOM.

---

## Avoid

Do NOT make this:

- cyberpunk
- neon hacker UI
- generic futuristic website
- SaaS dashboard
- cryptocurrency interface
- AI interface
- glassmorphism
- generic dark portfolio
- card-heavy layout
- excessive gradients
- excessive glowing borders
- decorative particles everywhere
- random animation without purpose

The visual system should feel like an intentional digital art experiment.

---

## Technical Isolation

Implement exclusively inside:

`src/aesthetics/signal-garden/`

Recommended structure:

- `SignalGarden.vue`
- `signal-garden.css`
- reusable visualization components/composables as needed

Do not modify the global Root design system.

Do not globally modify:

- body styles
- global typography
- global CSS variables
- shared navigation
- buttons
- layout primitives

unless absolutely necessary for technical integration.

The aesthetic must remain visually isolated.

---

## Navigation

Only include one subtle exit action:

`← BACK TO AESTHETIC`

It should navigate to:

`/esteticas/signal-garden`

Do not add breadcrumbs or repeated section navigation.

The experience itself should provide the structure.

---

## Performance

Generative graphics must remain performant.

Prefer:

- requestAnimationFrame
- efficient canvas rendering
- limited particle counts on mobile
- resize-aware rendering
- cleanup on component unmount
- throttled expensive calculations

Reduce visual complexity on low-resolution/mobile devices when necessary.

---

## Definition of Done

Opening:

`/esteticas/signal-garden/live`

should feel like entering an active generative environment.

It should NOT feel like another Root portfolio page with a different color palette.

The visitor should immediately understand:

**"This interface is alive, and I can influence it."**

The strongest parts of the experience should be:

1. generative visual field
2. interactive signal controls
3. meaningful motion
4. typography integrated with the visual system
5. capture/collection interaction

The aesthetic should be unmistakably different from:

- Terminal Bloom
- Nocturne Grid
- Swiss System