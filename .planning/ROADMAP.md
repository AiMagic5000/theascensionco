# Roadmap: The Ascension Company

**Created:** 2026-01-28
**Phases:** 8
**Requirements:** 63
**Core Value:** Professional consulting platform with client dashboard

## Phase Overview

| # | Phase | Goal | Requirements | Est. Plans |
|---|-------|------|--------------|------------|
| 1 | Landing Page & Theme | Public-facing website with dark/light theme | LAND-01 to LAND-10 | 3 |
| 2 | Authentication | Clerk integration with protected routes | AUTH-01 to AUTH-06 | 2 |
| 3 | Dashboard Structure | Tab-based dashboard layout | DASH-01 to DASH-07 | 2 |
| 4 | Service Packages | Privacy, business, and credit repair packages | PRIV-*, BUSI-*, CRED-* | 3 |
| 5 | Database Setup | Cognabase schema and connections | DATA-01 to DATA-06 | 2 |
| 6 | Account Management | CRUD for business and personal accounts | BACC-*, PFIN-* | 3 |
| 7 | Credit Resources | Fintech issuers and D&B tracking | FINT-*, DUNS-* | 2 |
| 8 | Final Polish | Notifications and demo data | NOTF-*, DEMO-* | 2 |

---

## Phase 1: Landing Page & Theme

**Goal:** Professional landing page with dark/light theme toggle and full mobile responsiveness

**Requirements:**
- LAND-01: Hero section with modern design
- LAND-02: Dark/light theme toggle
- LAND-03: WCAG AA contrast ratios
- LAND-04: Navigation bar
- LAND-05: Services overview
- LAND-06: Pricing packages display
- LAND-07: Company info and contact
- LAND-08: Footer with legal links
- LAND-09: Mobile responsive
- LAND-10: Core Web Vitals optimized

**Success Criteria:**
1. User can view landing page on desktop and mobile with consistent experience
2. User can toggle between dark and light themes, preference persists
3. All text is readable in both themes (passes contrast checker)
4. Page loads under 3 seconds on 3G connection
5. Navigation works on all screen sizes

---

## Phase 2: Authentication

**Goal:** Secure Clerk authentication with protected routes

**Requirements:**
- AUTH-01: Clerk integration
- AUTH-02: User signup
- AUTH-03: User login
- AUTH-04: Protected routes
- AUTH-05: Session persistence
- AUTH-06: Logout

**Success Criteria:**
1. User can create account with email
2. User can log in and access dashboard
3. Unauthenticated users redirected to login
4. Session persists across browser refresh
5. User can log out from any page

---

## Phase 3: Dashboard Structure

**Goal:** Tab-based dashboard with responsive layout

**Requirements:**
- DASH-01: Main dashboard layout
- DASH-02: Resources tab
- DASH-03: Privacy Services tab
- DASH-04: Business Management tab
- DASH-05: Help and Support tab
- DASH-06: Mobile-responsive
- DASH-07: Theme toggle in dashboard

**Success Criteria:**
1. User can navigate between all 4 tabs
2. Dashboard adapts to mobile viewport
3. Theme toggle works in dashboard
4. Active tab is visually indicated
5. Sidebar collapses on mobile

---

## Phase 4: Service Packages

**Goal:** Display all service packages with pricing and descriptions

**Requirements:**
- PRIV-01 to PRIV-08: Privacy packages
- BUSI-01 to BUSI-06: Business packages
- CRED-01 to CRED-03: Credit repair

**Success Criteria:**
1. All 5 CPN packages displayed with correct pricing
2. All 3 business packages displayed with correct pricing
3. Credit repair service displayed at $1,500
4. All descriptions are original (not copied from source)
5. Package comparison tables functional

---

## Phase 5: Database Setup

**Goal:** Cognabase schema and secure connections

**Requirements:**
- DATA-01: Cognabase connection
- DATA-02: Users table
- DATA-03: Accounts table
- DATA-04: Transactions table
- DATA-05: Business profiles table
- DATA-06: RLS policies

**Success Criteria:**
1. Application connects to Cognabase
2. All tables created with proper relationships
3. RLS policies restrict data to owning user
4. Database operations work from dashboard
5. Connection handles errors gracefully

---

## Phase 6: Account Management

**Goal:** Full CRUD for business and personal accounts

**Requirements:**
- BACC-01 to BACC-08: Business accounting
- PFIN-01 to PFIN-07: Personal finance

**Success Criteria:**
1. User can add, edit, delete business accounts
2. User can add, edit, delete personal accounts
3. Transactions can be added to accounts
4. Balances calculate correctly
5. All operations persist to database

---

## Phase 7: Credit Resources

**Goal:** Fintech credit issuer listings and D&B tracking

**Requirements:**
- FINT-01 to FINT-04: Fintech issuers
- DUNS-01 to DUNS-04: D&B tracking

**Success Criteria:**
1. Top 10 business fintech issuers displayed
2. Soft pull issuers listed separately
3. User can enter/edit D&B number
4. PAYDEX score field editable
5. External links open in new tab

---

## Phase 8: Final Polish

**Goal:** Notifications, demo data, and deployment

**Requirements:**
- NOTF-01 to NOTF-03: Notifications
- DEMO-01 to DEMO-04: Demo data

**Success Criteria:**
1. Email notification system functional
2. ABC Buggy Whips demo company visible
3. Blurred privacy file preview works
4. Sample data populates for new users
5. Application deployed to Hostinger

---

## Deployment Details

**Hostinger SSH:**
- IP: 195.35.34.109
- Port: 65002
- Username: u456646851
- Domain: theascensionco.us

**Strategy:** Replace existing WordPress with Next.js static export or Node.js deployment

---

*Roadmap created: 2026-01-28*
