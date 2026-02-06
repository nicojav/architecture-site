# Migrate to ISR from Static Export

## Why
- Current SSG requires full rebuild for new projects
- `output: 'export'` limits deployment options
- Large project lists = slow builds

## Impact
- Remove `output: 'export'` from next.config.js
- Enable ISR with revalidation
- Deploy to Vercel/similar (not static host)

## Files
- `next.config.js` (remove export config)
- `app/projects/[id]/page.tsx` (add revalidate)
- `app/projects/page.tsx` (add revalidate)

## Changes
1. Remove from next.config.js:
   - `output: 'export'`
   - `images: { unoptimized: true }`
2. Add to project pages:
   ```typescript
   export const revalidate = 300; // 5min
   ```
3. Keep generateStaticParams for initial build
4. Update deployment (no static export)

## Consideration
- Images now optimized (check external URLs allowed)
- Need Node.js host, not static CDN
- Cache headers work differently
- Sheets fetched on revalidate, not just build

## Testing
- Deploy to Vercel staging
- Add new project to sheet, wait 5min, verify appears
- Check image optimization works
- Verify cache headers correct
- Load test revalidation behavior
