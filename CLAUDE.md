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
- **Supabase** for database (PostgreSQL)
- **OpenAI** for AI agents (GPT-4)

### Project Structure

```
src/
├── app/
│   ├── (auth)/           # Auth pages (sign-in, sign-up)
│   ├── dashboard/        # Protected dashboard routes (/dashboard/*)
│   │   ├── layout.tsx    # Dashboard layout with sidebar
│   │   ├── page.tsx      # Dashboard home
│   │   ├── search/       # Property search
│   │   ├── properties/   # Property details
│   │   ├── saved/        # Saved properties
│   │   ├── buyer-agent/  # AI chat interface
│   │   └── transactions/ # Transaction management
│   ├── api/
│   │   └── ai/chat/      # AI chat streaming endpoint
│   ├── layout.tsx        # Root layout with Providers
│   ├── page.tsx          # Landing page
│   └── providers.tsx     # Client-side providers (Auth)
├── components/
│   ├── ui/               # Base components (Button, Card, Input)
│   ├── layout/           # Sidebar, Header
│   ├── property/         # PropertyCard, PropertyFilters
│   └── ai/               # ChatInterface, AIInsightsPanel
├── lib/
│   ├── auth-context.tsx  # Mock auth (replace with Clerk later)
│   ├── supabase.ts       # Supabase client
│   ├── openai.ts         # OpenAI client and prompts
│   └── mock-properties.ts # Mock property data (20 listings)
└── types/
    └── index.ts          # TypeScript interfaces
```

### Key Patterns

- **Route Groups**: `(auth)` for layout separation without URL segment
- **Protected Routes**: `dashboard/` requires authentication (redirects to `/sign-in`)
- **Mock Auth**: Using localStorage-based auth context; designed for easy Clerk migration
- **AI Chat**: Streaming responses via OpenAI API with fallback mock responses
- **Mock Data**: 20 realistic Austin, TX property listings in `mock-properties.ts`

### Path Aliases

Use `@/*` to import from `src/*` (configured in tsconfig.json).

### Environment Variables

Copy `.env.example` to `.env.local` and add:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase credentials
- `OPENAI_API_KEY` - OpenAI API key for AI features
