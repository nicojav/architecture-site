# Optimize Images for Performance

## Problem
- External Unsplash URLs (slow, no optimization)
- No lazy loading strategy
- No responsive image sizing
- No LQIP (low quality placeholders)

## Solutions
1. Use Next.js Image component
2. Add blur placeholders
3. Implement responsive sizes
4. Consider hosting images (if move off static export)

## Files
- `app/page.tsx` (hero image)
- `app/projects/page.tsx` (project cards)
- `app/projects/[id]/page.tsx` (detail images)
- `components/featured-projects.tsx` (carousel)
- `components/project-timeline.tsx` (timeline)

## Changes
1. Replace all `<img>` with `<Image>`
   ```typescript
   import Image from 'next/image';
   <Image
     src={url}
     alt={alt}
     width={800}
     height={600}
     placeholder="blur"
     blurDataURL={blurUrl}
   />
   ```
2. Add responsive sizes
   ```typescript
   sizes="(max-width: 768px) 100vw, 50vw"
   ```
3. Generate blur placeholders
   - Use plaiceholder or sharp
   - Store in projects data OR generate build time
4. If keeping static export:
   - Use loader for external URLs
   - Add domains to next.config.js

## Considerations
- Static export requires `unoptimized: true` OR custom loader
- External URLs need explicit domains
- Blur placeholders increase bundle slightly

## Performance Targets
- LCP < 2.5s (currently ~4s)
- Reduce image transfer size 60%
- Lazy load below-fold images

## Testing
- Lighthouse score improvement
- Check blur placeholders render
- Verify responsive sizes load correct image
- Test on slow 3G network
