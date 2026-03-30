import { createContentLoader } from 'vitepress'

export default createContentLoader([
  'exchange-rate/*.md',
  'ai-news/*.md',
  'skill-scout/*.md',
], {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData) {
    const sections = {
      'exchange-rate': [],
      'ai-news': [],
      'skill-scout': [],
    }
    for (const page of rawData) {
      const url = page.url  // e.g. /exchange-rate/2026-03-31-morning
      if (url.endsWith('/') || url.match(/\/index$/)) continue
      const parts = url.replace(/^\//, '').split('/')
      const section = parts[0]
      const slug = parts[1].replace(/\.html$/, '')
      if (sections[section] !== undefined) {
        sections[section].push({ slug, url })
      }
    }
    // Sort each section newest-first
    for (const key of Object.keys(sections)) {
      sections[key].sort((a, b) => b.slug.localeCompare(a.slug))
    }
    return sections
  }
})
