import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'OpenClaw Reports',
  description: 'AI Agent 自动生成的每日报告',
  base: '/',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '💱 汇率播报', link: '/exchange-rate/' },
      { text: '🤖 AI 简报', link: '/ai-news/' },
      { text: '⭐ Skill 推荐', link: '/skill-scout/' },
    ],

    sidebar: {
      '/exchange-rate/': [{ text: '💱 汇率播报', items: [] }],
      '/ai-news/':       [{ text: '🤖 AI 简报',  items: [] }],
      '/skill-scout/':   [{ text: '⭐ Skill 推荐', items: [] }],
    },

    socialLinks: [],
    footer: { message: 'Powered by OpenClaw AI Agents' },
    lastUpdated: { text: '最后更新' },
  },

  markdown: {
    lineNumbers: false,
  },
})
