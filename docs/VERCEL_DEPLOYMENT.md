# Vercel Deployment Guide for Course Dashboard

## Overview

Course Dashboard is configured to deploy to Vercel with support for monorepo (pnpm workspaces), preview deployments, and optimized build times.

## Prerequisites

- Vercel account (free tier is sufficient)
- GitHub repository connected to Vercel
- Project installed with `pnpm`

## Quick Deploy

### Method 1: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave empty)
   - **Build Command**: `pnpm build`
   - **Output Directory**: `apps/shell/dist`
4. Click "Deploy"

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
pnpm add -D vercel

# Login to Vercel
npx vercel login

# Deploy to preview
npx vercel

# Deploy to production
npx vercel --prod
```

## Configuration

The `vercel.json` file at the root of the project contains all necessary configuration:

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "apps/shell/dist",
  "installCommand": "pnpm install",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Configuration Details

- **buildCommand**: Builds all packages in the monorepo
- **outputDirectory**: The shell app's dist folder
- **installCommand**: Uses pnpm for dependency installation
- **framework**: Vite for optimal build performance
- **rewrites**: SPA routing configuration

## Preview Deployments

Vercel automatically creates preview deployments for every pull request:

- **URL format**: `https://<project-name>-<branch>-<random>.vercel.app`
- **Automatic rebuilds**: Triggers on push to PR
- **Comment on PR**: Vercel posts deployment links as PR comments

## Environment Variables

### Current Environment Variables

The project currently doesn't require any environment variables for basic deployment.

### Future Environment Variables (for Multi-Course Support)

When implementing multi-course support, you'll need:

```bash
# In Vercel dashboard: Settings > Environment Variables
VITE_COURSE_ID=fg1-I-2026
```

## Custom Domains

### Setting up a custom domain:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings > Domains**
3. Add your domain (e.g., `dashboard.example.com`)
4. Follow Vercel's DNS configuration instructions

### Multi-course subdomains (Future):

For multi-course support with subdomains:

```json
// vercel.json (future configuration)
{
  "domains": [
    {
      "domain": "fg1.course-dashboard.example.com",
      "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
    },
    {
      "domain": "fg2.course-dashboard.example.com",
      "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
    }
  ]
}
```

## Build Optimization

### Current Optimizations

- **pnpm workspaces**: Faster dependency installation
- **Vite build**: Optimized bundling and code splitting
- **Static assets**: CSS and JS are optimized automatically
- **Cache headers**: Long-term caching for assets

### Monitoring Build Performance

1. Go to **Deployments** tab in Vercel Dashboard
2. Click on any deployment to see detailed build logs
3. Check build time and potential bottlenecks

## Troubleshooting

### Build Failures

**Error**: `Command failed: pnpm build`

**Solution**: Verify all dependencies are installed and the build works locally:
```bash
pnpm install
pnpm build
```

**Error**: Module not found

**Solution**: Ensure `pnpm-workspace.yaml` is correct and all packages are linked properly

### 404 Errors on Navigation

**Error**: Refreshing a page shows 404

**Solution**: The `vercel.json` includes SPA routing with rewrites. If you're still seeing 404s:

1. Verify `vercel.json` is in the project root
2. Check that `rewrites` configuration is present
3. Redeploy after clearing Vercel cache

### Environment Variables Not Working

**Error**: Environment variables are undefined

**Solution**: 
1. Ensure variables are prefixed with `VITE_` (Vite requirement)
2. Variables must be set in Vercel Dashboard (Settings > Environment Variables)
3. Redeploy after adding new variables

## CI/CD Integration

Vercel automatically integrates with GitHub:

- **Automatic builds** on push to main branch
- **Preview deployments** for pull requests
- **Comment integration** - deployment links posted to PR comments
- **Status checks** - build status shown in GitHub PR/commit views

## Multi-Region Deployment

The current configuration uses `iad1` (Virginia) region. For better global performance:

```json
// vercel.json
{
  "regions": ["iad1", "hnd1", "sfo1"]
}
```

Note: Multi-region is available on Vercel Pro plan and above.

## Monitoring & Analytics

### Vercel Analytics

Vercel provides built-in analytics:

1. Go to **Analytics** tab in Vercel Dashboard
2. View page views, visitors, and core web vitals

### Real User Monitoring (RUM)

For more detailed monitoring:

1. Install Vercel Analytics package:
```bash
pnpm add @vercel/analytics
```

2. Add to your app entry point:
```tsx
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

## Rollback

If a deployment causes issues:

1. Go to **Deployments** tab in Vercel Dashboard
2. Find the previous successful deployment
3. Click the "..." menu and select **Promote to Production**

## Production Checklist

Before deploying to production:

- [ ] All tests pass (`pnpm test`)
- [ ] Build succeeds locally (`pnpm build`)
- [ ] Review `vercel.json` configuration
- [ ] Set up custom domain (if needed)
- [ ] Configure environment variables (if any)
- [ ] Enable analytics (optional)
- [ ] Test preview deployment first
- [ ] Verify all links and assets work correctly

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite on Vercel](https://vercel.com/docs/concepts/deployments/overview#vite)
- [pnpm Workspaces Guide](https://pnpm.io/workspaces)
- [Course Dashboard README](./README.md)

## Support

For issues related to:
- **Vercel deployment**: [Vercel Support](https://vercel.com/support)
- **Project issues**: Open an issue in the GitHub repository

---

**Last updated:** 2026-02-11
