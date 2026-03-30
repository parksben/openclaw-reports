<script setup>
import { data as pages } from '../../pages.data.js'

// 已知板块的元数据（icon / 标题 / 描述 / 颜色）
// 新板块会自动出现，使用默认样式
const SECTION_META = {
  'exchange-rate': {
    icon: '💱', title: '汇率播报',
    desc: '每日三次 · 08:00 / 12:00 / 20:00',
    color: '#2563eb', colorSoft: 'rgba(37,99,235,0.08)',
  },
  'ai-news': {
    icon: '🤖', title: 'AI 每日简报',
    desc: '精选热点 · 12:30 推送',
    color: '#7c3aed', colorSoft: 'rgba(124,58,237,0.08)',
  },
  'skill-scout': {
    icon: '⭐', title: 'Skill 推荐',
    desc: 'ClawHub 精选 · 12:00 推送',
    color: '#d97706', colorSoft: 'rgba(217,119,6,0.08)',
  },
}

// 默认颜色池（新板块自动分配）
const COLOR_POOL = [
  { color: '#059669', colorSoft: 'rgba(5,150,105,0.08)' },
  { color: '#dc2626', colorSoft: 'rgba(220,38,38,0.08)' },
  { color: '#0891b2', colorSoft: 'rgba(8,145,178,0.08)' },
  { color: '#9333ea', colorSoft: 'rgba(147,51,234,0.08)' },
]

// 固定显示顺序（已知板块在前）
const KNOWN_ORDER = ['exchange-rate', 'ai-news', 'skill-scout']

const sections = (() => {
  const known = KNOWN_ORDER.filter(k => pages[k])
  const unknown = Object.keys(pages).filter(k => !KNOWN_ORDER.includes(k)).sort()
  return [...known, ...unknown].map((key, i) => {
    const meta = SECTION_META[key]
    const fallback = COLOR_POOL[i % COLOR_POOL.length]
    return {
      key,
      icon: meta?.icon ?? '📄',
      title: meta?.title ?? key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      desc: meta?.desc ?? 'AI Agent 自动推送',
      color: meta?.color ?? fallback.color,
      colorSoft: meta?.colorSoft ?? fallback.colorSoft,
    }
  })
})()

function formatSlug(slug) {
  return slug
    .replace(/-morning$/, '  ·  早间')
    .replace(/-noon$/, '  ·  午间')
    .replace(/-evening$/, '  ·  晚间')
}
</script>

<template>
  <div class="oc-home">
    <header class="oc-hero">
      <div class="oc-hero-badge">AI-Powered Reports</div>
      <h1 class="oc-hero-title">OpenClaw 每日报告</h1>
      <p class="oc-hero-sub">由 AI Agent 自动整理 · 汇率行情、科技资讯、实用工具，每天准时送达</p>
      <div class="oc-hero-stats">
        <span>📅 每日更新</span>
        <span>🤖 AI 自动生成</span>
        <span>🔗 全链接可点</span>
      </div>
    </header>

    <div class="oc-sections">
      <div v-for="section in sections" :key="section.key" class="oc-section">
        <div class="oc-section-head" :style="{ '--sc': section.color, '--sc-soft': section.colorSoft }">
          <span class="oc-section-icon">{{ section.icon }}</span>
          <div class="oc-section-meta">
            <span class="oc-section-title">{{ section.title }}</span>
            <span class="oc-section-desc">{{ section.desc }}</span>
          </div>
          <span class="oc-section-count">{{ pages[section.key]?.length || 0 }} 篇</span>
        </div>

        <div class="oc-entries">
          <template v-if="pages[section.key]?.length">
            <a
              v-for="(entry, i) in pages[section.key]"
              :key="entry.slug"
              :href="entry.url"
              class="oc-entry"
              :class="{ 'oc-entry-latest': i === 0 }"
              :style="{ '--sc': section.color, '--sc-soft': section.colorSoft }"
            >
              <span v-if="i === 0" class="oc-entry-new">最新</span>
              <span class="oc-entry-slug">{{ formatSlug(entry.slug) }}</span>
              <span class="oc-entry-arrow">→</span>
            </a>
          </template>
          <p v-else class="oc-empty">暂无内容，等待 Agent 推送...</p>
        </div>
      </div>
    </div>

    <footer class="oc-home-footer">
      <span>Powered by <strong>OpenClaw AI Agents</strong></span>
    </footer>
  </div>
</template>
