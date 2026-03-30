import { createContentLoader } from 'vitepress'
import fs from 'fs'
import path from 'path'

// 读取 agent 写入的板块元数据（如有）
function loadSectionMeta(docsDir) {
  const metaPath = path.join(docsDir, 'sections.meta.json')
  try {
    return JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
  } catch {
    return {}
  }
}

export default createContentLoader('*/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData, ctx) {
    const EXCLUDE = new Set(['.vitepress', 'public', 'node_modules'])

    // 读取 sections.meta.json（相对 docs 目录）
    const docsDir = path.resolve(__dirname, '..')
    const sectionMeta = loadSectionMeta(docsDir)

    const sections = {}

    for (const page of rawData) {
      const url = page.url
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

    return { sections, sectionMeta }
  }
})
