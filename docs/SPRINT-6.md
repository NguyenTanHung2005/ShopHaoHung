# Sprint 6 - Testing, CI/CD & Deployment

**Thời gian**: Tuần 11-12  
**Trạng thái**: 🔄 In Progress

## 📌 Mục Tiêu Sprint

- [x] Unit tests (Jest + React Testing Library)
- [x] E2E tests (Playwright)
- [x] GitHub Actions CI/CD pipeline
- [ ] Vercel deployment automation
- [x] Environment setup (dev, staging, prod)
- [ ] Documentation finalization
- [x] Final bug fixes & polish

## 📊 Key Tasks

### 1. Unit Testing

- [x] Test setup (Jest, React Testing Library)
- [x] Component tests:
  - Button, Input, Badge components
  - ProductCard
  - Cart functionality
  - useAuth hook
- [ ] Utility function tests
- [ ] Store tests (Zustand)
- [ ] Coverage target: 80%+

### 2. Integration Testing

- [ ] Auth flow (login/signup/logout)
- [ ] Cart operations (add/remove/update)
- [ ] Search & filter
- [ ] Dashboard access control

### 3. E2E Testing (Playwright)

- [x] User journey: Browse → Search → Cart → Checkout (Basic Home page flow created)
- [ ] Admin journey: Dashboard → Manage Products
- [ ] Auth flow: Signup → Login → Profile → Logout
- [ ] Protected routes access
- [ ] Demo quick login

### 4. CI/CD Pipeline

- [x] GitHub Actions workflow
  - [x] Lint (ESLint)
  - [x] Type check (tsc)
  - [x] Build verification
  - [x] Test suite
  - [ ] Preview deployment (PR)
  - [ ] Production deploy (main)

### 5. Environment Configuration

- [x] .env.example with all variables
- [ ] Environment-specific configs
- [ ] Secrets management in GitHub
- [ ] Vercel environment variables
- [ ] Database connection (if applicable)

### 6. Deployment Setup

- [ ] Vercel project configuration
- [ ] Domain setup (optional)
- [ ] SSL certificate (auto via Vercel)
- [ ] Custom domain (if needed)
- [ ] Monitoring & alerts
- [ ] Error tracking (Sentry optional)

### 7. Documentation

- [ ] README finalization
- [ ] API documentation
- [ ] Contributing guidelines
- [ ] Troubleshooting guide
- [ ] Deployment runbook
- [ ] Architecture diagrams

### 8. Final Polish

- [ ] UI/UX tweaks
- [ ] Accessibility audit
- [ ] Performance tuning
- [x] Bug fixes from testing (Fixed Next.js 15+ async params for Product Details)
- [ ] Error handling improvements
- [ ] Loading states

## 🛠️ Files to Create/Update

### Testing Files

- [x] `jest.config.js` (NEW)
- [x] `playwright.config.ts` (NEW)
- [x] `__tests__/` directory (NEW)
- [x] `.github/workflows/test.yml` (ci.yml UPDATED)

### Config Files

- [ ] `.github/workflows/deploy-to-vercel.yml` (EXISTS)
- [ ] `.env.example` (UPDATE)
- [ ] `vercel.json` (UPDATE)
- [ ] `next.config.js` (UPDATE)

## 🧪 Test Coverage Goals

- Unit tests: 80%+ coverage
- Integration tests: Key user flows
- E2E tests: Critical paths only
- Lighthouse scores: 90+ all categories

## 📖 Deployment Checklist

Before Production:

- [ ] All tests passing
- [ ] Lint without warnings
- [ ] Build succeeds
- [ ] Performance budget met
- [ ] Security audit passed
- [ ] Environment variables set
- [ ] Database migrations (if needed)
- [ ] Backup created
- [ ] Error tracking configured
- [ ] Monitoring enabled

## ✨ Post-Deployment

- [ ] Smoke test in production
- [ ] Monitor error rates
- [ ] Check Core Web Vitals
- [ ] User acceptance testing
- [ ] Bug fix hotline ready
- [ ] Rollback plan ready

## 🌟 Production URLs

- **Main**: https://shop-haohung.vercel.app
- **Staging**: (if applicable)
- **API**: (if applicable)

## 📝 Notes

- Tests can be run locally with `npm run test`
- GitHub Actions will auto-run on push
- Vercel will auto-deploy on GitHub push
- Keep deploy secrets secure
- Monitor Vercel analytics for performance
