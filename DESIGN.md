# Design Brief

**Tone:** Professional fortress — intentional, secure, non-generic. Minimalist cybersecurity aesthetic focused on functional clarity and trust.

**Differentiation:** Message state badges with left-border accent colors (active/teal, expired/grey, viewed/blue, flagged/red). Clean access logs and admin data tables. Security-first visual hierarchy.

## Color Palette

| Token          | Light (OKLCH)      | Dark (OKLCH)       | Purpose                    |
|:---------------|:-------------------|:-------------------|:---------------------------|
| primary        | 0.62 0.17 197      | 0.67 0.19 177      | Trust, communication, CTAs |
| secondary      | 0.68 0.09 258      | 0.24 0.08 258      | Data highlighting          |
| accent         | 0.67 0.19 177      | 0.67 0.19 177      | Security badges            |
| destructive    | 0.58 0.21 24       | 0.65 0.19 22       | Warnings, flagged access   |
| muted          | 0.9 0 0            | 0.24 0 0           | Inactive, expired states   |

## Typography

- **Display/Body:** Plus Jakarta Sans (geometric, modern, clean)
- **Mono:** JetBrains Mono (timestamps, device fingerprints, code)
- **Scale:** 12px (xs), 14px (sm), 16px (base), 18px (lg), 20px (xl), 24px (2xl)

## Structural Zones

| Zone          | Light Treatment       | Dark Treatment        | Border/Separator      |
|:--------------|:----------------------|:----------------------|:----------------------|
| Header        | 0.96 bg-card          | 0.14 bg-card          | bottom border-border  |
| Sidebar       | 0.96 bg-sidebar       | 0.14 bg-sidebar       | right border-border   |
| Content       | 0.98 bg-background    | 0.1 bg-background     | none                  |
| Card/Message  | 0.96 bg-card          | 0.14 bg-card          | subtle border + left accent (state-dependent) |
| Admin Tables  | 0.96 bg-card          | 0.14 bg-card          | row striping via muted/card bg alternation    |

## Component Patterns

- **Message Cards:** Left border (4px) in state color; title, meta (sender/date/recipient), action buttons right-aligned
- **State Badges:** `.badge-security` — accent color with 10% opacity background, 30% opacity border, monospace text
- **Admin Table:** Striped rows; highlight flagged behavior with light destructive bg; access logs with timestamp mono font
- **Buttons:** Primary (teal bg, white text), Secondary (transparent, teal border), Destructive (red bg, white text)

## Motion & Interaction

- **Transition:** 0.3s cubic-bezier(0.4, 0, 0.2, 1) for all interactive state changes
- **Hover:** 5% opacity shift, no scale or lift
- **Focus:** ring-2 in primary color, offset 2px

## Constraints

- No gradients; solid colors only
- No shadows beyond subtle border
- Minimal border-radius (4px max, 0 on utility icons)
- Dark mode default; light mode available but not primary
- No decorative elements; function first
- Font sizing conservative (never smaller than 12px)

## Signature Detail

Message state left-border accent system (`.state-active`, `.state-expired`, `.state-viewed`, `.state-flagged`) provides instant visual feedback on message accessibility and security flags without cluttering card content.
