# Hero Terminal Panel — Design Spec

**Date:** 2026-06-08  
**Status:** Approved

---

## Overview

Add an animated live terminal panel to the right side of the Hero section, filling the currently empty right half of the 1100px-wide two-column layout. The terminal auto-cycles through realistic DevOps/SRE commands with typed-in commands and fading output lines.

---

## Layout

The hero layout changes from single-column (`maxWidth: 780`) to a **CSS grid with two equal columns** (`1fr 1fr`, gap 48px) inside the existing `maxWidth: 1100` container.

- **Left column** — existing hero content unchanged: badge, name, typewriter role, tagline, CTA buttons, social icons.
- **Right column** — new `<TerminalWindow>` component.
- **Mobile (< 768px)** — grid collapses to single column; terminal panel hidden (`display: none`) to keep the mobile hero clean.

---

## Terminal Component (`TerminalWindow.tsx`)

### Visual design
- macOS-style window chrome: title bar with red/yellow/green traffic-light dots, monospace title `prod-cluster — bash — 80×24`
- Dark background (`#0f172a`), subtle border (`rgba(255,255,255,0.08)`), large drop shadow
- Body font: JetBrains Mono / Fira Code, 12–12.5px, line-height 1.8
- Color scheme for output lines:
  - Command prompt: `#22d3ee` (cyan) with `#4ade80` prompt symbol
  - Normal output: `rgba(255,255,255,0.5)`
  - Success/OK lines: `#4ade80`
  - Warning lines: `#facc15`
  - Progress/running: animated gradient progress bar using existing `motion` library

### Animation sequence
Each "scene" plays in order; after the last scene there is a brief pause and the sequence resets from the top (infinite loop).

**Scene 1 — kubectl**
```
$ kubectl get pods -n production
NAME                      READY   STATUS    RESTARTS
api-gateway-7f9b8c        3/3     Running   0
auth-service-2d4a1e       2/2     Running   0
data-pipeline-9c3b6f      1/1     Running   0
metrics-collector-4a8d    1/1     Running   0
```

**Scene 2 — terraform**
```
$ terraform plan
Refreshing state... done (3s)
Plan: 4 to add, 2 to change, 0 to destroy.
  + aws_ecs_service.api_v2
  + aws_lb_target_group.api_v2
No breaking changes detected. Safe to apply.
```

**Scene 3 — helm upgrade**
```
$ helm upgrade monitoring ./charts/prometheus \
    --set alertmanager.enabled=true
Release "monitoring" has been upgraded.
STATUS: deployed  REVISION: 7
v3.1.2 → v3.2.0  ✔ Rollout complete
```

**Scene 4 — docker / system**
```
$ docker ps --format "table {{.Names}}\t{{.Status}}"
NAMES                   STATUS
nginx-proxy             Up 14 days
redis-cache             Up 14 days
postgres-primary        Up 14 days
$ uptime
 17:42:01  load average: 0.45, 0.51, 0.48
```

### Timing (approximate)
- Per character typed: 35ms
- Pause after command typed before output appears: 250ms
- Per output line fade-in delay: 150ms stagger
- Pause at end of scene before next command: 800ms
- Pause after all scenes before reset: 1800ms

### Implementation
- New file: `src/components/TerminalWindow.tsx`
- No new npm dependencies — uses existing `motion` (Framer Motion) for fade-in animations
- Command typing reuses the same character-by-character pattern as the existing `Typewriter` component in `Hero.tsx`
- The scene data is a plain array of `{ command: string, output: string[] }` objects — easy to edit

---

## Files Changed

| File | Change |
|---|---|
| `src/components/TerminalWindow.tsx` | **New** — self-contained terminal component |
| `src/components/Hero.tsx` | Convert inner div from `maxWidth:780` single column to CSS grid; import and render `<TerminalWindow>` in right cell |

---

## Out of Scope

- No real command execution — all output is static/scripted
- No user interaction with the terminal (read-only showcase)
- No sound effects
- GitHub push and Vercel deployment are a separate task
