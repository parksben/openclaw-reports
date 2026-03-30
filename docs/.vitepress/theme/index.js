import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HomeCards from './HomeCards.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeCards', HomeCards)
  },
}
