# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

AI-first real estate platform built with:
- **Next.js 15** (App Router) + **React 19**
- **TypeScript** with strict mode
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **Supabase** for database (PostgreSQL) — configured, not yet active
- **OpenAI** for AI agents (GPT-4 Turbo)

### Project Structure

```
src/
├── app/
│   ├── (auth)/           # Auth pages (sign-in, sign-up)
│   ├── api/
│   │   ├── ai/
│   │   │   ├── chat/     # Streaming chat endpoint (agent-aware)
│   │   │   ├── analyze/  # Property analysis endpoint
│   │   │   └── seller/   # Seller AI endpoints (pricing, description, offer analysis)
│   │   └── properties/   # Property data API (search, detail, comps)
│   ├── dashboard/
│   │   ├── layout.tsx    # Protected layout with responsive sidebar
│   │   ├── page.tsx      # Dashboard home
│   │   ├── search/       # Property search (uses provider layer)
│   │   ├── properties/   # Property details (enriched with comps, valuation, neighborhood)
│   │   ├── saved/        # Saved properties (localStorage persistence)
│   │   ├── buyer-agent/  # AI chat with agent personality + conversation memory
│   │   ├── my-agent/     # Agent personality selection
│   │   ├── transactions/ # Transaction tracking with stage timeline
│   │   ├── seller/       # Seller dashboard
│   │   │   ├── listings/ # Create, manage, view listings
│   │   │   ├── showings/ # Showing management
│   │   │   ├── offers/   # Offer review with AI analysis
│   │   │   └── chat/     # Seller AI chat (Morgan agent)
│   │   ├── walkthrough/  # AI-guided walkthroughs
│   │   ├── documents/    # Document management
│   │   ├── professionals/# Professionals marketplace
│   │   └── mortgage/     # Mortgage tools
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── ui/               # Button, Card, Input, Skeleton, EmptyState
│   ├── layout/           # Sidebar (with buyer/seller toggle), Header
│   ├── property/         # PropertyCard, PropertyFilters
│   └── ai/               # ChatInterface (agent-aware), AIInsightsPanel
├── lib/
│   ├── providers/        # Property data abstraction layer
│   │   ├── types.ts      # PropertyProvider interface
│   │   ├── mock-provider.ts   # Development fallback (20 Austin TX listings)
│   │   ├── rentcast-provider.ts # RentCast API integration
│   │   ├── cache.ts      # In-memory TTL cache
│   │   └── index.ts      # Provider factory (cascades: RentCast → Mock)
│   ├── hooks/            # React hooks
│   │   └── use-properties.ts  # usePropertySearch, useProperty, useComparables
│   ├── agents.ts         # 4 agent personalities (Alex, Jordan, Sam, Morgan)
│   ├── prompts.ts        # Centralized AI prompt builder (agent-aware)
│   ├── conversation-store.ts  # localStorage conversation persistence
│   ├── saved-properties-store.ts # localStorage saved properties
│   ├── seller-store.ts   # localStorage seller listings, showings, offers
│   ├── transactions.ts   # localStorage transaction tracking
│   ├── auth-context.tsx   # Mock auth (replace with Clerk later)
│   ├── supabase.ts       # Supabase client
│   ├── openai.ts         # OpenAI client
│   ├── utils.ts          # formatPrice, formatNumber, US_STATES
│   └── mock-properties.ts # 20 mock Austin TX listings
└── types/
    └── index.ts          # All TypeScript interfaces
```

### Key Patterns

- **Provider Layer**: `src/lib/providers/` abstracts property data sources. Falls back to mock when no API key.
- **Agent System**: 4 personalities (3 buyer + 1 seller) with role-based system prompts.
- **Conversation Memory**: localStorage-backed per-agent conversation history.
- **Buyer/Seller Toggle**: Sidebar switches between buyer and seller navigation modes.
- **Mobile Responsive**: Sidebar is off-canvas on mobile with hamburger toggle.
- **Mock Auth**: localStorage-based; designed for easy Clerk migration.

### Path Aliases

Use `@/*` to import from `src/*` (configured in tsconfig.json).

### Environment Variables

Copy `.env.example` to `.env.local` and add:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase credentials
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `RENTCAST_API_KEY` - (Optional) RentCast API for real property data; mock data used if not set
