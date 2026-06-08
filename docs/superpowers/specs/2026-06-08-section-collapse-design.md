# Section Collapse Design Spec

**Date:** 2026-06-08
**Status:** Approved

---

## Overview

All 6 portfolio sections (Hero, About, Skills, Experience, Projects, Contact) collapse into animated 52px fixed bars that stack below the navbar as the user scrolls past them. Clicking any bar scrolls back to that section and expands it. Scrolling back up through a section expands it automatically.

---

## Constants

| Name | Value |
|---|---|
| `NAVBAR_HEIGHT` | `68` px |
| `BAR_HEIGHT` | `52` px |
| Section order | hero, about, skills, experience, projects, contact |

---

## Section Bar Icons (animated)

| Section | Icon | Animation |
|---|---|---|
| Hero | `>_` terminal cursor | `blink` (cursor blinks 1s step-end) |
| About | SVG user silhouette | `pulse` (scale 1→1.08, 2.4s ease-in-out) |
| Skills | SVG gear | `spin` (rotate 360deg, 6s linear) |
| Experience | SVG briefcase lid | `lid-open` (scaleY bounce, 3s) |
| Projects | `{ • • • }` code dots | `dot-pop` (opacity stagger, 2s) |
| Contact | SVG envelope flap | `flap-open` (rotateX -35deg, 2.8s) |

Icon container: 32×32px, rounded 8px, section accent color at 10% opacity.

---

## Collapse Trigger

On every `scroll` event (passive), for each section in order:

```
barsAbove = count of sections with lower original index that are currently collapsed
threshold = NAVBAR_HEIGHT + barsAbove * BAR_HEIGHT

if section.getBoundingClientRect().bottom <= threshold + 8:
    collapse(section.id)
else if section.getBoundingClientRect().top >= threshold - 8:
    expand(section.id)
```

The 8px hysteresis prevents flickering at the threshold boundary.

---

## Section Collapse Animation

Each section has:
1. **Outer wrapper** (`<div>`) — stays in DOM, natural height
2. **Content wrapper** (`<motion.div>`) — animates `height` and `opacity`
   - Expanded: `{ height: 'auto', opacity: 1 }`
   - Collapsed: `{ height: 0, opacity: 0 }`
   - Transition: `{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }`
3. **Spacer** (`<div style={{ height: BAR_HEIGHT }}/>`) — rendered only when collapsed, so the section retains scroll presence for `scrollIntoView()`

---

## Collapsed Bars Overlay

A `position: fixed` overlay (zIndex: 49, below navbar's zIndex: 50) renders all collapsed bars in a vertical stack:

- Top of first bar: `top: NAVBAR_HEIGHT` (68px)
- Each subsequent bar: `top: NAVBAR_HEIGHT + index * BAR_HEIGHT`
- Full viewport width
- Each bar: 52px tall, glassmorphism background, section icon + name + number

Bars enter via `AnimatePresence` with `initial={{ opacity: 0, y: -8 }}` → `animate={{ opacity: 1, y: 0 }}`.

---

## Click to Return

Clicking a bar:
1. `document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })`
2. Scroll event fires → section re-enters viewport → `expand()` called → content fades back in

---

## Files

| File | Action |
|---|---|
| `src/context/SectionCollapseContext.tsx` | New — shared collapse state + scroll listener |
| `src/components/CollapsedBarsOverlay.tsx` | New — fixed overlay rendering all bars |
| `src/components/CollapsibleSection.tsx` | New — wrapper component for each section |
| `src/App.tsx` | Modify — wrap sections, add overlay |
| `src/index.css` | Modify — keyframe animations for bar icons |

---

## Out of Scope

- Mobile: feature disabled below 768px (bars don't appear, sections stay normal)
- No sound effects
- Navbar itself never collapses
