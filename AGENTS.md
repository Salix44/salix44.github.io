# AGENTS.md

## Project

Salix is a Korean Astro blog for notes about code, games, and resources. The site should feel like a quiet plant-filled workspace: readable, calm, structured, and content-first.

## Stack

- Framework: Astro
- Interactive components: Lit custom elements
- Content: Astro content collections in `src/content/blog`
- Styling: global CSS tokens in `src/styles/global.css`
- Deployment: GitHub Pages through GitHub Actions, not Jekyll

## Commands

- Install: `npm ci`
- Develop: `npm run dev`
- Type-check: `npm run check`
- Build: `npm run build`
- Preview build: `npm run preview`

On Windows PowerShell, use `npm.cmd` if `npm.ps1` is blocked by execution policy.

## Implementation Rules

- Read `DESIGN.md` before making UI or styling changes.
- Keep the home page content-first. Do not add a large marketing hero, slogan block, or oversized banner above the post list.
- Use `withBase()` for internal links and asset paths that must work on GitHub Pages.
- Keep components simple and Astro-native unless interactivity is needed. Use Lit only for focused browser behavior such as filtering.
- Preserve Korean UI labels unless the user explicitly asks for English.
- Keep cards and panels restrained. Prefer list rows for the home feed.
- Avoid decorative blobs, oversized gradients, or generic landing-page sections.
- Use CSS variables from `src/styles/global.css`; add new tokens only when they match the Salix design system.
- Do not run or rely on Jekyll. `.astro` files are not valid Jekyll content.

## Content Rules

- Blog posts live in `src/content/blog`.
- Frontmatter should stay explicit: title, optional slug, description, publishDate, category, tags, and optional hero.
- Use `slug` when a post is grouped in a year/month folder but should keep a stable public URL.
- Descriptions should be useful summaries, not promotional copy.
- Tags should be short, reusable, and consistent.

## Image Rules

- Prefer one folder per substantial post: `src/content/blog/YYYY/post-name/index.md`.
- Keep post-only images beside the post in `images/`.
- Use `hero: "./images/cover.webp"` or `hero: "./images/cover.png"` for a post-local representative image.
- Use `hero: "/images/..."` only for public/shared images that need a stable direct URL.
- Name representative images consistently: `cover.webp`, `cover.png`, or a clear source-specific name such as `steam-banner.png`.
- Hero images must work as full-frame images. Do not rely on cropping important content.
- In Markdown, reference body images relative to `index.md`, for example `![설명](./images/screenshot.png)`.
- Always write meaningful alt text for Markdown images.
- Avoid committing huge raw screenshots when a compressed `.webp` or optimized `.png` is enough.

## GitHub Pages Notes

- The repository should deploy with `.github/workflows/deploy.yml`.
- In GitHub repository settings, Pages source must be `GitHub Actions`.
- If Actions logs show `actions/jekyll-build-pages`, the repository is still using the wrong Pages source.

## Verification

- For code changes, run `npm run build` when possible.
- For UI changes, also inspect the generated page or run the dev server when practical.
- If local sandboxing blocks Node from reading dependencies, rerun the build with normal local permissions rather than changing app code.
