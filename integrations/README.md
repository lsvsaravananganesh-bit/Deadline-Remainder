# Deadline Guardian Integrations

Deadline Guardian uses source adapters so new opportunity providers can be added without changing the core deadline engine.

## Initial sources
- Unstop — opportunities and deadlines
- Devfolio — hackathons
- HackerEarth — coding competitions
- Internshala — internships
- GitHub — public developer activity

## Data flow
Source -> Adapter -> normalized opportunity -> Supabase -> user saves -> deadline -> reminder engine.

Only use official APIs, permitted public feeds, or data that the source explicitly makes available. Keep provider credentials server-side.

## Adapter contract
Each provider should normalize records to:
- external_id
- title
- description
- url
- category
- deadline_at
- eligibility
- mode
- location
- metadata

The frontend must never contain provider API secrets.
