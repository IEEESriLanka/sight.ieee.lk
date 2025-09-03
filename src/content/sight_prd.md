# PRD: IEEE Sri Lanka Section SIGHT — Public Website (Static)

## Goal

Replace sight.ieee.lk with a static, data-driven site that showcases humanitarian impact, centralizes initiatives, and drives volunteers and partners to act. Align copy with IEEE SIGHT and HTB language. ([IEEE SIGHT][1], [IEEE Humanitarian Technologies][2])

## Users

* Donors and partners.
* Volunteers and IEEE OUs.
* Media and public.

## Success metrics

* ≥30% growth in “Volunteer” and “Partner with us” form submissions in 6 months.
* ≥20% growth in unique visitors and ≥40% on initiatives pageviews.
* ≥2:00 min median time on site, ≤40% bounce on homepage.
* At least 1 new grant or MOU sourced via the site per quarter.

---

## Information architecture

* `/` Home
* `/initiatives` All initiatives + news
* `/initiatives/[slug]` Initiative detail (also open from modal)
* `/needs` Community needs
* `/volunteers` Year switcher (2025 default)
* `/support` Ways to support
* `/about` Program overview and affiliations
* `/partners` Supporters list
* `/data/*` Public JSON

---

## Page specs

### Home

1. **Hero**: headline + metrics on a subtle background carousel.

* Headline seed: “Leveraging technology for serving the underserved.”&#x20;
* Short explainer seed: “IEEE Sri Lanka Section SIGHT is part of a global network… partnering with local communities.”&#x20;
* Metrics component reads from `site-stats.json` (initiatives, lives\_impacted, funds\_mobilized, districts).

2. **Focus causes**: cards for SDG 4 Quality Education, SDG 6 Clean Water and Sanitation, SDG 13 Climate Action.
3. **Impact recognized**: award badges and copy.

* “2024 SIGHT Group of the Year: IEEE Sri Lanka Section SIGHT.” Link and blurb per IEEE SIGHT post. ([IEEE SIGHT][3])
* “Best Affinity Group Project Award, IEEE Sri Lanka Section Awards 2022” + one-sentence summary.&#x20;

4. **Recent initiatives**: 3–6 cards sorted by date desc + “See more” → `/initiatives`.

### Initiatives

* Global search + filters: year, district, OU organizer, supporters, SDGs, type = {project, event, news}.
* Grid: 3 cards per row desktop.
* Card minimal set: cover image, title, date, tags (SDGs), district, quick stats.
* Click opens modal with full details; also a canonical page at `/initiatives/[slug]`.
* “News” items reuse same card UI for grants/awards posts.

### Initiative detail / modal

* Title, date, gallery, **Problem**, **Solution**, location, beneficiaries, investment (optional show only if present), duration, organizers (resolved from `ous.json`), supporters (resolved from `supporters.json`), related SDGs, “part\_of\_project” breadcrumbs if belongs to a series.
* Example copy seeds available for **Filter of Hope** and **Nenasa**; pull highlights: RO system at Sri Sumangala MV, Eppawala (June 2024) with beneficiary context; and Nenasa STEM workshops counts.  &#x20;

### Needs

* Card list of identified social needs. Fields: problem, suggested\_solution, estimated\_cost, location, sdgs\[], contacts, slug.

### Support

* Three stacked sections with alternating media/text:

  * **Donate to a cause** → external form.
  * **Volunteer as an individual** → form.
  * **Start/strengthen a SIGHT Group** (Student Branch or OU) → IEEE SIGHT membership info. ([IEEE SIGHT][4])

### Volunteers

* Year tabs: 2025 default; 2024, 2023, 2022 selectable.
* Card: image, name, role, affiliation, LinkedIn.
* Seed roles and names for a past roster available.&#x20;

### About

* What is IEEE SIGHT, HTB relationship, and local mandate. ([IEEE SIGHT][1], [IEEE Humanitarian Technologies][2])
* Short history of SIGHT/HTB for context. ([ETHW][5])

---

## Content seeds (reusable text)

* “Leveraging technology for serving the underserved.”&#x20;
* IEEE SIGHT program definition for context. ([IEEE SIGHT][1])
* 2024 activity summary bullets for projects and topics.&#x20;

---

## Data model (JSON in `/public/data/`)

### `initiatives.json`

```json
[
  {
    "slug": "filter-of-hope-phase-03-eppawala-2024",
    "type": "project",
    "title": "Filter of Hope — Phase 03",
    "date": "2024-06-14",
    "gallery": ["/images/foh3/1.jpg", "/images/foh3/2.jpg"],
    "problem": "CKDu and unsafe groundwater in Nabadewewa–Eppawala; lack of purification.",
    "solution": "Custom RO filter designed from lab water analysis; install + training; ongoing monitoring.",
    "location": {"district": "Anuradhapura", "place": "Sri Sumangala MV, Eppawala"},
    "beneficiaries": {"students": 650, "families": 750},
    "investment_usd": null,
    "duration": {"start": "2024-01-15", "end": "2024-06-14"},
    "organizers": ["ieee-sl-sight", "ias-sl-chapter"],
    "supporters": ["maheweli-chemicals"],
    "sdgs": [6,3],
    "part_of_project": "filter-of-hope",
    "links": [{"label": "Opening ceremony notes", "url": "/docs/foh3.pdf"}]
  }
]
```

Seeds backed by provided materials. &#x20;

### `projects.json`  *(series registry)*

```json
[
  {
    "id": "filter-of-hope",
    "name": "Filter of Hope",
    "description": "Series providing RO water systems to CKDu-affected areas.",
    "sdgs": [6,3]
  },
  {
    "id": "nenasa",
    "name": "Nenasa",
    "description": "STEM education workshop series for schools.",
    "sdgs": [4,5,9]
  }
]
```

### `ous.json`  *(organizing IEEE units)*

```json
[
  {"id": "ieee-sl-sight", "name": "IEEE Sri Lanka Section SIGHT", "type": "Section SIGHT"},
  {"id": "ias-sl-chapter", "name": "IEEE IAS Sri Lanka Chapter", "type": "Society Chapter"}
]
```

### `supporters.json`

```json
[
  {"id": "maheweli-chemicals", "name": "Maheweli Chemicals Kent Minerals RO (Pvt) Ltd", "url": ""}
]
```

### `news.json`  *(same card UI)*

```json
[
  {
    "slug": "sight-group-of-the-year-2024",
    "type": "news",
    "title": "IEEE SIGHT Group of the Year 2024",
    "date": "2025-05-07",
    "summary": "IEEE Sri Lanka Section SIGHT recognized as 2024 SIGHT Group of the Year.",
    "source_url": "https://sight.ieee.org/2025/05/congratulations-to-the-2024-ieee-sight-groups-of-the-year/",
    "tags": ["award"]
  }
]
```

Source for award. ([IEEE SIGHT][3])

### `needs.json`

```json
[
  {
    "slug": "ckdu-village-safe-water-eppawala",
    "problem": "Unsafe drinking water and CKDu risk in Eppawala area.",
    "suggested_solution": "Install RO system sized for school + village; include maintenance training.",
    "estimated_cost_usd": 8000,
    "location": {"district": "Anuradhapura"},
    "sdgs": [6,3],
    "contacts": [{"name": "IEEE SL SIGHT", "email": "contact@sight.ieee.lk"}]
  }
]
```

### `volunteers/2024.json`

```json
{
  "year": 2024,
  "executive": [
    {"name": "Saditha Dissanayake", "role": "Chair", "affiliation": "SLIIT", "linkedin": ""},
    {"name": "Sheril Nilanka", "role": "Immediate Past Chair", "affiliation": "OUSL", "linkedin": ""},
    {"name": "Mahsoom Raseen", "role": "Vice Chair", "affiliation": "APU", "linkedin": ""}
  ],
  "committee": [
    {"name": "Gayathri Bandara", "role": "Assistant Secretary", "affiliation": "UOJ"},
    {"name": "Iroshan Rathnayake", "role": "Treasurer", "affiliation": "OUSL"}
  ]
}
```

Seeds mapped from prior roster.&#x20;

### `site-stats.json`

```json
{"initiatives": 6, "lives_impacted": 4700, "funds_mobilized_usd": 125000, "districts": 8}
```

Values are placeholders to be updated.

---

## UX and components

* Global header/footer; IEEE links.
* Hero with image carousel behind headline and metrics. Smooth 5–8s auto-advance, 30% overlay to preserve text legibility.
* Tag chips for SDGs.
* Filters: multi-select, client-side.
* Modal with URL change (`/initiatives/[slug]`) for deep-linking.
* Year tabs on `/volunteers` with lazy load of `/data/volunteers/{year}.json`.

---

## Copy guidelines

* Keep IEEE SIGHT and HTB terminology: “partner with underserved communities,” “sustainable development.” ([IEEE SIGHT][1])
* Use existing summaries for **Filter of Hope** and **Nenasa**; examples include Eppawala RO install details and workshop counts. &#x20;

---

## Tech

* Static front end: React + Vite or Next.js static export.
* Host: GitHub Pages.
* Data: versioned JSON in `/public/data`.
* Image handling: WebP preferred; lazy-load.

### Routing

* Client router with static fallbacks for detail pages rendered at build time from JSON.

### Performance and accessibility

* CLS ≤ 0.1, LCP ≤ 2.5s, ALT text required.
* Keyboard modals, focus traps, aria labels for filters.

### SEO

* Per-page `<title>`, `<meta description>`.
* JSON-LD `BreadcrumbList` and `Article` for initiatives.
* Canonical URLs for `/initiatives/[slug]`.

### Analytics

* Privacy-preserving analytics. Track: pageviews, filter usage, outbound form clicks.

---

## Governance

* Content owners: IEEE SL SIGHT web team.
* Update path: PRs to `/data` repo.
* Quarterly data audit.

---

## Migration

* Import hero copy and about text from current site.&#x20;
* Import achievements note for 2022 award.&#x20;
* Import initiative narratives from packet for 2024–25.&#x20;

---

## Risks

* Data drift in JSON. Mitigate with schema validation in CI.
* Image licensing. Mitigate with contributor license checklist.

---

## Open content to finalize

* Confirm 2024–25 initiative counts and totals for hero metrics.
* Confirm beneficiary numbers for Filter of Hope and Nenasa before publishing derived tallies. Seeds exist but verify.&#x20;

---

## References

* IEEE SIGHT program overview and language. ([IEEE SIGHT][1])
* 2024 SIGHT Group of the Year announcement. ([IEEE SIGHT][3])
* Current SL SIGHT site text blocks for migration.&#x20;
* 2022 Section award note.&#x20;
* Filter of Hope Eppawala details.&#x20;

If you want, next step is a wireframe pack and a starter repo with the JSON schemas scaffolded.

[1]: https://sight.ieee.org/about/?utm_source=chatgpt.com "Special Interest Group on Humanitarian Technology"
[2]: https://ieeeht.org/?utm_source=chatgpt.com "IEEE Humanitarian Technologies: Home"
[3]: https://sight.ieee.org/2025/05/congratulations-to-the-2024-ieee-sight-groups-of-the-year/?utm_source=chatgpt.com "Congratulations to the 2024 IEEE SIGHT Groups of the Year!"
[4]: https://sight.ieee.org/?utm_source=chatgpt.com "IEEE SIGHT | Special Interest Group onHumanitarian ..."
[5]: https://ethw.org/IEEE_Humanitarian_Technology_Board_History?utm_source=chatgpt.com "IEEE Humanitarian Technology Board History"
