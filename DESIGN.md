# DESIGN.md

## Overview

Salix should look like a quiet Korean blog built around reading and indexing, not a product landing page. The visual metaphor is a willow or green plant in a workroom: soft leaf color, deep stem green, warm paper surfaces, thin dividers, and calm density.

The first screen should expose content immediately. The home page opens with the recent post list and filtering controls. Brand expression comes from typography, color, rhythm, and footer treatment rather than slogans or large promotional banners.

## Design Principles

1. Content first: posts, tags, dates, and categories should be visible before decorative material.
2. Quiet plant palette: use leaf greens, dark stem green, warm off-white, bark neutrals, and small amber accents.
3. Editorial density: layouts should feel organized and scannable, with restrained spacing and clear dividers.
4. Small brand signal: the `Salix` wordmark is enough. Do not pair it with a separate icon unless specifically requested.
5. Durable UI: avoid visual treatments that will feel like a campaign page, such as huge hero sections, broad gradients, and floating nested cards.

## Color Tokens

Use these semantic colors in CSS variables.

| Token | Hex | Role |
| --- | --- | --- |
| `--bg` | `#f5f7ef` | Page canvas, warm leaf paper |
| `--bg-strong` | `#123225` | Header contrast, footer, dark text surfaces |
| `--surface` | `#fffdf7` | Primary reading and card surface |
| `--surface-muted` | `#e7eee1` | Quiet controls, nav hover, tag backgrounds |
| `--text` | `#17231b` | Primary copy |
| `--text-muted` | `#647267` | Metadata and secondary text |
| `--line` | `#cbd8c8` | Dividers and borders |
| `--accent` | `#72bf63` | Fresh leaf accent, selected controls |
| `--accent-strong` | `#2f6f3f` | Links, active states, focused emphasis |
| `--accent-soft` | `rgba(114, 191, 99, 0.22)` | Tags and subtle active backgrounds |
| `--amber` | `#d7a339` | Small warm highlights only |
| `--rust` | `#8a5a2b` | Bark/code accent |

### Color Rules

- Use `--accent-strong` for links and active text, not large backgrounds.
- Use `--accent` for selected segmented controls and occasional badges.
- Use `--bg-strong` for the footer and compact dark surfaces.
- Keep the page mostly warm neutral with green signals. Do not make every section green.
- Avoid purple-blue gradients, beige-only pages, and heavy brown/orange palettes.

## Typography

### Families

- UI and body: Pretendard, Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, system-ui, sans-serif.
- Wordmark: Georgia, Times New Roman, serif.
- Code: system monospace stack.

### Scale

| Use | Size | Weight | Line Height |
| --- | --- | --- | --- |
| Page title | `clamp(2rem, 5vw, 3.25rem)` | 900 | 1.18 |
| Section title | `clamp(2rem, 5vw, 3.5rem)` | 900 | 1.18 |
| Post title in home list | `1.18rem` | 900 | 1.3 |
| Card title | `1.35rem` | 900 | 1.3 |
| Body | `1rem` | 400 | 1.75 |
| Metadata | `0.88rem` | 800 | 1.4 |
| Eyebrow | `0.78rem` | 900 | 1.4 |

### Typography Rules

- Letter spacing is `0`.
- Do not scale body text with viewport width.
- Use the serif face only for the Salix wordmark and footer brand.
- Keep Korean prose readable with generous line height.
- Post detail titles should stay editorial and readable. Avoid oversized hero-title scale.

## Layout

### Containers

- Max width: `1120px`.
- Default gutter: `1rem` on each side through `.container`.
- Header height target: `4.5rem` on desktop.

### Home Page

- First viewport starts with the recent post feed.
- Use a compact heading row: title on the left, utility link on the right.
- Place search and category filters directly above the list.
- Render posts as rows, not feature cards.
- The tag section may follow the feed, but it should stay compact and should not use a large heading.

### Footer

- Footer is a real bottom section, not fixed or sticky.
- `main` should be at least one viewport tall so the footer appears only after scrolling.
- Use the dark stem surface with the Salix wordmark, copyright, and compact nav links.

## Components

### Header

- Sticky at the top with subtle blur and a 1px divider.
- Use a pale sky-white background so the header separates from the warm leaf page canvas.
- Left brand is the `Salix` wordmark only.
- Nav items are short Korean labels.
- Hover states use `--surface-muted`.

### Post List

- Use horizontal dividers instead of heavy cards.
- Each row includes category, date, title, description, and tags.
- No featured post treatment on the home page.
- Row padding should be compact enough to scan several posts at once.

### Post Cards

- Use cards on archive pages where grid comparison is useful.
- Radius should be 8px or less unless an existing component requires otherwise.
- Use borders before shadows.
- Featured card treatments should stay limited to archive or listing contexts, not the home feed.

### Post Images

- Hero images should be consistent across posts: full-frame, uncropped, and placed inside the same rounded frame.
- Treat post hero images like editorial covers, not decorative backgrounds.
- Use `object-fit: contain` for hero images so banners, screenshots, and key art keep their full composition.
- Use the dark stem frame behind hero images to make very wide assets, such as Steam-style banners, feel intentional.
- Recommended hero ratios are 16:9, 21:9, or Steam-style wide banners. Avoid very tall hero images.
- Body images should live inside the article flow and stay within the prose width.
- Body screenshots should use descriptive alt text and should support the surrounding paragraph.
- Do not create one-off image treatments for a single post unless that pattern is added here first.

### Tags

- Tags are small pills with muted leaf backgrounds.
- Active or hover tag states may use the dark stem background.
- Tag labels should remain short.

### Buttons and Links

- Use text links for navigation and low-stakes actions.
- Use filled buttons sparingly. This blog should not feel CTA-driven.
- Primary filled buttons use `--accent` with dark text.
- Do not create large promotional button rows on the home page.

### Forms and Filters

- Search inputs use white or warm paper surfaces with 1px borders.
- Focus state uses `--accent-soft` outline and `--accent` border.
- Category filters use segmented controls with clear active state.

## Responsive Behavior

| Breakpoint | Behavior |
| --- | --- |
| `< 640px` | Header stacks, nav aligns left, home heading stacks, list remains one column |
| `< 900px` | Grids collapse to one column, post shell becomes single column |
| `>= 900px` | Archive grids may use two or three columns |

Touch targets should be at least 40px tall for buttons, segmented controls, and inputs.

## Do

- Keep the interface calm, readable, and structured.
- Let dividers, metadata, and typography create hierarchy.
- Use leaf green as a signal, not wallpaper.
- Keep the home page useful within the first screen.
- Prefer specific Korean labels over generic marketing text.
- Keep footer content sparse and grounded.

## Don't

- Do not add a large hero to the home page.
- Do not add slogans like "workspace for code and games" above the feed.
- Do not use decorative gradient blobs or abstract ornaments.
- Do not nest cards inside cards.
- Do not use heavy shadows for basic content.
- Do not make the palette only green; keep warm paper and bark neutrals in the system.

## Agent Prompt Guide

When changing UI, follow this brief:

> Build this as a Salix blog surface: content-first, quiet plant-inspired palette, warm paper background, dark stem footer, thin dividers, compact Korean labels, and no marketing hero. Use `DESIGN.md` tokens and existing Astro/Lit patterns.
