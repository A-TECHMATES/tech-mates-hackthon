# Agent Knowledge Base

## Project Overview

- **Name:** Hidden Corners — A 48-Hour Buildathon
- **Type:** Single-page landing site for a hackathon event
- **Created with:** Bolt.new

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 13.5.1 (App Router) |
| Language | TypeScript 5.2.2 |
| Styling | Tailwind CSS 3.3.3 |
| UI Library | shadcn/ui (47 components) + Radix UI |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| 3D/Particles | Three.js |
| Charts | Recharts |
| Backend | Supabase (dependency installed, not yet integrated) |
| Deployment | Netlify (`@netlify/plugin-nextjs`) |

## Project Structure

```
app/
  page.tsx            # Main landing page (assembles all sections)
  layout.tsx          # Root layout — fonts (Inter, Space Grotesk, JetBrains Mono)
  globals.css         # Global styles, custom utilities (gradient-text, glass, glow-ring)
components/
  Hero.tsx            # Countdown timer + hero section with cursor-following radial light
  Navbar.tsx          # Fixed nav with scroll-triggered glass effect, mobile menu
  Mission.tsx         # Mission section
  Build.tsx           # Build details section
  Architects.tsx      # Team/architects section
  Register.tsx        # Registration section
  Footer.tsx          # Footer
  ParticlesBackground.tsx  # Three.js particle background effect
  MissionOrb.tsx      # Orb visual component
  ui/                 # 47 shadcn/ui components (button, card, dialog, form, etc.)
hooks/
  use-toast.ts        # Toast notification hook
  use-in-viewport.ts  # IntersectionObserver hook for scroll-triggered animations
lib/
  utils.ts            # cn() helper (clsx + tailwind-merge)
```

## Scripts

```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking (tsc --noEmit)
```

## Design System

- **Theme:** Dark only (purple/violet palette, Material Design 3-style color naming)
- **Fonts:** Inter (body), Space Grotesk (headings), JetBrains Mono (code/mono)
- **Custom CSS utilities:** `gradient-text`, `gradient-text-primary`, `glow-ring`, `glow-ring-hover`, `glass`, `glass-strong`, `section-divider`, `noise-overlay`, `scrollbar-hide`
- **Key colors:** `background: #010102`, `on-surface: #e5e1e6`, `primary: #d3beed`, `surface: #131316`

## Code Conventions

- **Client components:** Add `'use client'` directive at top of file
- **Class merging:** Use `cn()` from `@/lib/utils` (combines clsx + tailwind-merge)
- **Path alias:** `@/*` maps to project root (e.g., `import X from '@/components/X'`)
- **ESLint:** Errors ignored during builds (`eslint.ignoreDuringBuilds: true`)
- **Images:** Unoptimized for Netlify compatibility (`images.unoptimized: true`)
- **No tests:** No test framework configured currently
- **Dark mode:** Configured via Tailwind `darkMode: ['class']` but only dark theme is used

## Deployment

- **Platform:** Netlify
- **Build command:** `npx next build`
- **Publish directory:** `.next`
- **Plugin:** `@netlify/plugin-nextjs`
