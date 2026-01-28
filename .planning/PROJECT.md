# The Ascension Company Website & Client Dashboard

## What This Is

A professional consulting services website and client dashboard for The Ascension Company LLC, providing credit privacy services, business buildout packages, and financial consulting. Built with Next.js, Clerk authentication, Cognabase backend, dark/light theme toggle, and full mobile responsiveness. Deploys to Hostinger at theascensionco.us.

## Core Value

Clients can purchase consulting packages, access their purchased services through a secure dashboard, manage personal and business finances, and track their credit/business progress - all from any device with professional, trustworthy UX.

## Requirements

### Validated

(None yet - ship to validate)

### Active

#### Landing Page
- [ ] Hero section with "Think, plan, and track all in one place" style design
- [ ] Dark/light theme toggle with proper contrast on all text
- [ ] Navigation with Home, Services, Packages, Resources, Pricing, Login, Get Started
- [ ] Company information (Antonio Goldwire, Truth or Consequences NM)
- [ ] Contact section with phone (888) 868-8069 and email support@theascensionco.us
- [ ] Mobile-responsive design for all viewports

#### Authentication
- [ ] Clerk authentication integration
- [ ] Login/signup flow
- [ ] Protected dashboard routes
- [ ] User session management

#### Client Dashboard
- [ ] Dashboard main view with 4 tabs
- [ ] Resources tab with educational content
- [ ] Privacy Services tab with client's purchased privacy file (blurred demo)
- [ ] Business Management tab with company info and D&B tracking
- [ ] Help and Support tab with contact information

#### Privacy Services (CPN Packages - with $250 markup)
- [ ] Basic Package: $547 (670+ score, 1 AU tradeline)
- [ ] Rentals Package: $947 (720+ score, 2 AU tradelines)
- [ ] Standard Package: $1,247 (740+ score, 2 AU high-limit tradelines)
- [ ] Pro Package: $1,847 (760+ score, 4 AU tradelines)
- [ ] Premium Pro Package: $2,747 (15-30 year history, premium tradelines)
- [ ] Package comparison display
- [ ] Reworded service descriptions (plagiarism-safe)

#### Business Buildout Packages (with $1.5k markup)
- [ ] Standard Package: $4,500 (LLC formation, compliance, website, SEO)
- [ ] Advanced Two Corp Package: $6,500 (dual corporation structure)
- [ ] Enterprise Package: $14,000 (triple corporation, $100K tradeline)
- [ ] Package comparison display
- [ ] Reworded service descriptions (plagiarism-safe)

#### Credit Repair Service
- [ ] Single tier: $1,500 (one-size-fits-all)
- [ ] Service description and timeline

#### Business Accounting (CRUD)
- [ ] Add business accounts
- [ ] Edit business accounts
- [ ] Delete business accounts
- [ ] View all business accounts
- [ ] Account balance tracking
- [ ] Transaction history

#### Personal Finance (CRUD)
- [ ] Add personal accounts
- [ ] Edit personal accounts
- [ ] Delete personal accounts
- [ ] View all personal accounts
- [ ] Personal balance tracking

#### Fintech Credit Issuers
- [ ] Top 10 business fintech credit issuers with links
- [ ] Soft pull business credit issuers list
- [ ] Popular fintech containers showing offerings
- [ ] External links to apply

#### D&B Number Tracking
- [ ] Manual D&B number entry/edit
- [ ] PAYDEX score tracking
- [ ] Business credit history display

#### Notifications
- [ ] Email notification system
- [ ] Account activity alerts
- [ ] Service status updates

#### Demo Data
- [ ] ABC Buggy Whips Company mock business
- [ ] Blurred credit privacy file demo
- [ ] Sample transactions and accounts

### Out of Scope

- Payment processing (Phase 2 - gray market considerations)
- Automated tradeline ordering (manual fulfillment through partner)
- Real credit bureau API integrations (manual data entry for MVP)
- Mobile native app (web responsive only for v1)

## Context

**Business Owner:** Antonio Goldwire
**Company:** The Ascension Company LLC
**Domain:** theascensionco.us
**Phone:** (888) 868-8069
**Email:** support@theascensionco.us
**Address:** 2585 S Broadway St, Unit #136, Truth or Consequences, NM 87901

**Service Fulfillment Partner:**
- CPN services fulfilled by creditprivacynumber.com
- Business buildout fulfilled by startmybusiness.us
- Ascension Company acts as white-label reseller with markup

**Pricing Agreement (from email Jan 17, 2026):**
- CPN packages: standard prices + $250 markup
- Business packages: + $1,500 markup
- Credit repair: $1,500 flat fee

**Industry Considerations:**
- Financial services company faces funding challenges
- Credit privacy services are "gray market" - banks won't underwrite
- Credit repair has merchant processor restrictions
- Strategy: collect payment upfront, use profits to support other businesses

## Constraints

- **Tech Stack**: Next.js 14+, React 18+, Clerk Auth, Cognabase (Supabase), TailwindCSS
- **Deployment**: Hostinger (user has SSH access)
- **Content**: All service descriptions must be reworded from source to avoid plagiarism/duplicate content SEO penalties
- **Mobile First**: Must work on all mobile viewports
- **Accessibility**: WCAG 2.1 AA compliance for contrast in both themes
- **Performance**: 2026 web standards, Core Web Vitals optimized

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Cognabase backend | Self-hosted, full control, existing infrastructure | - Pending |
| Clerk for auth | Proven, secure, quick integration | - Pending |
| $250 CPN markup | Email agreement with Chad Siegel | - Pending |
| $1.5k business markup | Email agreement for revenue | - Pending |
| $1,500 credit repair | $500 profit margin per client | - Pending |
| Hostinger deployment | Client has SSH access, existing hosting | - Pending |

---
*Last updated: 2026-01-28 after initialization*
