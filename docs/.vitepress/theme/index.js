import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HomeCards from './HomeCards.vue'
import DocLayout from './DocLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: DocLayout,
  enhanceApp({ app }) {
    app.component('HomeCards', HomeCards)
  },
}
