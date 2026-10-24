import { getCollection, type CollectionEntry } from 'astro:content';

// Drafts are visible in `astro dev` (with a "Draft" label) and never in production builds
export function isVisible(entry: { data: { draft: boolean } }): boolean {
  return import.meta.env.DEV || !entry.data.draft;
}

// Visible projects sorted by `order` ascending. Throws if two published projects share an `order`
export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects', isVisible);

  const seen = new Map<number, string>();
  for (const project of projects) {
    if (project.data.draft) continue;
    const clash = seen.get(project.data.order);
    if (clash) {
      throw new Error(
        `Projects "${clash}" and "${project.id}" both have order ${project.data.order}. Published projects need unique order values.`,
      );
    }
    seen.set(project.data.order, project.id);
  }

  return projects.sort((a, b) => a.data.order - b.data.order);
}

// Visible log entries, newest first. Same-day entries fall back to id descending
export async function getLogEntries(): Promise<CollectionEntry<'log'>[]> {
  const entries = await getCollection('log', isVisible);
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || b.id.localeCompare(a.id));
}

export async function getLogForProject(projectId: string): Promise<CollectionEntry<'log'>[]> {
  const entries = await getLogEntries();
  return entries.filter((entry) => entry.data.project.id === projectId);
}

// UTC so dates don't render a day early in US time zones
const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}
