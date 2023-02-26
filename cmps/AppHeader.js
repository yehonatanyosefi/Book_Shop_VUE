export default {
    template: `
        <header class="app-header full header-content">
                <h1 class="animate__animated animate__slideInLeft">Books</h1>
                <nav>
                    <a @click="setRoute('HomePage')" href="#" class="animate__animated animate__zoomIn">Home</a>
                    <a @click="setRoute('BookIndex')" href="#" class="animate__animated animate__zoomIn">Books</a>
                    <a @click="setRoute('AboutPage')" href="#" class="animate__animated animate__zoomIn">About</a>
                </nav>
        </header>
    `,
    methods: {
        setRoute(route) {
            this.$emit('set-route', route)
        }
    }
}