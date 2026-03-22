# Creative Direction (High-Level Guidance)

This document defines the design direction.  
It is NOT a strict layout spec — it is a set of constraints and principles.

The implementation should interpret this creatively, not mechanically.

---

## 1. Core Intent

Build an **interactive, 3D-aware, animation-rich portfolio** that still communicates information clearly.

The site should feel like:
- a system
- a space
- something you move through

NOT:
- a static webpage
- a template portfolio

---

## 2. Design Style Keywords (IMPORTANT)

Use these as guiding anchors:

- Depth-first UI
- Layered interface
- Spatial design
- Motion-driven navigation
- Glassmorphism (light usage)
- Soft lighting
- Atmospheric background
- Interactive surfaces

---

## 3. Visual Principles to Follow

### A. Depth & Hierarchy
Use:
- perspective
- z-axis layering
- scale variation

Reference concepts:
- "3D UI layering"
- "Spatial interfaces"

---

### B. Motion as Structure
Motion is not decoration — it defines transitions and relationships.

Reference:
- "Motion Design System"
- "Functional animation"

---

### C. Progressive Disclosure
Do not show everything at once.

- reveal on interaction
- reveal on scroll
- reveal on hover

---

### D. Visual Balance
Keep equilibrium between:
- motion vs stillness
- depth vs readability

---

## 4. Hero Section (Signature Area)

### Requirements

- include a **loading/entry experience**
- include a **central animated element**

---

### Suggested Direction

- abstract or particle-based human face
- low-poly or point-cloud style
- reacts subtly to cursor or movement

Reference:
- "Three.js particle portrait"
- "point cloud face animation"

---

### Behavior

- loader transitions into hero smoothly
- hero element has slow idle animation
- no aggressive motion

---

## 5. Background System

DO NOT use flat backgrounds.

Use:

- animated gradient fields
- noise + light overlays
- or low-density particle systems

Reference:
- "gradient mesh animation"
- "ambient background motion"

---

## 6. Interaction Model

### A. Direct Manipulation Feel

Elements should feel like:
- they exist in space
- they respond to user input

---

### B. 3D Interaction

Use:
- perspective transforms
- hover tilt
- cursor-based motion

Reference:
- "3D card tilt interaction"
- "parallax UI layers"

---

### C. Micro-Interactions

Use:
- smooth hover transitions
- soft scaling
- lighting response

Avoid:
- bounce
- elastic effects

---

## 7. Section Transitions

Sections should feel connected.

Use:
- scroll-driven transitions
- parallax layering
- fade + transform combinations

Reference:
- "scroll-linked animations"
- "smooth scroll experience"

---

## 8. Content Integrity

Despite visuals, content must remain:

- readable
- structured
- scannable

Follow:
- "visual hierarchy principles"
- "information density balance"

---

## 9. Color System

### Direction

- dark base
- cool tones (blue / cyan)
- subtle gradients

---

### Restrictions

- avoid heavy purple usage
- avoid neon overload
- avoid flat black

---

### Behavior

- colors should shift slightly with motion
- accent color used sparingly

---

## 10. Lighting & Material

Simulate soft lighting:

- glow on interaction
- subtle highlights
- layered shadows

Reference:
- "UI lighting effects"
- "neumorphism (light usage only)"

---

## 11. Performance Awareness

Even with effects:

- maintain smooth performance
- reduce effects on low-end devices
- avoid heavy continuous rendering

---

## 12. Mobile Adaptation

- reduce 3D effects
- simplify motion
- preserve clarity

---

## 13. What to Avoid

- flat static sections
- excessive text blocks
- random animations without purpose
- too many competing effects

---

## 14. Final Experience Goal

The user should feel:

- immersed
- guided
- slightly impressed by interaction

without feeling:

- overwhelmed
- distracted
- confused