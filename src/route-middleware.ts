import { getCollection } from 'astro:content';
import { defineRouteMiddleware, type StarlightRouteData } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware(async (context) => {
  const route = context.locals.starlightRoute;
  const data = route.entry.data;
  if (!data.moduleId) return;
  const entries = (await getCollection('docs')).filter(({ data: item }) =>
    item.moduleId === data.moduleId && item.channel === data.channel && item.version === data.version && item.audience === data.audience
  ).sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
  const links: StarlightRouteData['pagination']['next'][] = entries.map((entry) => ({
    type: 'link', label: entry.data.title, href: `/${entry.id.replace(/\/index$/, '')}/`,
    isCurrent: entry.id === route.id, badge: undefined, attrs: {},
  }));
  const navigation = links.filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const section = (label: string, items: typeof navigation): StarlightRouteData['sidebar'][number] => ({
    type: 'group', label, entries: items, collapsed: !['Guides', 'Integration guides'].includes(label) && !items.some((item) => item.isCurrent), badge: undefined,
  });
  const overview = navigation.filter((item) => /\/(user|dev)\/$|\/(getting-started|quick-start)\/$/.test(item.href));
  const guides = navigation.filter((item) => !overview.includes(item) && !/\/(api-reference|classes|interfaces|type-aliases|functions|variables|enumerations)\//.test(item.href));
  const reference = navigation.filter((item) => !overview.includes(item) && !guides.includes(item));
  route.sidebar = [...overview];
  if (guides.length) route.sidebar.push(section(data.audience === 'dev' ? 'Integration guides' : 'Guides', guides));
  if (reference.length) {
    const index = reference.filter((item) => /\/api-reference\/$/.test(item.href));
    route.sidebar.push(...(index.length ? index : reference));
  }
  const current = links.findIndex((entry) => entry?.isCurrent);
  route.pagination = { prev: links[current - 1], next: links[current + 1] };
});
