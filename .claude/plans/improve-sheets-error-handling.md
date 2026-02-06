# Improve Google Sheets Error Handling

## Problem
- Silent failures on Sheets API errors
- No distinction between config vs network errors
- Missing data validation on sheet rows
- Cache invalidation issues

## Files
- `lib/sheets.ts` (main changes)
- `lib/projects-data.ts` (error propagation)

## Steps
1. Add error types enum (CONFIG, NETWORK, AUTH, VALIDATION)
2. Validate env vars throw on missing
3. Add Zod schema for ProjectFromSheets validation
4. Wrap JWT creation in try-catch, throw specific error type
5. Validate row data before mapping, skip invalid rows with warning
6. Add cache invalidation method, expose for manual refresh
7. Return typed Result<ProjectFromSheets[], ErrorType>
8. Update getAllProjects to handle typed errors, log appropriate message

## Validation Schema
```typescript
const SheetProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  beforeImage: z.string().url(),
  afterImage: z.string().url(),
  timelineImages: z.string(),
  description: z.string()
});
```

## Testing
- Test with missing env vars (should throw)
- Test with malformed PEM key (should throw AUTH error)
- Test with invalid sheet data (should skip/warn)
- Test cache expiry after 5min
- Test manual cache invalidation
