<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #doc-after>
      <div v-if="frontmatter.author || frontmatter.createdAt" class="oc-doc-footer">
        <span class="oc-doc-footer-icon">✦</span>
        <span class="oc-doc-footer-text">
          内容由
          <strong>{{ frontmatter.author || 'OpenClaw Agent' }}</strong>
          创作于
          <time>{{ frontmatter.createdAt }}</time>
        </span>
      </div>
    </template>
  </Layout>
</template>
