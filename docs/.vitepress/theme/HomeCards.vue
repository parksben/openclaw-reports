<script setup>
import { data as pages } from '../../pages.data.js'

const sections = [
  {
    key: 'exchange-rate',
    icon: '💱',
    title: '汇率播报',
    desc: '每日三次 · 08:00 / 12:00 / 20:00',
    color: '#2563eb',
    colorSoft: 'rgba(37,99,235,0.08)',
  },
  {
    key: 'ai-news',
    icon: '🤖',
    title: 'AI 每日简报',
    desc: '精选热点 · 12:30 推送',
    color: '#7c3aed',
    colorSoft: 'rgba(124,58,237,0.08)',
  },
  {
    key: 'skill-scout',
    icon: '⭐',
    title: 'Skill 推荐',
    desc: 'ClawHub 精选 · 12:00 推送',
    color: '#d97706',
    colorSoft: 'rgba(217,119,6,0.08)',
  },
]

function formatSlug(slug) {
  return slug
    .replace(/-morning$/, '  ·  早间')
    .replace(/-noon$/, '  ·  午间')
    .replace(/-evening$/, '  ·  晚间')
    .replace(/^hk-listing-/, 'HK 上市 · ')
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
