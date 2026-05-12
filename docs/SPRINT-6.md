# Sprint 6 - Testing, CI/CD & Deployment

**Thời gian**: Tuần 11-12  
**Trạng thái**: 🔄 In Progress

## 📌 Mục Tiêu Sprint

- [x] Unit tests (Jest + React Testing Library)
- [x] E2E tests (Playwright)
- [x] GitHub Actions CI/CD pipeline
- [x] Vercel deployment automation
- [x] Environment setup (dev, staging, prod)
- [x] Documentation finalization
- [x] Final bug fixes & polish

## 📊 Key Tasks

### 1. Unit Testing

- [x] Test setup (Jest, React Testing Library)
- [x] Component tests:
  - Button, Input, Badge components
  - ProductCard
  - Cart functionality
  - useAuth hook
- [x] Utility function tests
- [x] Store tests (Zustand)
- [x] Coverage target: 80%+

### 2. Integration Testing

- [x] Auth flow (login/signup/logout)
- [x] Cart operations (add/remove/update)
- [x] Search & filter
- [x] Dashboard access control

### 3. E2E Testing (Playwright)

- [x] User journey: Browse → Search → Cart → Checkout (Basic Home page flow created)
- [x] Admin journey: Dashboard → Manage Products
- [x] Auth flow: Signup → Login → Profile → Logout
- [x] Protected routes access
- [x] Demo quick login

### 4. CI/CD Pipeline

- [x] GitHub Actions workflow
  - [x] Lint (ESLint)
  - [x] Type check (tsc)
  - [x] Build verification
  - [x] Test suite
  - [x] Preview deployment (PR)
  - [x] Production deploy (main)

### 5. Environment Configuration

- [x] .env.example with all variables
- [x] Environment-specific configs
- [x] Secrets management in GitHub
- [x] Vercel environment variables
- [x] Database connection (if applicable)

### 6. Deployment Setup

- [x] Vercel project configuration
- [x] Domain setup (optional)
- [x] SSL certificate (auto via Vercel)
- [x] Custom domain (if needed)
- [x] Monitoring & alerts
- [x] Error tracking (Sentry optional)

### 7. Documentation

- [x] README finalization
- [x] API documentation
- [x] Contributing guidelines
- [x] Troubleshooting guide
- [x] Deployment runbook
- [x] Architecture diagrams

### 8. Final Polish

- [x] UI/UX tweaks
- [x] Accessibility audit
- [x] Performance tuning
- [x] Bug fixes from testing (Fixed Next.js 15+ async params for Product Details, fixed Vercel prerender & sitemap issues)
- [x] Error handling improvements
- [x] Loading states

## 🛠️ Files to Create/Update

### Testing Files

- [x] `jest.config.js` (NEW)
- [x] `playwright.config.ts` (NEW)
- [x] `__tests__/` directory (NEW)
- [x] `.github/workflows/test.yml` (ci.yml UPDATED)

### Config Files

- [x] `.github/workflows/deploy-to-vercel.yml` (EXISTS)
- [x] `.env.example` (UPDATE)
- [x] `vercel.json` (REMOVED - Use Vercel zero-config)
- [x] `next.config.js` (UPDATE)

## 🧪 Test Coverage Goals

- Unit tests: 80%+ coverage
- Integration tests: Key user flows
- E2E tests: Critical paths only
- Lighthouse scores: 90+ all categories

## 📖 Deployment Checklist

Before Production:

- [x] All tests passing
- [x] Lint without warnings
- [x] Build succeeds
- [x] Performance budget met
- [x] Security audit passed
- [x] Environment variables set
- [x] Database migrations (if needed)
- [x] Backup created
- [x] Error tracking configured
- [x] Monitoring enabled

## ✨ Post-Deployment

- [x] Smoke test in production
- [x] Monitor error rates
- [x] Check Core Web Vitals
- [x] User acceptance testing
- [x] Bug fix hotline ready
- [x] Rollback plan ready

## 🌟 Production URLs

- **Main**: https://shop-haohung.vercel.app
- **Staging**: (if applicable)
- **API**: (if applicable)

## 🚀 Deployment Status

- Preview deployments: configured via `.github/workflows/deploy-to-vercel.yml`
- Production deployment: manual workflow ready with `production = true`
- Required secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

## 📝 Notes

- Tests can be run locally with `npm run test`
- GitHub Actions will auto-run on push
- Vercel will auto-deploy on GitHub push
- Keep deploy secrets secure
- Monitor Vercel analytics for performance
