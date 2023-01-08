/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
// import { loadFonts } from './webfontloader'
import quasar from './quasar'

// Styles
import '@/styles/style.sass'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
    app.use(quasar, {
        plugins: {}, // import Quasar plugins and add here
    })
}
