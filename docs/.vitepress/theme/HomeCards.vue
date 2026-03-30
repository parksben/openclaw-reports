<script setup>
import { data } from '../../pages.data.js'

const { sections: pages, sectionMeta } = data

// 硬编码的兜底默认值（已知板块）
const BUILTIN_META = {
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

// 颜色池（新板块自动分配）
const COLOR_POOL = [
  { color: '#059669', colorSoft: 'rgba(5,150,105,0.08)' },
  { color: '#dc2626', colorSoft: 'rgba(220,38,38,0.08)' },
  { color: '#0891b2', colorSoft: 'rgba(8,145,178,0.08)' },
  { color: '#9333ea', colorSoft: 'rgba(147,51,234,0.08)' },
  { color: '#be185d', colorSoft: 'rgba(190,24,93,0.08)' },
]

const KNOWN_ORDER = ['exchange-rate', 'ai-news', 'skill-scout']

const sections = (() => {
  const known = KNOWN_ORDER.filter(k => pages[k])
  const unknown = Object.keys(pages).filter(k => !KNOWN_ORDER.includes(k)).sort()
  return [...known, ...unknown].map((key, i) => {
    const builtin = BUILTIN_META[key] || {}
    // agent 写入的 meta 优先级最高，其次 builtin，最后自动生成
    const agentMeta = sectionMeta?.[key] || {}
    const fallbackColor = COLOR_POOL[i % COLOR_POOL.length]
    const color = agentMeta.color || builtin.color || fallbackColor.color
    // 根据 color 自动生成 colorSoft
    const colorSoft = builtin.colorSoft
      || (agentMeta.color ? hexToSoft(agentMeta.color) : fallbackColor.colorSoft)

    return {
      key,
      icon:  agentMeta.icon  || builtin.icon  || '📄',
      title: agentMeta.title || builtin.title || key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      desc:  agentMeta.desc  || builtin.desc  || 'AI Agent 自动推送',
      color,
      colorSoft,
    }
  })
})()

function hexToSoft(hex) {
  // #rrggbb → rgba(r,g,b,0.08)
  const r = parseInt(hex.slice(1,3), 16)
  const g = parseInt(hex.slice(3,5), 16)
  const b = parseInt(hex.slice(5,7), 16)
  return `rgba(${r},${g},${b},0.08)`
}

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
