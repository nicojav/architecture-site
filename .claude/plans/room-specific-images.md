# Plan: Add Room-Specific Image Sections to Project Detail Page

**Status:** ✅ Completed
**Created:** 2026-02-06
**Completed:** 2026-02-06

## Context

The project detail page currently shows before/after images and a timeline carousel. We need to add four new room-specific image sections (Kitchen, Bathroom, Office, Living Room) displayed in a two-column grid layout. Sections with no images should be hidden entirely.

A `RoomImageSection` component already exists at `components/room-image-section.tsx` and is fully implemented (two-column grid, lightbox, hides when empty) — it just needs to be wired up.

## TODOs

- [x] 1. Update `Project` interface in `lib/projects-data.ts:11`
- [x] 2. Update `ProjectFromSheets` interface in `lib/sheets.ts:4`
- [x] 3. Add `parseImageUrls` helper function in `lib/sheets.ts`
- [x] 4. Parse new columns in Google Sheets fetch in `lib/sheets.ts:63-77`
- [x] 5. Update `convertSheetProjectToProject` in `lib/projects-data.ts:178-206`
- [x] 6. Update hardcoded `featuredProjects` - Modern Farmhouse in `lib/projects-data.ts`
- [x] 7. Update hardcoded `featuredProjects` - Urban Loft in `lib/projects-data.ts`
- [x] 8. Update hardcoded `featuredProjects` - Coastal Villa in `lib/projects-data.ts`
- [x] 9. Import `RoomImageSection` in `app/projects/[id]/page.tsx`
- [x] 10. Render room image sections on project detail page
- [x] 11. Verify build compiles successfully

## Implementation Details

### 1. Update `Project` interface — `lib/projects-data.ts:11`

✅ Added four new `string[]` fields after `timeline`:

```typescript
kitchenImages: string[];
bathroomImages: string[];
officeImages: string[];
livingRoomImages: string[];
```

### 2. Update `ProjectFromSheets` interface — `lib/sheets.ts:4`

✅ Added the same four `string[]` fields to match new Google Sheets columns.

### 3. Parse new columns in Google Sheets fetch — `lib/sheets.ts:63-77`

✅ Added `parseImageUrls` helper function to reduce repetition:

```typescript
function parseImageUrls(value: string | undefined): string[] {
  const str = value || '';
  return str ? str.split(',').map((url: string) => url.trim()).filter(Boolean) : [];
}
```

✅ Updated the projects mapping to use the helper for all image arrays:

```typescript
timelineImages: parseImageUrls(row.get('timelineImages')),
kitchenImages: parseImageUrls(row.get('kitchenImages')),
bathroomImages: parseImageUrls(row.get('bathroomImages')),
officeImages: parseImageUrls(row.get('officeImages')),
livingRoomImages: parseImageUrls(row.get('livingRoomImages')),
```

### 4. Update `convertSheetProjectToProject` — `lib/projects-data.ts:178-206`

✅ Passed the four new arrays straight through from `ProjectFromSheets` to `Project`:

```typescript
kitchenImages: sheetProject.kitchenImages,
bathroomImages: sheetProject.bathroomImages,
officeImages: sheetProject.officeImages,
livingRoomImages: sheetProject.livingRoomImages,
```

### 5. Update hardcoded `featuredProjects` — `lib/projects-data.ts:31-176`

✅ Added empty arrays for all four fields to each of the 3 hardcoded projects:

```typescript
kitchenImages: [],
bathroomImages: [],
officeImages: [],
livingRoomImages: [],
```

### 6. Render sections on project detail page — `app/projects/[id]/page.tsx`

✅ Imported `RoomImageSection`:

```typescript
import RoomImageSection from '@/components/room-image-section';
```

✅ Added four `<RoomImageSection>` instances after the timeline section:

```tsx
<RoomImageSection title="Kitchen" images={project.kitchenImages} />
<RoomImageSection title="Bathroom" images={project.bathroomImages} />
<RoomImageSection title="Office" images={project.officeImages} />
<RoomImageSection title="Living Room" images={project.livingRoomImages} />
```

## Files Modified

| File | Change | Status |
|------|--------|--------|
| `lib/projects-data.ts` | Add fields to `Project` interface, `convertSheetProjectToProject`, and hardcoded data | ✅ |
| `lib/sheets.ts` | Add fields to `ProjectFromSheets`, add `parseImageUrls` helper, parse new columns | ✅ |
| `app/projects/[id]/page.tsx` | Import + render `RoomImageSection` x4 | ✅ |

**No new files created.** Existing `components/room-image-section.tsx` is reused as-is.

## Verification

✅ **Build Verification**
- `npm run build` — Confirmed static export compiles successfully with new fields
- No TypeScript errors
- All 8 pages generated successfully

## Google Sheets Integration

To use the room-specific images from Google Sheets, add the following columns to your spreadsheet:
- `kitchenImages` - Comma-separated image URLs
- `bathroomImages` - Comma-separated image URLs
- `officeImages` - Comma-separated image URLs
- `livingRoomImages` - Comma-separated image URLs

Example format:
```
https://image1.jpg,https://image2.jpg,https://image3.jpg
```

The component will automatically:
- Display images in a 2-column grid
- Hide sections with no images
- Provide a lightbox with navigation for viewing images
