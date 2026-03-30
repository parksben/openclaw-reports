<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, useRouter } from 'vitepress'
import { ref, onMounted, onUnmounted, watch } from 'vue'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()
const router = useRouter()

// ---- 阅读进度条 ----
const progress = ref(0)

function calcProgress() {
  const el = document.documentElement
  const scrolled = el.scrollTop || document.body.scrollTop
  const total = el.scrollHeight - el.clientHeight
  progress.value = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0
}

onMounted(() => {
  window.addEventListener('scroll', calcProgress, { passive: true })
  calcProgress()
})
onUnmounted(() => {
  window.removeEventListener('scroll', calcProgress)
})

// 路由切换时重置
watch(() => router.route.path, () => {
  progress.value = 0
})

// ---- 文章署名 ----
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

function displayTime(fm, lastUpdated) {
  if (fm.createdAt) return fm.createdAt
  if (lastUpdated) return formatTime(lastUpdated)
  return null
}
</script>

<template>
  <!-- 阅读进度条：fixed 全宽，始终在最顶层 -->
  <div class="oc-progress-bar">
    <div class="oc-progress-fill" :style="{ width: progress + '%' }" />
  </div>

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
