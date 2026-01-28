# The Ascension Company - Claude Session Reference

## Project Overview

Building a professional consulting services website and client dashboard for **The Ascension Company LLC**.

**Domain:** https://theascensionco.us
**Owner:** Antonio Goldwire
**Location:** 2585 S Broadway St, Unit #136, Truth or Consequences, NM 87901
**Phone:** (888) 868-8069
**Email:** support@theascensionco.us

## Tech Stack

- **Frontend:** Next.js 14+ with App Router
- **Styling:** TailwindCSS with dark/light theme
- **Auth:** Clerk
- **Database:** Cognabase (self-hosted Supabase on R730)
- **Deployment:** Hostinger

## SSH Credentials (Hostinger)

- **IP:** 195.35.34.109
- **Port:** 65002
- **Username:** u456646851
- **Password:** Thepassword#123

## Service Packages & Pricing

### Privacy Services (CPN + $250 markup)

| Package | Price | Target Score |
|---------|-------|--------------|
| Foundation | $547 | 670+ |
| Essentials | $947 | 720+ |
| Professional | $1,247 | 720+ |
| Executive | $1,847 | 740+ |
| Elite | $2,747 | 760+ |

### Business Formation (SMB + $1,500 markup)

| Package | Price | Description |
|---------|-------|-------------|
| Standard | $4,500 | Single LLC, full compliance |
| Advanced Dual Corp | $6,500 | Two corporations |
| Enterprise | $14,000 | Triple corp, $100K tradeline |

### Credit Repair

- **Price:** $1,500 (one-size-fits-all)

## Fulfillment Partners

- **CPN Services:** creditprivacynumber.com
- **Business Buildout:** startmybusiness.us
- **Ascension acts as white-label reseller with markup**

## Key Features

### Landing Page
- [x] Hero section with modern design
- [x] Dark/light theme toggle
- [x] Services overview (6 service cards)
- [x] Pricing packages display
- [x] About section with company info
- [x] Contact form
- [x] Footer with links
- [x] Mobile responsive

### Dashboard
- [x] Sidebar navigation (collapsible on mobile)
- [x] Overview page with stats
- [x] Resources tab (fintech issuers, soft pull vendors, guides)
- [x] Privacy Services tab (blurred demo file)
- [x] Business Management tab (CRUD accounts, D&B tracking)
- [x] Help & Support tab (contact info, FAQs)

### Authentication
- [x] Clerk integration
- [x] Sign in / Sign up pages
- [x] Protected dashboard routes
- [x] Middleware for route protection

## Database Schema (Cognabase)

### Tables Needed
1. **users** - Clerk user sync
2. **accounts** - Business and personal accounts
3. **transactions** - Account transactions
4. **business_profiles** - Company info, D&B, PAYDEX

## Files Created

```
theascensionco/
├── .planning/
│   ├── PROJECT.md
│   ├── REQUIREMENTS.md
│   ├── ROADMAP.md
│   ├── STATE.md
│   └── config.json
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   │   └── sign-up/[[...sign-up]]/page.tsx
│   │   ├── dashboard/
│   │   │   ├── business/page.tsx
│   │   │   ├── privacy/page.tsx
│   │   │   ├── resources/page.tsx
│   │   │   ├── support/page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── landing/
│   │   │   ├── about.tsx
│   │   │   ├── contact.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── navigation.tsx
│   │   │   ├── packages.tsx
│   │   │   └── services.tsx
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── theme-toggle.tsx
│   │   └── theme-provider.tsx
│   ├── lib/
│   │   ├── supabase.ts
│   │   └── utils.ts
│   └── middleware.ts
├── package.json
├── tailwind.config.ts
└── CLAUDE_SESSION.md
```

## Deployment Status

**LIVE** - Site deployed at https://theascensionco.us on 2026-01-28

### Deployment Notes
- Static export configured for Hostinger shared hosting
- Clerk auth disabled for static build (demo mode)
- .htaccess configured for routing, caching, and security headers
- WordPress backup preserved in ~/backup_20260128/

## Remaining Tasks

### High Priority
1. [ ] Create Clerk account and get real API keys
2. [ ] Set up Cognabase instance and database schema
3. [ ] Re-enable Clerk authentication with real keys (requires Node.js hosting or SSR)
4. [ ] Connect Supabase client to dashboard for data persistence

### Medium Priority
5. [ ] Add email notification system
6. [ ] Implement transaction history
7. [ ] Add more demo data

### Low Priority
8. [ ] Add privacy policy and terms pages
9. [ ] Set up contact form submission
10. [ ] Add analytics tracking (Umami)

## Environment Variables Needed

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Cognabase (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
```

## Notes from Email Conversation

- Credit privacy services are "gray market" - banks won't underwrite
- Credit repair has merchant processor restrictions
- Strategy: collect payment upfront, use profits to support other businesses
- Recommended keeping CPN/credit repair separate from business buildout
- Business buildout company can get funding/credit more easily

## Git Commits

1. `docs: initialize project` - PROJECT.md
2. `docs: add requirements, roadmap, and state` - Planning files
3. `feat: add complete landing page and dashboard structure` - Full app
4. `fix: handle Clerk auth gracefully when keys not configured` - Auth wrappers
5. `feat: configure static export for Hostinger deployment` - Production ready

---

*Session started: 2026-01-28*
*Last updated: 2026-01-28*
*Deployed: 2026-01-28*
