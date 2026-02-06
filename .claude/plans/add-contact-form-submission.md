# Add Functional Contact Form

## Current State
- `app/contact/page.tsx` displays static info only
- No form for inquiries

## Goal
Add contact form with validation, submission to email/Sheets

## Files
- `app/contact/page.tsx` (add form UI)
- `components/contact-form.tsx` (new client component)
- `app/api/contact/route.ts` (new API route)
- `lib/send-email.ts` (new email helper)

## Form Fields
- Name (required)
- Email (required, validated)
- Phone (optional)
- Project Type (dropdown: Residential, Commercial, Design)
- Message (required, textarea)

## Implementation
1. Create ContactForm component
   - Use react-hook-form (already installed)
   - Zod schema validation
   - Toast notifications on success/error
   - Loading state during submit
2. Create POST /api/contact route
   - Validate body with Zod
   - Send email via Resend/SendGrid/nodemailer
   - Optionally write to Sheets for CRM
   - Rate limit: 5 req/hour per IP
3. Send email helper
   - Template with inquiry details
   - Send to configured recipient email
   - Auto-reply confirmation to user

## Schema
```typescript
const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  projectType: z.enum(['Residential', 'Commercial', 'Design']),
  message: z.string().min(10)
});
```

## Env Vars
- `CONTACT_EMAIL` (recipient)
- `RESEND_API_KEY` or similar

## Testing
- Submit valid form, verify email received
- Test validation errors display
- Test rate limiting works
- Test loading/success states
