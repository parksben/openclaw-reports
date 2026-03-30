<script setup>
import { ref, computed } from 'vue'
import { data } from '../../pages.data.js'

const { sections: pages, sectionMeta } = data

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

const COLOR_POOL = [
  { color: '#059669', colorSoft: 'rgba(5,150,105,0.08)' },
  { color: '#dc2626', colorSoft: 'rgba(220,38,38,0.08)' },
  { color: '#0891b2', colorSoft: 'rgba(8,145,178,0.08)' },
  { color: '#9333ea', colorSoft: 'rgba(147,51,234,0.08)' },
]

const KNOWN_ORDER = ['exchange-rate', 'ai-news', 'skill-scout']

function hexToSoft(hex) {
  const r = parseInt(hex.slice(1,3), 16)
  const g = parseInt(hex.slice(3,5), 16)
  const b = parseInt(hex.slice(5,7), 16)
  return `rgba(${r},${g},${b},0.08)`
}

const tabs = (() => {
  const known = KNOWN_ORDER.filter(k => pages[k])
  const unknown = Object.keys(pages).filter(k => !KNOWN_ORDER.includes(k)).sort()
  return [...known, ...unknown].map((key, i) => {
    const builtin = BUILTIN_META[key] || {}
    const agentMeta = sectionMeta?.[key] || {}
    const fallback = COLOR_POOL[i % COLOR_POOL.length]
    const color = agentMeta.color || builtin.color || fallback.color
    const colorSoft = builtin.colorSoft || (agentMeta.color ? hexToSoft(agentMeta.color) : fallback.colorSoft)
    return {
      key,
      icon:  agentMeta.icon  || builtin.icon  || '📄',
      title: agentMeta.title || builtin.title || key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      desc:  agentMeta.desc  || builtin.desc  || 'AI Agent 自动推送',
      color, colorSoft,
      entries: (pages[key] || []).map(e => e),
    }
  })
})()

const activeKey = ref(tabs[0]?.key || '')
const activeTab = computed(() => tabs.find(t => t.key === activeKey.value))

function formatSlug(slug) {
  return slug
    .replace(/-morning$/, '  ·  早间')
    .replace(/-noon$/, '  ·  午间')
    .replace(/-evening$/, '  ·  晚间')
}
</script>

<template>
  <div class="oc-home">

    <!-- Tab 导航 -->
    <div class="oc-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="oc-tab"
        :class="{ 'oc-tab-active': activeKey === tab.key }"
        :style="activeKey === tab.key ? { '--tc': tab.color, '--ts': tab.colorSoft } : {}"
        @click="activeKey = tab.key"
      >
        <span class="oc-tab-icon">{{ tab.icon }}</span>
        <span class="oc-tab-title">{{ tab.title }}</span>
        <span class="oc-tab-count">{{ tab.entries.length }}</span>
      </button>
    </div>

    <!-- 内容面板 -->
    <div v-if="activeTab" class="oc-panel">
      <div class="oc-panel-header" :style="{ '--tc': activeTab.color, '--ts': activeTab.colorSoft }">
        <span class="oc-panel-icon">{{ activeTab.icon }}</span>
        <div class="oc-panel-meta">
          <span class="oc-panel-title">{{ activeTab.title }}</span>
          <span class="oc-panel-desc">{{ activeTab.desc }}</span>
        </div>
        <span class="oc-panel-count">{{ activeTab.entries.length }} 篇</span>
      </div>

      <div class="oc-list">
        <template v-if="activeTab.entries.length">
          <a
            v-for="(entry, i) in activeTab.entries"
            :key="entry.slug"
            :href="entry.url"
            class="oc-item"
            :class="{ 'oc-item-latest': i === 0 }"
            :style="{ '--tc': activeTab.color, '--ts': activeTab.colorSoft }"
          >
            <span v-if="i === 0" class="oc-item-badge">最新</span>
            <span class="oc-item-slug">{{ formatSlug(entry.slug) }}</span>
            <span class="oc-item-arrow">→</span>
          </a>
        </template>
        <p v-else class="oc-empty">暂无内容，等待 Agent 推送...</p>
      </div>
    </div>

  </div>
</template>
