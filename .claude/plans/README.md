# Project Plans

This folder (`.claude/plans`) contains implementation plans for features and changes to the architectural portfolio site.

## Plan Workflow

### 1. Creating a New Plan
When starting a new feature or significant change:
- Enter plan mode to research and design the implementation
- Create a new markdown file in this folder with a descriptive name
- Include the following sections:
  - **Status** - Track progress (Planning, In Progress, Completed, On Hold)
  - **Context** - What problem we're solving and why
  - **TODOs** - Checkbox list of all tasks to complete
  - **Implementation Details** - Specific changes for each step
  - **Files Modified** - Table of affected files
  - **Verification** - How to test the changes

### 2. During Implementation
- Update TODO checkboxes as tasks are completed: `- [ ]` → `- [x]`
- Add notes about any deviations from the original plan
- Document any issues encountered and their solutions

### 3. After Completion
- Mark status as ✅ Completed
- Add completion date
- Update all TODOs to checked
- Add verification results

## Plan Template

```markdown
# Plan: [Feature Name]

**Status:** 🔄 In Progress
**Created:** YYYY-MM-DD
**Completed:** -

## Context

[Describe what we're building and why]

## TODOs

- [ ] 1. First task
- [ ] 2. Second task
- [ ] 3. Third task

## Implementation Details

### 1. First Task
[Detailed description, code snippets, file locations]

### 2. Second Task
[Detailed description, code snippets, file locations]

## Files Modified

| File | Change | Status |
|------|--------|--------|
| `path/to/file.ts` | Description | ⏳ |

## Verification

- [ ] Build passes
- [ ] Tests pass
- [ ] Manual testing completed

## Notes

[Any additional context, learnings, or future improvements]
```

## All Plans

### Completed
- [room-specific-images.md](./room-specific-images.md) - ✅ Completed (2026-02-06) - Add room-specific image sections to project detail pages

### Planned (Not Started)
- [add-analytics-tracking.md](./add-analytics-tracking.md) - 📋 Planned
- [add-contact-form-submission.md](./add-contact-form-submission.md) - 📋 Planned
- [add-project-filtering.md](./add-project-filtering.md) - 📋 Planned
- [improve-sheets-error-handling.md](./improve-sheets-error-handling.md) - 📋 Planned
- [migrate-to-isr.md](./migrate-to-isr.md) - 📋 Planned
- [optimize-images-performance.md](./optimize-images-performance.md) - 📋 Planned

## Plan Status Legend

- 📋 **Planning** - Researching and designing the implementation
- 🔄 **In Progress** - Actively implementing
- ✅ **Completed** - Finished and verified
- ⏸️ **On Hold** - Paused, waiting for dependencies or decisions
- ❌ **Cancelled** - No longer needed

## Guidelines

**Make the plan extremely concise. Sacrifice grammar for the sake of concision.**
