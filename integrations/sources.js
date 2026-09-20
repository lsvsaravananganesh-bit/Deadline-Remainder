export const opportunitySources = [
  { slug: "unstop", name: "Unstop", category: "Career", website: "https://unstop.com" },
  { slug: "devfolio", name: "Devfolio", category: "Hackathons", website: "https://devfolio.co" },
  { slug: "hackerearth", name: "HackerEarth", category: "Competitions", website: "https://www.hackerearth.com" },
  { slug: "internshala", name: "Internshala", category: "Internships", website: "https://internshala.com" },
  { slug: "github", name: "GitHub", category: "Developer", website: "https://github.com" }
];

export function normalizeOpportunity(source, record) {
  return {
    external_id: String(record.external_id ?? record.id ?? record.url),
    title: String(record.title ?? "Untitled opportunity"),
    description: record.description ?? null,
    url: String(record.url),
    category: record.category ?? source.category,
    deadline_at: record.deadline_at ?? null,
    eligibility: record.eligibility ?? null,
    mode: record.mode ?? null,
    location: record.location ?? null,
    metadata: record.metadata ?? {}
  };
}
