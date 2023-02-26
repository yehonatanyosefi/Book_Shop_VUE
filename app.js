const { createApp } = Vue

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'

import BookIndex from './cmps/BookIndex.js'

import HomePage from './pages/HomePage.js'
import AboutPage from './pages/AboutPage.js'

const options = {
    template: `
        <section class="container">
            <AppHeader @setRoute="route = $event"/>
            <main class="router-view">
                <HomePage v-if="route === 'HomePage'"/>
                <bookIndex v-if="route === 'BookIndex'"/>
                <AboutPage v-if="route === 'AboutPage'"/>
            </main>
            <AppFooter />
        </section>
    `,
    data() {
        return {
            route: 'HomePage',
        }
    },
    components: {
        AppHeader,
        AppFooter,
        BookIndex,
        HomePage,
        AboutPage,
    }
}
const app = createApp(options)
app.mount('#app')
