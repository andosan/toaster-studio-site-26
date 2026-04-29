# Toaster Studio — Claude Code build brief

*Companion document for converting the design drafts (homepage, build, adopt, manifest) into a production Next.js application on the planned stack: Claude Code + Next.js + Supabase + GitHub + Firebase.*

*Read this document in full before opening any of the HTML drafts. The drafts are the visual reference; this document is the intent behind them.*

*Last updated: April 2026.*

---

## 1. Project context

Toaster Studio is a three-person studio in Ljubljana working with teams in defense, finance, governance, and selected commercial clients. The site is being rebuilt to occupy a strategic position currently empty in the regional and broader European market: a small studio with operational AI infrastructure, principled discipline about where AI applies, and the partnership network to deliver banking-grade work without scaling staff.

The site is not a portfolio. It is a working document that demonstrates the position. Visitors should leave knowing how Toaster thinks about work, not how many projects it has shipped.

Primary audience: directors and senior managers in defense procurement, banking compliance, governmental institutions, and commercial leadership at companies that take AI risk seriously. They are conservative readers. They distrust hype. They reward evidence of discipline.

Secondary audience: peer studios, potential collaborators, journalists writing about principled AI practice.

---

## 2. Strategic positioning — the foundation everything rests on

The site copy operates from one foundational claim: **every project is a living system with four parts — the client, the audience, the work itself, and the people building it. Toaster's differentiator is the multidisciplinary capacity to keep all four moving together.**

This is a deliberate shift away from an AI-centered position. AI appears throughout the site as a tool the studio uses with discipline, but it is never the headline. The headline is the integral view of work.

Four operational components support this position:

1. **Studio of three.** Size as a structural feature — only a small studio can afford the discipline of saying no.
2. **Three-layer AI stack.** Operational infrastructure across creative, production, and underlying layers. Used internally; named on the manifest.
3. **Inetis partnership.** Banking-grade Swiss-Slovenian engineering partner, named on the contract and on the site.
4. **AI adoption service.** Founder-led retainer engagements that teach client teams to operate AI capability independently.

Two service lines:

- **Build** — projects, fixed scope, €15K–€80K standard / enterprise on quote, delivered by the studio plus Inetis when needed.
- **Adopt** — retainers, two tiers (€3K advisory / €5K hands-on per month), founder-led, two to three engagements at a time, three-month minimum.

The voice across the site is sober, direct, and unapologetic. It does not sell. It states. Sentences are short. Negation is used sparingly and only when defining what is *not* on offer (saying no is itself a feature). Italics appear as typographic emphasis on the few words that earn it ("system," "no," "tool," "name," "outlive"). Em-dashes appear in brand-warm color as a small recurring grace note.

---

## 3. Technical stack and project shape

The build target is described in the strategy document as: **Claude Code + Next.js + Supabase + GitHub + Firebase**, with self-hosted privacy-first analytics.

Recommended project shape for the Next.js application:

- **App Router** (not Pages Router). The site is content-led and benefits from server components for SEO and AI-search citation.
- **TypeScript** throughout.
- **Tailwind CSS** is one option, but the design uses a small, distinctive set of CSS variables and would translate equally well to a CSS Modules or vanilla CSS approach. The HTML drafts use plain CSS to keep the design system explicit; the choice of styling tool for production is open.
- **Supabase** for the data model (clients, works, agents, notes, inquiries) per the schema sketch in the strategy document.
- **Firebase** as the production hosting target. Vercel preview deploys on pull requests for staging review.
- **GitHub** for source control with feature branches; main is protected.
- **Self-hosted Plausible-equivalent** for analytics. Privacy-first is part of the position; Google Analytics is incongruent with the manifest.
- **Robots.txt** with Content-Signal directives (`search=yes, ai-train=no`) per strategy.
- **Schema.org** structured data on `/manifest`, `/notes`, `/stack` — TechArticle and FAQPage types — for AI-search citation.

A reasonable directory layout:

```
app/
  layout.tsx              # global wrapper, fonts, header, footer
  page.tsx                # homepage
  build/page.tsx          # /build
  adopt/page.tsx          # /adopt
  manifest/page.tsx       # /manifest
  work/page.tsx           # /work index
  work/[slug]/page.tsx    # individual work case study
  labs/page.tsx           # /labs index
  labs/[slug]/page.tsx    # individual lab project
  notes/page.tsx          # /notes index
  notes/[slug]/page.tsx   # individual note
  stack/page.tsx          # /stack
  about/page.tsx          # /about
  contact/page.tsx        # /contact
components/
  Header.tsx
  Footer.tsx
  Hero.tsx                # homepage hero only
  PageTitle.tsx           # inner-page title block
  ContentSection.tsx      # numbered marker + body grid
  Principle.tsx           # manifest principle block
  ServiceOffer.tsx        # build/adopt grid block
  PartsGrid.tsx           # the four-parts homepage block
  Placeholder.tsx         # marked TBD blocks
  CTA.tsx                 # dark-bg conversation CTA
lib/
  supabase.ts
content/
  copy.ts                 # all body copy in one place, easy to edit
public/
  fonts/                  # if self-hosting, otherwise Google Fonts CDN
```

---

## 4. Design system — explicit values

### 4.1 Color tokens

```css
--bg:        #F2EDE4;  /* primary background — warm cream */
--bg-warm:   #EBE4D6;  /* secondary background — slightly deeper, used for service grid, principle highlight, reference wall */
--ink:       #1A1612;  /* foreground text — near-black with warm tint, never use #000 */
--ink-soft:  #4A3F35;  /* secondary text, mono labels, muted body */
--rule:      #C9BEA9;  /* primary border / divider */
--rule-soft: #D8CFBC;  /* lighter divider for less prominent splits */

--teal:      #1F4847;  /* accent — links, emphasis on manifest */
--brown:     #6B4F3A;  /* accent — em-dashes, brand markers, build emphasis */
--green:     #6F7E5C;  /* accent — adopt emphasis, audience-related */

--accent:    var(--teal);  /* default accent; pages may override */
```

The palette is earthy, document-like, and consciously not tech-startup. Never introduce gradients between these colors. Never introduce a black-on-white default. The cream background carries warmth that black-on-white does not.

Each accent has semantic meaning across the site: brown anchors **build** (project work, deliverables), green anchors **adopt** (relationships, growth), teal anchors **manifest** (principles, position). Use the accents consistently — for example, the breadcrumb dot color shifts between pages to reinforce which area the reader is in.

### 4.2 Typography tokens

```css
--display: 'Fraunces', Georgia, serif;
--body:    'DM Sans', system-ui, sans-serif;
--mono:    'JetBrains Mono', monospace;
```

**Fraunces** is the display face. It is a variable font with two crucial axes:
- `wght` (weight) — used at 300, 350, 400 across the site. Headlines sit at 350 — light enough to feel editorial, not so light that they go fragile.
- `SOFT` — controls how rounded the letterforms are. Sharper at lower values (architectural feeling), softer at higher values (humanist). The drafts use `SOFT 30` for primary headlines and `SOFT 100` for italicized emphasis. This is a deliberate intra-typeface contrast: sharp for declarative statements, soft for italic asides and quoted phrases.
- `opsz` (optical size) — set to 144 for large display, 60 or smaller for body-size.

**DM Sans** is the body face. It has institutional clarity without the over-used quality of Inter.

**JetBrains Mono** is reserved for structural labels: navigation, mono captions, breadcrumbs, section markers, prices. It is never used for body copy. Its presence signals "structure" rather than "content."

Type scale (clamp values used to ensure responsive behavior):

| Use | Size |
|-----|------|
| Hero headline (homepage) | `clamp(2.4rem, 6.5vw, 5.4rem)` |
| Page title (inner pages) | `clamp(3.5rem, 9vw, 7rem)` |
| Section heading H2 | `clamp(1.6rem, 3vw, 2.3rem)` (build/adopt), `clamp(1.8rem, 3.5vw, 2.6rem)` (manifest) |
| Lede / summary | `clamp(1.3rem, 2.5vw, 1.8rem)` italic |
| Body | `17px / 1.55` |
| Mono label | `0.72rem`, `0.18em` letter-spacing, uppercase |
| Mono caption | `0.7rem`, `0.16em` letter-spacing, uppercase |

### 4.3 Spacing and layout

The drafts use `clamp()` for nearly all spacing values. This is intentional — the site needs to read well on a laptop, a 27" external display, and a phone, and explicit breakpoints would create awkward middle states.

Key spacing tokens:

```css
--gutter: clamp(1.25rem, 4vw, 2.5rem);   /* horizontal page gutter */
```

Section padding uses `clamp(3.5rem, 8vw, 6rem)` for content sections and `clamp(4rem, 10vh, 7rem)` for page titles.

Inner pages use a two-column grid for content sections:

```
[ section marker, ~220px ] [ section body, fluid ]
```

Marker holds a roman numeral and a short label in mono. Body holds the heading, prose, and any structured sub-content (steps, phases, pricing tables). At 820px viewport this collapses to a single column.

### 4.4 Motion principles

Restraint. The site is editorial, not interactive.

Allowed motion:

- **Page-load fade-in.** Hero elements fade up with staggered delays: top frame 0.1s, headline 0.3s, parts line 0.7s, resolution 1.0s, bottom frame 1.3s. Easing is `cubic-bezier(0.2, 0.8, 0.2, 1)` over 1s.
- **Hover transitions.** Links use a 200–250ms color or border transition. CTAs grow gap by 4px on hover. Work items slide right 1rem on hover.
- **Scroll indicator drift.** A 2.5s ease-in-out animation on the down arrow in the hero. Subtle.

Forbidden motion:

- Scroll-triggered animations on body content (no fade-in on scroll, no parallax).
- Auto-playing video or carousels.
- WebGL / canvas backgrounds. (Tested during draft phase — broke the document tone. Could revisit in later version with extreme restraint, but is not in scope for v1.)
- Spring physics, bouncy easings, "playful" micro-interactions.

The page should feel like a document being read, not an experience being navigated.

### 4.5 Texture and depth

The drafts use a subtle paper grain via `body::before` with two stacked radial-gradient dot patterns at very low opacity, in `mix-blend-mode: multiply`. This adds atmosphere without noise. Keep this. It is part of the document tone.

Section backgrounds occasionally shift to `--bg-warm` to create rhythm without changing the palette. Specifically: services block on homepage, reference wall, principle three on manifest. Use this sparingly — three to four shifts maximum across a page.

---

## 5. Components and recurring patterns

### 5.1 Header

A flat horizontal bar with the wordmark on the left (linked to home) and primary nav on the right. Mono type, small, low-contrast. Active page is indicated by a 1px underline in the page's accent color (brown for build, green for adopt, teal for manifest), not by color change of the link itself.

Mobile: nav collapses; an off-canvas menu can be added in production but is not in v1 drafts.

### 5.2 Hero (homepage only)

Three-row grid: top frame, headline center, bottom frame. The architectural left rule (1px hairline) marks the page as a document. Mono labels (edition, date, scroll indicator, verticals) frame the content.

The headline itself is composed of three typographic lines at three scale levels: large statement → indented italic parenthetical → medium resolution. This is deliberate and is the strongest design moment of the homepage. Do not flatten it back to one continuous block.

### 5.3 Page title (inner pages)

Used on /build, /adopt, /manifest, and any future inner page. Components:

- Breadcrumb (mono, with colored marker dot — accent-per-page)
- Title (display, large)
- Lede / summary (italic display, brand-brown)

The architectural left rule continues from the hero down through inner pages. This continuity matters; it makes the site feel like one document with chapters.

### 5.4 Content section

The two-column grid (marker + body) is the workhorse of inner pages. Each section has:

- Section marker (mono label + colored numeral, top-left)
- Section heading H2
- Body prose
- Optional structured sub-content (steps, phases, pricing tables)

Sections are separated by a 1px `--rule-soft` border. Do not introduce additional section dividers (no hairline ornaments, no inline rules between sections).

### 5.5 Principle (manifest only)

A specialized variant of content section. The marker holds a large italic numeral in display type — this is the only place numerals are typeset display-italic. The H2 includes one or two italicized words ("system," "no," "tool," "name," "outlive") that carry the principle's essence; these italicized words use the accent color and `SOFT 100`. Principle 3 (AI) uses the `--bg-warm` background to mark it as the most-read section.

### 5.6 Service offer (homepage)

Two side-by-side panels separated by a 1px rule. Each panel has tag, name, italic summary, body, meta (price/details), CTA arrow link. The rule between them is structural — it visually divides project work from relationship work.

### 5.7 Parts grid (homepage)

The four parts of the system displayed as a 2×2 grid. Each part has a roman numeral, name, and short paragraph. Top borders on each cell create a typographic table of contents feeling. This block is the visual articulation of the position — keep it clean.

### 5.8 Placeholder

Dashed border with diagonal-stripe background. Mono tag in `--brown`, italic title in display, short description below. Used wherever content is TBD. Make placeholders explicit and dignified, not hidden.

### 5.9 CTA (dark)

Full-bleed `--ink` background section. Mono label with leading rule, large display heading with one italic phrase highlighted in `--rule` color, paragraph in `--rule`, outlined button. The dark CTA appears once per page, always at the bottom. Other contexts use inline arrow links instead.

### 5.10 Footer

Minimal. Mono type. Two segments: copyright on the left, location/context on the right. No extensive nav, no newsletter signup, no social grid. This is a working studio site; the footer reflects that.

---

## 6. Page-by-page notes

### Homepage (`/`)

Reference draft: `toaster_homepage_v1.html`.

Block sequence: hero → integral view (four parts) → service offer (build / adopt) → live proof (placeholder) → selected work (framework) → reference wall (framework) → CTA.

Live proof, selected work, and reference wall are all in placeholder state. They cannot be filled until:
- Live proof: project list and embed format decided
- Selected work: client list curation completed (keep & promote / keep / drop)
- Reference wall: same curation

### `/build`

Reference draft: `toaster_build_v1.html`.

Five sections plus closing CTA: what we build → how a build works → who delivers → what it costs → what happens next. The "how a build works" section uses a four-step structure (Scope, Make, Ship, After) — these are visually rendered as italic display sub-headings, not as numbered steps. This distinguishes them from the major numbered sections.

Pricing block is a small inline table with two rows. Standard projects show a range; enterprise shows "On quote." Both use mono.

### `/adopt`

Reference draft: `toaster_adopt_v1.html`.

Six sections plus CTA: what adopt is → who adopt is for → how an engagement works → who delivers → what it costs → what happens next. The "how an engagement works" section uses a three-phase structure (Audit, Pilot, Embed) with a distinct visual treatment from build's four steps — phase number + name + time range as a single header row, italic name, mono time. Reinforces that adopt is shaped differently from build.

Pricing uses a two-tier grid (Advisory / Hands-on) with a footnote that pricing is for the relationship, not for hours billed.

The accent color for adopt is `--green`. The breadcrumb marker, section numerals, and tier price text all use green to make the page feel cohesive and distinct from build.

### `/manifest`

Reference draft: `toaster_manifest_v1.html`.

URL is `/manifest`; page title is "How we work." This split is deliberate — the URL signals what the document is in the URL bar; the title speaks plainly to the reader.

Structure: cover (meta + title + lede) → five principles → colophon → CTA. Each principle has a large italic numeral, mono label, italic-emphasized heading, and two prose paragraphs. Principle 3 (AI) is highlighted with the `--bg-warm` background.

The colophon at the bottom is small but important: it states the document's revision date and indicates it is updated when practice changes, not on a schedule. This phrase is part of the manifesto tone and must remain.

### Pages still to build

- **`/about`** — bio, personal note, context for the position. Awaits photos and personal copy from the client.
- **`/contact`** — qualifier-first form. Should ask: build / adopt / labs / other; budget range; timeline; goals. Uses Supabase `inquiries` table per strategy schema.
- **`/stack`** — tools, partners, infrastructure. Manifest principle 4 promises this transparency, so this page must deliver it.
- **`/work`** — Selected Work entries. Awaits client list curation.
- **`/labs`** — interactive proof projects. Awaits project selection. Color Grading Agent is the first candidate.
- **`/notes`** — long-form thought leadership. Structure can be built early; content fills over time.

---

## 7. Content source

All written copy lives in `toaster_site_copy_v1.md` (the markdown document produced earlier in the project). When implementing pages, copy must be transferred verbatim from that document. Do not paraphrase, summarize, or rewrite. The copy was written deliberately, sentence by sentence, with positioning and tonal decisions that will not survive casual editing.

If copy must be adapted for a layout reason (line break, character count for a button, etc.), preserve voice and intent. When in doubt, leave it as written.

For Supabase-driven content (works, agents, notes, inquiries), use the schema sketch from the strategy document Part 6.5 as the starting point.

---

## 8. Decisions deferred — TBD log

The following decisions were taken provisionally during writing. Production build should treat these as open and revisit before launch:

| Topic | Current state | Decision needed |
|-------|---------------|-----------------|
| Pricing transparency | Build €15K–€80K; adopt €3K / €5K explicit | Confirm or revise ranges |
| Inetis partnership stage | Stage 2 (co-pitch, named) | Stage 3 (Banking AI Practice) — when to introduce; needs joint case study first |
| Bilingual site | English-first | If Slovenian version added, /si subpath; affects layout for longer Slovenian text |
| Live proof block | Placeholder | Project list, embed format, copy framing |
| Selected work entries | Framework only | Client list curation; project selection |
| Reference wall logos | Framework only | Logo curation per defense / finance / governance / commercial buckets |
| Color Grading Agent details | Mentioned but unspecified | Whether public try-it tool, internal demo, or hybrid |
| Second adopt-capable team member | Not surfaced | Late 2027 at earliest per strategy; copy stays "founder-led" until then |
| Notes content | None yet | Editorial cadence; first three notes |
| About page | Not written | Founder bio, personal note, photos |

---

## 9. What not to do — anti-patterns

These are explicit prohibitions. Each was considered and rejected during draft phase.

- **Do not introduce gradients.** Earthy palette only. Gradients signal "AI agency" and undermine the document tone.
- **Do not use overused fonts.** Inter, Roboto, Arial, Helvetica, Space Grotesk, Geist are all out. Fraunces + DM Sans + JetBrains Mono is the system. If a fourth face is needed (unlikely), choose with the same care.
- **Do not introduce neon, dark mode by default, or futuristic UI elements.** The audience is conservative. The position is principled. The aesthetic is editorial-document.
- **Do not add scroll-triggered animations.** Page-load is the only motion moment. The rest is static.
- **Do not foreground AI in the homepage hero or in section headings.** AI appears in copy where the topic is AI (manifest principle 3, build "Make" step, adopt service description). It does not appear in headlines, taglines, or marketing language.
- **Do not retrofit old projects with "AI added later" framing in case studies.** Tier 1 (logos) and Tier 2 (selected work) only. New work earns full case study treatment.
- **Do not rebuild the manifest as a generic "principles" page with corporate language.** The manifest is direct, declarative, and slightly drzna (bold). Italic emphasis on a few words. No marketing softeners.
- **Do not collapse build and adopt into a single "services" funnel.** They are deliberately distinct products with different shapes. Visual and structural distinction (different accent colors, different sub-content treatment) reinforces this.
- **Do not add live chat, popups, exit-intent modals, or any dark patterns.** The CTA is "start a conversation," delivered honestly.
- **Do not implement cookie banners with pre-selected non-essential consent.** Privacy-first is part of the position. Self-hosted analytics avoids most of this anyway.

---

## 10. Build sequence recommendation

A reasonable order for the production build:

1. **Setup.** Next.js + TypeScript + tooling. Fonts loaded (preferably self-hosted woff2). Tailwind or CSS Modules — your choice.
2. **Design system.** CSS variables, type styles, base layout primitives. Test on a single throwaway page.
3. **Global components.** Header, Footer.
4. **Homepage.** Implement the seven blocks. Placeholders explicit.
5. **Inner pages — build, adopt, manifest.** Each shares the page-title and content-section components.
6. **Supabase setup.** Schema migrations for the five tables. Seed with curated client list when ready.
7. **`/contact`.** Qualifier-first form wired to inquiries table.
8. **`/work` index + slug pages.** Driven by works table.
9. **`/stack`.** Static page; can be built any time after design system is stable.
10. **`/about`.** Awaits client materials.
11. **`/labs`.** Awaits project selection. First lab project (Color Grading Agent) implemented as embedded interactive demo.
12. **`/notes` index + slug pages.** Markdown-driven content; structure ready, content fills over time.
13. **Schema.org structured data.** Add to manifest, notes, stack pages.
14. **Robots.txt, sitemap, Content-Signal directives.**
15. **Self-hosted analytics setup.**
16. **Staging review on Vercel preview deploys, then production deploy to Firebase.**

The first five steps produce a launchable site even with placeholders. Subsequent steps fill content as it becomes available. Do not delay launch waiting for /work or /labs perfection — manifesto in strategy is explicit: iterate after launch, not before.

---

## 11. File index

Drafts in this delivery:

- `toaster_homepage_v1.html` — homepage with all seven blocks (live proof / selected work / reference wall as placeholders)
- `toaster_build_v1.html` — full build service page
- `toaster_adopt_v1.html` — full adopt service page
- `toaster_manifest_v1.html` — manifest with five principles
- `toaster_site_copy_v1.md` — consolidated written copy
- `toaster_claude_code_brief.md` — this document

Open the HTML drafts in a real browser for accurate rendering. Artifact previews can be misleading at narrow widths.

---

*End of brief.*
