# Vercel NOT_FOUND Error Resolution Guide

## Suggested Fix

Update `vercel.json` to match your actual build setup:

```json
{
  "installCommand": "npx pnpm@8 install --no-frozen-lockfile",
  "buildCommand": "pnpm build:shell",
  "outputDirectory": "dist/apps/shell",
  "framework": "vite"
}
```

Alternatively, if you want to use the root-level build script that builds all dependencies:

```json
{
  "installCommand": "npx pnpm@8 install --no-frozen-lockfile",
  "buildCommand": "pnpm build",
  "outputDirectory": "dist/apps/shell",
  "framework": "vite"
}
```

## Root Cause

**What was happening vs. what needed to happen:**
- Your `vercel.json` was configured with:
  - `buildCommand: "cd apps/shell && npm run build"` (incorrect package manager: `npm` vs `pnpm`)
  - `outputDirectory: "dist"` (incorrect path: should be `"dist/apps/shell"`)
  - `framework: null` (prevents Vercel from auto-detecting static asset handling)
  
**What triggered the 404:**
1. Vercel attempted to deploy files from `dist/` instead of `dist/apps/shell/`
2. The wrong package manager command likely failed or produced no output
3. With `framework: null`, Vercel didn't know how to serve the static files

**The misconception:**
You may have assumed that:
- `npm` commands would work in a pnpm workspace (they don't share the same lockfile mechanism)
- The output directory would be relative to the app folder (Vercel expects absolute paths from workspace root)

## Concept Explanation

**Why this error exists:**
The 404/NOT_FOUND error in Vercel protects against deploying empty or misconfigured builds. If Vercel can't find files to serve, it's better to fail fast with a 404 than to serve an incomplete site.

**Mental model:**
```
Your repo structure:
course-dashboard/
├── apps/shell/           ← Your app lives here
├── packages/shared/       ← Dependencies
├── dist/apps/shell/      ← Build output MUST go here
└── vercel.json           ← Points to dist/apps/shell

Vercel deployment flow:
1. Install: pnpm install
2. Build: pnpm build:shell → creates dist/apps/shell/*
3. Deploy: Serve everything in dist/apps/shell/
```

**Framework design:**
Vite produces static files (HTML, CSS, JS, assets). Vercel needs to know:
- Where these files are (`outputDirectory`)
- How to serve them (`framework` configuration)
- Which commands to run (`buildCommand`)

## Warning Signs

**Watch out for these patterns:**

1. **Mismatched package managers:**
   ```json
   // ❌ Wrong
   "buildCommand": "npm run build"  // but package-lock is pnpm
   // ✅ Right  
   "buildCommand": "pnpm build"
   ```

2. **Incorrect output paths:**
   ```bash
   # Check locally first
   pnpm build:shell
   ls -la dist/apps/shell/  # This is what Vercel sees
   ```

3. **Framework set to null:**
   - Only use `null` for custom server deployments
   - For static sites (Vite), use `"vite"` or leave it out for auto-detection

4. **Testing locally:**
   ```bash
   # Before deploying, verify build output exists
   pnpm build:shell
   pnpm preview  # Should work if files are correct
   ```

**Related mistakes to avoid:**
- Using relative paths that depend on `cd` commands (use workspace-relative paths)
- Forgetting to build monorepo dependencies (`pnpm build` vs `pnpm build:shell`)
- Not checking if the build actually produces files in the expected location

## Alternatives & Trade-offs

**Option 1: Build shell only (current)**
```json
{
  "buildCommand": "pnpm build:shell",
  "outputDirectory": "dist/apps/shell"
}
```
✅ Faster builds (only builds shell)  
❌ If shell depends on other packages not built, could fail

**Option 2: Build everything**
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist/apps/shell"
}
```
✅ Ensures all dependencies are built  
❌ Slower builds (builds entire monorepo)

**Option 3: Nx-aware Vercel deployment**
Use Vercel's Nx integration:
```json
{
  "framework": "@vercel/nx",
  "buildCommand": "nx run shell:build --configuration=production"
}
```
✅ Best of both worlds (caching, parallel builds)  
❌ More complex setup

**Option 4: Separate Vercel project for shell**
- Point Vercel directly to `apps/shell/` folder
- Use the local `vercel.json` in that directory
✅ Clearer separation of concerns  
❌ Harder to share config, potential duplication

## Quick Verification

After making changes, verify locally:

```bash
# 1. Clean build
rm -rf dist && pnpm build:shell

# 2. Check output exists
ls -la dist/apps/shell/  # Should see index.html, assets/, etc.

# 3. Preview works
cd apps/shell && pnpm preview
```

Then redeploy to Vercel. The 404 should resolve once the correct files are being served.
