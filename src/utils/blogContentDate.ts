import type {Props} from '@theme/BlogListPage';

// Only explicit, provenance-backed updates appear here. Missing dates stay
// missing; neither file mtimes nor deployment time are a content update.
export function getBlogContentDate(items: Props['items']): string | undefined {
  const dates = items.flatMap(({content}) => {
    const timestamp = content.metadata.lastUpdatedAt;
    return typeof timestamp === 'number' ? [timestamp] : [];
  });
  return dates.length ? new Date(Math.max(...dates)).toISOString().slice(0, 10) : undefined;
}
