# UCS Premier Consults LTD — Brand Assets (for the frontend build)

This folder is the canonical source the website build must read (per `CLAUDE.md` →
"Always check the `brand_assets/` folder"). Use these real assets — **do not invent brand
colors** and **do not use a placeholder logo**.

Full brand kit (voice, positioning, sections, copy, video brief): `../copy/brand-kit.md`.

## Logo
- `ucs-logo.jpeg` — official "C" monogram + "UCS Premier Consults LTD" wordmark (1080×1080).
- Master reference also at `../assets/references/ucs-logo.jpeg`.
- Use on cream/white sections as-is. For the dark cinematic hero/footer, a reversed
  (knockout) version is needed — export during the build.

## Colors (sampled directly from the logo — exact, not estimated)

### Core (from logo)
| Token | Name | Hex |
|-------|------|-----|
| `--ucs-blue`   | UCS Blue (primary)     | `#0A8CC0` |
| `--ucs-sky`    | UCS Sky (bright top)   | `#0794D9` |
| `--ucs-azure`  | UCS Azure (mid)        | `#076CB0` |
| `--ucs-navy`   | Deep Navy (base of C)  | `#033C81` |
| `--ucs-ink`    | UCS Ink (wordmark)     | `#0B4790` |
| `--ucs-cream`  | Cream (logo bg)        | `#FDF9F0` |

### Extended system (context-appropriate accents)
| Token | Name | Hex |
|-------|------|-----|
| `--ucs-midnight` | Midnight (dark canvas) | `#060B1A` |
| `--ucs-inknavy`  | Ink Navy (dark surface 2) | `#0A1330` |
| `--ucs-cyan`     | Signal Cyan (tech accent) | `#22D3EE` |
| `--ucs-amber`    | Engineer Amber (energy accent, sparse) | `#F5A623` |
| `--ucs-verdant`  | Verdant (sustainability/success) | `#16A34A` |
| `--slate-900`    | Text on light | `#0F172A` |
| `--slate-600`    | Body on light | `#475569` |
| `--cloud`        | Text on dark | `#E6ECF5` |
| `--slate-200`    | Hairline / border | `#E2E8F0` |

**Signature gradient:** `#0794D9 → #076CB0 → #033C81` (mirrors the "C" top-to-bottom).

## Typography (Google Fonts)
- Headings / display: **Poppins** (600, 700)
- Eyebrow / labels: **Space Grotesk** (500, 700)
- Body / UI: **Inter** (400, 500, 600)

## Imagery
- Real project photos not yet available → use `https://placehold.co/` placeholders for
  project/infra imagery, styled to the cinematic mood. Swap for real photos later.
- The **logo is real** — always use it, never a placeholder.
