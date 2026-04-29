# Toaster Studio site

New site for Toaster Studio, Ljubljana. Replaces the previous toaster.studio.

## Stack

- Next.js (App Router) + TypeScript
- Supabase for content and dynamic data
- Vercel for staging (PR previews)
- Production hosting: Firebase or equivalent (TBD)
- GitHub for source control; `main` is protected, work happens on feature branches

## Repository layout

- `_drafts/` — original HTML page drafts (homepage, build, adopt, manifest), kept as visual reference, not part of the build.
- `docs/` — project brief and body-copy doc.
- `src/` — Next.js application source (App Router under `src/app/[locale]/`).
- `messages/` — next-intl translation dictionaries per locale.

## Status

Scaffolded. English is the first locale; Slovenian and others follow once translated.

See `docs/toaster_claude_code_brief.md` for the full project brief and `docs/toaster_site_copy_v1.md` for body copy.
