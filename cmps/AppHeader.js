export default {
    template: `
        <header class="app full app-header">
            <div class="app-header-content">

                <h1 @click="setRoute('HomePage')" class="animate__animated animate__slideInLeft logo" href="#">Books</h1>
                <nav>
                    <a @click="setRoute('HomePage')" href="#" class="animate__animated animate__zoomIn">Home</a>
                    <a @click="setRoute('BookIndex')" href="#" class="animate__animated animate__zoomIn">Books</a>
                    <a @click="setRoute('AboutPage')" href="#" class="animate__animated animate__zoomIn">About</a>
                </nav>
            </div>
        </header>
    `,
    methods: {
        setRoute(route) {
            this.$emit('set-route', route)
        }
    }
}