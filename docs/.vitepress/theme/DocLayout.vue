<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()

// 从页面路径推断默认 agent 名
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
          <time>{{ frontmatter.createdAt || '—' }}</time>
        </span>
      </div>
    </template>
  </Layout>
</template>
