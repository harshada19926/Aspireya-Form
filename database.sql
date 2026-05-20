create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  enquiry_type text not null check (enquiry_type in ('institute', 'college', 'corporate')),
  source_url text,
  submitted_at timestamptz not null default now(),
  payload jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.enquiries enable row level security;

create policy "Service role can manage enquiries"
on public.enquiries
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
