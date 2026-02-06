# Add Analytics Tracking

## Goal
Track page views, project views, user interactions

## Options
1. Google Analytics 4 (gtag.js)
2. Plausible (privacy-focused)
3. Vercel Analytics (if Vercel hosted)

## Files
- `app/layout.tsx` (add analytics script)
- `lib/analytics.ts` (new helper)
- `components/analytics-provider.tsx` (optional wrapper)

## Implementation (GA4)
1. Add Script tag in layout
   ```typescript
   <Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
   ```
2. Init gtag in layout
3. Track page views automatically
4. Add event tracking:
   - Project card click (category, project ID)
   - Timeline image view
   - Before/After toggle
   - Contact form submit

## Events
```typescript
trackEvent('view_project', { project_id, category });
trackEvent('toggle_comparison', { project_id, view: 'before'|'after' });
trackEvent('timeline_advance', { project_id, stage });
```

## Files Modified
- `app/layout.tsx` (script + init)
- `components/featured-projects.tsx` (track toggle)
- `components/project-timeline.tsx` (track slide)
- `app/projects/page.tsx` (track card click)

## Env Vars
- `NEXT_PUBLIC_GA_ID`

## Privacy
- Add cookie consent banner (optional)
- Update privacy policy link in footer

## Testing
- Verify events appear in GA dashboard
- Test with ad blockers (graceful degradation)
- Check no PII leaked
