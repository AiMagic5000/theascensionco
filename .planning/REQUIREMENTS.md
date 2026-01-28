# Requirements: The Ascension Company

**Defined:** 2026-01-28
**Core Value:** Clients can purchase consulting packages, access their purchased services through a secure dashboard, manage personal and business finances, and track their credit/business progress.

## v1 Requirements

### Landing Page (LAND)

- [ ] **LAND-01**: Hero section with modern "Think, plan, and track" style design
- [ ] **LAND-02**: Dark/light theme toggle persisted to localStorage
- [ ] **LAND-03**: Proper contrast ratios in both themes (WCAG AA)
- [ ] **LAND-04**: Navigation bar with all main sections
- [ ] **LAND-05**: Services overview section
- [ ] **LAND-06**: Pricing packages display
- [ ] **LAND-07**: Company info and contact section
- [ ] **LAND-08**: Footer with legal links
- [ ] **LAND-09**: Mobile responsive (all viewports)
- [ ] **LAND-10**: Fast load times (Core Web Vitals optimized)

### Authentication (AUTH)

- [ ] **AUTH-01**: Clerk authentication integration
- [ ] **AUTH-02**: User signup with email
- [ ] **AUTH-03**: User login
- [ ] **AUTH-04**: Protected dashboard routes
- [ ] **AUTH-05**: Session persistence across browser refresh
- [ ] **AUTH-06**: Logout functionality

### Dashboard Structure (DASH)

- [ ] **DASH-01**: Main dashboard layout with sidebar/tabs
- [ ] **DASH-02**: Resources tab
- [ ] **DASH-03**: Privacy Services tab
- [ ] **DASH-04**: Business Management tab
- [ ] **DASH-05**: Help and Support tab
- [ ] **DASH-06**: Mobile-responsive dashboard layout
- [ ] **DASH-07**: Theme toggle in dashboard

### Privacy Services Packages (PRIV)

- [ ] **PRIV-01**: Basic Package display ($547)
- [ ] **PRIV-02**: Rentals Package display ($947)
- [ ] **PRIV-03**: Standard Package display ($1,247)
- [ ] **PRIV-04**: Pro Package display ($1,847)
- [ ] **PRIV-05**: Premium Pro Package display ($2,747)
- [ ] **PRIV-06**: Package comparison table
- [ ] **PRIV-07**: Reworded service descriptions (plagiarism-safe)
- [ ] **PRIV-08**: Purchase/inquiry CTA buttons

### Business Packages (BUSI)

- [ ] **BUSI-01**: Standard Package display ($4,500)
- [ ] **BUSI-02**: Advanced Two Corp Package display ($6,500)
- [ ] **BUSI-03**: Enterprise Package display ($14,000)
- [ ] **BUSI-04**: Package comparison table
- [ ] **BUSI-05**: Reworded service descriptions (plagiarism-safe)
- [ ] **BUSI-06**: Purchase/inquiry CTA buttons

### Credit Repair (CRED)

- [ ] **CRED-01**: Credit repair service display ($1,500)
- [ ] **CRED-02**: Service description and timeline
- [ ] **CRED-03**: Purchase/inquiry CTA

### Business Accounting (BACC)

- [ ] **BACC-01**: Add business account
- [ ] **BACC-02**: Edit business account
- [ ] **BACC-03**: Delete business account
- [ ] **BACC-04**: View all business accounts list
- [ ] **BACC-05**: Account balance display
- [ ] **BACC-06**: Transaction history per account
- [ ] **BACC-07**: Add transaction
- [ ] **BACC-08**: Account type categorization

### Personal Finance (PFIN)

- [ ] **PFIN-01**: Add personal account
- [ ] **PFIN-02**: Edit personal account
- [ ] **PFIN-03**: Delete personal account
- [ ] **PFIN-04**: View all personal accounts list
- [ ] **PFIN-05**: Personal balance tracking
- [ ] **PFIN-06**: Transaction history per account
- [ ] **PFIN-07**: Add transaction

### Fintech Credit Issuers (FINT)

- [ ] **FINT-01**: Top 10 business fintech credit issuers list
- [ ] **FINT-02**: Soft pull business credit issuers list
- [ ] **FINT-03**: Issuer cards with offerings and links
- [ ] **FINT-04**: External apply links

### D&B Tracking (DUNS)

- [ ] **DUNS-01**: D&B number manual entry
- [ ] **DUNS-02**: D&B number edit
- [ ] **DUNS-03**: PAYDEX score display
- [ ] **DUNS-04**: Business credit history notes

### Notifications (NOTF)

- [ ] **NOTF-01**: Email notification system setup
- [ ] **NOTF-02**: Account activity alerts
- [ ] **NOTF-03**: Service status update notifications

### Demo Data (DEMO)

- [ ] **DEMO-01**: ABC Buggy Whips Company mock business
- [ ] **DEMO-02**: Blurred credit privacy file preview
- [ ] **DEMO-03**: Sample business accounts
- [ ] **DEMO-04**: Sample transactions

### Database (DATA)

- [ ] **DATA-01**: Cognabase (Supabase) connection
- [ ] **DATA-02**: Users table schema
- [ ] **DATA-03**: Accounts table schema
- [ ] **DATA-04**: Transactions table schema
- [ ] **DATA-05**: Business profiles table schema
- [ ] **DATA-06**: Row Level Security policies

## v2 Requirements

### Payment Processing
- **PAY-01**: Stripe integration for package purchases
- **PAY-02**: Payment history in dashboard
- **PAY-03**: Invoice generation

### Document Management
- **DOC-01**: File upload for client documents
- **DOC-02**: Document viewing in dashboard
- **DOC-03**: Secure document storage

### Advanced Reporting
- **RPT-01**: Financial reports generation
- **RPT-02**: Credit progress tracking charts
- **RPT-03**: Business growth analytics

## Out of Scope

| Feature | Reason |
|---------|--------|
| Payment processing | Gray market services have merchant processor restrictions; collect upfront for v1 |
| Automated tradeline ordering | Fulfillment through partner (creditprivacynumber.com) is manual |
| Credit bureau API integration | Manual data entry for MVP; APIs expensive and complex |
| Native mobile app | Web responsive sufficient for v1 |
| Real-time chat support | Email/phone support for v1 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| LAND-01 | Phase 1 | Pending |
| LAND-02 | Phase 1 | Pending |
| LAND-03 | Phase 1 | Pending |
| LAND-04 | Phase 1 | Pending |
| LAND-05 | Phase 1 | Pending |
| LAND-06 | Phase 1 | Pending |
| LAND-07 | Phase 1 | Pending |
| LAND-08 | Phase 1 | Pending |
| LAND-09 | Phase 1 | Pending |
| LAND-10 | Phase 1 | Pending |
| AUTH-01 | Phase 2 | Pending |
| AUTH-02 | Phase 2 | Pending |
| AUTH-03 | Phase 2 | Pending |
| AUTH-04 | Phase 2 | Pending |
| AUTH-05 | Phase 2 | Pending |
| AUTH-06 | Phase 2 | Pending |
| DASH-01 | Phase 3 | Pending |
| DASH-02 | Phase 3 | Pending |
| DASH-03 | Phase 3 | Pending |
| DASH-04 | Phase 3 | Pending |
| DASH-05 | Phase 3 | Pending |
| DASH-06 | Phase 3 | Pending |
| DASH-07 | Phase 3 | Pending |
| PRIV-01 | Phase 4 | Pending |
| PRIV-02 | Phase 4 | Pending |
| PRIV-03 | Phase 4 | Pending |
| PRIV-04 | Phase 4 | Pending |
| PRIV-05 | Phase 4 | Pending |
| PRIV-06 | Phase 4 | Pending |
| PRIV-07 | Phase 4 | Pending |
| PRIV-08 | Phase 4 | Pending |
| BUSI-01 | Phase 4 | Pending |
| BUSI-02 | Phase 4 | Pending |
| BUSI-03 | Phase 4 | Pending |
| BUSI-04 | Phase 4 | Pending |
| BUSI-05 | Phase 4 | Pending |
| BUSI-06 | Phase 4 | Pending |
| CRED-01 | Phase 4 | Pending |
| CRED-02 | Phase 4 | Pending |
| CRED-03 | Phase 4 | Pending |
| DATA-01 | Phase 5 | Pending |
| DATA-02 | Phase 5 | Pending |
| DATA-03 | Phase 5 | Pending |
| DATA-04 | Phase 5 | Pending |
| DATA-05 | Phase 5 | Pending |
| DATA-06 | Phase 5 | Pending |
| BACC-01 | Phase 6 | Pending |
| BACC-02 | Phase 6 | Pending |
| BACC-03 | Phase 6 | Pending |
| BACC-04 | Phase 6 | Pending |
| BACC-05 | Phase 6 | Pending |
| BACC-06 | Phase 6 | Pending |
| BACC-07 | Phase 6 | Pending |
| BACC-08 | Phase 6 | Pending |
| PFIN-01 | Phase 6 | Pending |
| PFIN-02 | Phase 6 | Pending |
| PFIN-03 | Phase 6 | Pending |
| PFIN-04 | Phase 6 | Pending |
| PFIN-05 | Phase 6 | Pending |
| PFIN-06 | Phase 6 | Pending |
| PFIN-07 | Phase 6 | Pending |
| FINT-01 | Phase 7 | Pending |
| FINT-02 | Phase 7 | Pending |
| FINT-03 | Phase 7 | Pending |
| FINT-04 | Phase 7 | Pending |
| DUNS-01 | Phase 7 | Pending |
| DUNS-02 | Phase 7 | Pending |
| DUNS-03 | Phase 7 | Pending |
| DUNS-04 | Phase 7 | Pending |
| NOTF-01 | Phase 8 | Pending |
| NOTF-02 | Phase 8 | Pending |
| NOTF-03 | Phase 8 | Pending |
| DEMO-01 | Phase 8 | Pending |
| DEMO-02 | Phase 8 | Pending |
| DEMO-03 | Phase 8 | Pending |
| DEMO-04 | Phase 8 | Pending |

**Coverage:**
- v1 requirements: 63 total
- Mapped to phases: 63
- Unmapped: 0

---
*Requirements defined: 2026-01-28*
*Last updated: 2026-01-28 after initial definition*
