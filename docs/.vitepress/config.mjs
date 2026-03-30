import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'OpenClaw Reports',
  description: 'AI Agent 自动生成的每日报告',
  base: '/',

  themeConfig: {
    // 无顶部导航、无侧边栏
    nav: [],
    sidebar: {},
    socialLinks: [],
    footer: false,
    lastUpdated: { text: '最后更新' },
    // 关闭搜索，保持简洁
    search: { provider: 'local' },
  },

  markdown: {
    lineNumbers: false,
  },
})
