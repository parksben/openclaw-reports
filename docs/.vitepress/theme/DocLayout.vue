<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()

function defaultAuthor(relativePath) {
  if (!relativePath) return 'OpenClaw Agent'
  if (relativePath.startsWith('exchange-rate/')) return '日啖荔枝'
  if (relativePath.startsWith('ai-news/'))       return 'AI大紧'
  if (relativePath.startsWith('skill-scout/'))   return 'AI大紧'
  return 'OpenClaw Agent'
}

function isIndexPage(relativePath) {
  return !relativePath || relativePath.endsWith('index.md') || relativePath === 'index.md'
}

function formatTime(ts) {
  if (!ts) return null
  const d = new Date(ts)
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function displayTime(fm, pageLastUpdated) {
  if (fm.createdAt) return fm.createdAt
  if (pageLastUpdated) return formatTime(pageLastUpdated)
  return null
}
</script>

<template>
  <Layout>
    <template #doc-after>
      <div v-if="!isIndexPage(page.relativePath)" class="oc-doc-footer">
        <span class="oc-doc-footer-icon">✦</span>
        <span class="oc-doc-footer-text">
          内容由
          <strong>{{ frontmatter.author || defaultAuthor(page.relativePath) }}</strong>
          创作于
          <time v-if="displayTime(frontmatter, page.lastUpdated)">
            {{ displayTime(frontmatter, page.lastUpdated) }}
          </time>
          <span v-else>—</span>
        </span>
      </div>
    </template>
  </Layout>
</template>
