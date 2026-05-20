# Aspireya Enquiry Form

Production-ready responsive enquiry form for Aspireya Career Counselling.

## What is included

- Dynamic enquiry type selector for Institute, College, and Corporate.
- Only the selected form renders at one time.
- Accordion sections with smooth open and close behavior.
- Required field validation, email and phone validation, loading state, success popup, reset button, and progress indicator.
- Draft persistence with `localStorage`, so selected type and entered values survive refresh or reopening the browser on the same device.
- Deployable static frontend plus serverless API examples for Vercel and Netlify.
- Supabase-backed persistent database storage for submitted enquiries.

## Files

- `index.html` - page structure and config.
- `styles.css` - responsive premium UI styling.
- `script.js` - conditional forms, accordion logic, validation, draft saving, and submission.
- `api/enquiries.js` - Vercel serverless endpoint.
- `netlify/functions/enquiries.js` - Netlify serverless endpoint.
- `database.sql` - Supabase table setup.
- `netlify.toml` and `vercel.json` - deployment routing.

## Database setup

1. Create a Supabase project.
2. Run `database.sql` in the Supabase SQL editor.
3. Add these environment variables in Vercel or Netlify:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ALLOWED_ORIGIN` for cross-domain deployments, for example `https://yourdomain.com`

Use the service role key only in serverless environment variables. Do not expose it in frontend code.

## Deploy options

### Vercel

Deploy the folder to Vercel. The frontend will submit to `/api/enquiries`, handled by `api/enquiries.js`.

### Netlify

Deploy the folder to Netlify. `netlify.toml` routes `/api/enquiries` to the Netlify Function automatically.

### GitHub Pages, Firebase Hosting, or static hosting

Static hosts do not run backend functions by themselves. Keep the frontend on GitHub Pages or Firebase Hosting, and point `submissionEndpoint` in `index.html` to a deployed backend endpoint, such as:

```html
<script>
  window.ASPIREYA_CONFIG = {
    submissionEndpoint: "https://your-api-domain.com/api/enquiries"
  };
</script>
```

The form UI, conditional rendering, accordions, validations, and draft persistence work on any static host. Persistent submission storage requires a live backend endpoint connected to a database.
