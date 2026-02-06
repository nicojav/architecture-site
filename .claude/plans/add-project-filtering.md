# Add Project Filtering/Search

## Goal
Filter projects by category, tags, search term on /projects page

## Files
- `app/projects/page.tsx` (add search UI + filtering logic)
- `components/project-filters.tsx` (new client component)
- `lib/projects-data.ts` (add filterProjects helper)

## UI Components
1. Search input (filters title/description)
2. Category dropdown (Residential, Commercial, All)
3. Tag chips (clickable, multi-select)
4. Clear filters button

## Implementation
1. Create ProjectFilters client component
   - State: searchTerm, selectedCategories, selectedTags
   - Debounced search (300ms)
   - Emit onChange with filter state
2. Update ProjectsPage
   - Convert to client component
   - Fetch projects on mount
   - Apply filters locally (fast, no re-fetch)
   - Display "No results" state
3. Add filterProjects in lib
   ```typescript
   filterProjects(projects, { search, categories, tags })
   ```
   - Case-insensitive search on title/description
   - AND logic for category, OR for tags

## Layout
```
[Search Input              ] [Category ▼]
[#tag1] [#tag2] [#tag3] [Clear]
[Project Grid...]
```

## Testing
- Filter by category shows correct projects
- Search term filters title + description
- Multiple tags use OR logic
- Clear resets all filters
- URL params persist filters (optional)
