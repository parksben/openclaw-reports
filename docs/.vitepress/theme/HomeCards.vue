<script setup>
import { useData } from 'vitepress'

const sections = [
  {
    icon: '💱',
    title: '汇率播报',
    desc: '每日三次更新 · 08:00 / 12:00 / 20:00',
    path: '/exchange-rate/',
    pages: import.meta.glob('../exchange-rate/*.md', { eager: true }),
  },
  {
    icon: '🤖',
    title: 'AI 每日简报',
    desc: '每日精选 AI 圈热点 · 12:30 推送',
    path: '/ai-news/',
    pages: import.meta.glob('../ai-news/*.md', { eager: true }),
  },
  {
    icon: '⭐',
    title: 'Skill 推荐',
    desc: '每日 ClawHub 精选 · 12:00 推送',
    path: '/skill-scout/',
    pages: import.meta.glob('../skill-scout/*.md', { eager: true }),
  },
]

function getEntries(section) {
  return Object.entries(section.pages)
    .filter(([path]) => !path.endsWith('index.md'))
    .map(([path, mod]) => {
      // 从路径提取 slug，e.g. ../exchange-rate/2026-03-31-morning.md → 2026-03-31-morning
      const slug = path.replace(/^.*\//, '').replace(/\.md$/, '')
      // 尝试从 frontmatter.title 或 h1 获取标题
      const title = mod.frontmatter?.title || slug
      // 推算链接
      const link = section.path + slug
      return { slug, title, link }
    })
    .sort((a, b) => b.slug.localeCompare(a.slug)) // 最新的在前
}

function formatSlug(slug) {
  // 2026-03-31-morning → 2026-03-31 早间
  // 2026-03-31-noon    → 2026-03-31 午间
  // 2026-03-31-evening → 2026-03-31 晚间
  // 2026-03-31         → 2026-03-31
  return slug
    .replace(/-morning$/, ' · 早间')
    .replace(/-noon$/, ' · 午间')
    .replace(/-evening$/, ' · 晚间')
}
</script>

<template>
  <div class="oc-home">
    <div class="oc-home-title">
      <h1>📋 OpenClaw 每日报告</h1>
    </div>
    <p class="oc-home-subtitle">AI Agent 自动整理 · 汇率、新闻、Skill 推荐，每天准时推送</p>

    <div v-for="section in sections" :key="section.title" class="oc-section">
      <div class="oc-section-header">
        <span class="oc-section-icon">{{ section.icon }}</span>
        <span class="oc-section-title">{{ section.title }}</span>
        <span class="oc-section-desc">{{ section.desc }}</span>
      </div>

      <div class="oc-card-list">
        <template v-if="getEntries(section).length > 0">
          <a
            v-for="entry in getEntries(section)"
            :key="entry.slug"
            :href="entry.link"
            class="oc-card"
          >
            <span class="oc-card-date">{{ formatSlug(entry.slug) }}</span>
            <span class="oc-card-arrow">→</span>
          </a>
        </template>
        <p v-else class="oc-empty">暂无内容</p>
      </div>
    </div>
  </div>
</template>
