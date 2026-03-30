import { createContentLoader } from 'vitepress'
import path from 'path'

export default createContentLoader('*/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData) {
    // 排除的顶层目录（非内容板块）
    const EXCLUDE = new Set(['.vitepress', 'public', 'node_modules'])

    const sections = {}

    for (const page of rawData) {
      const url = page.url  // e.g. /exchange-rate/2026-03-31-morning.html
      const parts = url.replace(/^\//, '').split('/')
      if (parts.length < 2) continue

      const section = parts[0]
      const slug = parts[1].replace(/\.html$/, '')

      if (EXCLUDE.has(section)) continue
      if (!slug || slug === 'index') continue

      if (!sections[section]) sections[section] = []
      sections[section].push({ slug, url: url.replace(/\.html$/, '') })
    }

    // Sort each section newest-first
    for (const key of Object.keys(sections)) {
      sections[key].sort((a, b) => b.slug.localeCompare(a.slug))
    }

    return sections
  }
})
