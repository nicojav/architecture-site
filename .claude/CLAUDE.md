# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 13 architectural portfolio website showcasing before/after remodeling projects. The site uses the App Router, static site generation (SSG), and integrates with Google Sheets for dynamic project data management.

## Key Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Build & Deploy
npm run build        # Build static export (output to .next/)
npm start            # Serve production build locally

# Code Quality
npm run lint         # Run ESLint (note: errors ignored during builds)
```

## Architecture

### Static Site Generation
- Next.js is configured with `output: 'export'` in next.config.js
- All pages are pre-rendered as static HTML at build time
- Images are unoptimized for static export compatibility

### Data Layer
The project has a dual-data strategy:

1. **Primary data source**: Google Sheets integration (lib/sheets.ts)
   - Fetches projects from Google Sheets API using service account credentials
   - 5-minute in-memory cache to reduce API calls
   - Falls back to hardcoded data if API fails

2. **Fallback data**: Hardcoded projects (lib/projects-data.ts)
   - Contains 3 featured projects with full details
   - Used when Google Sheets credentials are missing or API fails
   - Helper function `convertSheetProjectToProject()` transforms sheet data to Project interface

Environment variables required for Google Sheets:
- `GOOGLE_SHEETS_CLIENT_EMAIL`
- `GOOGLE_SHEETS_PRIVATE_KEY` (PEM format, newlines escaped as `\\n`)
- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SHEETS_SHEET_ID`

### Routing Structure
```
app/
├── page.tsx                    # Home page with hero, featured projects, services
├── layout.tsx                  # Root layout with Header, Footer, ThemeProvider
├── projects/
│   ├── page.tsx               # All projects gallery (async data fetching)
│   └── [id]/
│       ├── page.tsx           # Individual project detail page
│       └── not-found.tsx      # 404 for invalid project IDs
├── about/
│   └── page.tsx
└── contact/
    └── page.tsx
```

### Component Organization

**Core Components** (components/):
- `header.tsx` - Navigation with theme toggle
- `footer.tsx` - Site footer
- `featured-projects.tsx` - Project grid for homepage
- `project-timeline.tsx` - Interactive timeline visualization
- `theme-provider.tsx` - next-themes wrapper for dark mode

**UI Components** (components/ui/):
- shadcn/ui components (48+ components including Button, Card, Dialog, etc.)
- Configured via components.json
- All use Radix UI primitives with Tailwind styling

### Styling System
- Tailwind CSS with custom design tokens via CSS variables
- Dark mode support via `next-themes` (class-based)
- Theme colors defined in app/globals.css as HSL CSS variables
- shadcn/ui design system with neutral base color

### Path Aliases
Configured in tsconfig.json:
```typescript
"@/*" => "./*"  // Root-level imports (e.g., @/components, @/lib)
```

## Data Models

### Project Interface
```typescript
interface Project {
  id: string;              // Unique identifier, used in URLs
  title: string;
  description: string;
  location: string;
  year: number;
  category: string;        // e.g., "Residential", "Commercial"
  beforeImage: string;     // Image URL
  afterImage: string;      // Image URL
  tags: string[];
  timeline: ProjectImage[]; // Array of progress images
  details: {
    client: string;
    duration: string;
    scope: string;
    challenge: string;
    solution: string;
  };
}
```

### Google Sheets Schema
Expected columns in the Google Sheet:
- `id` - Project identifier
- `title` - Project name
- `category` - Project category
- `beforeImage` - Before photo URL
- `afterImage` - After photo URL
- `timelineImages` - Comma-separated URLs
- `description` - Project description

## Important Implementation Notes

### Static Export Constraints
- No server-side runtime features (API routes, ISR, etc.)
- All data must be fetched at build time
- Images must use `unoptimized: true` in next.config.js

### Google Sheets Integration
- The private key in .env must have escaped newlines (`\\n`)
- lib/sheets.ts handles PEM key normalization automatically
- Sheet data is only fetched during build, not at runtime (due to static export)

### TypeScript Configuration
- Strict mode enabled
- ES5 target for broad compatibility
- Module resolution: bundler (Next.js 13+ requirement)
