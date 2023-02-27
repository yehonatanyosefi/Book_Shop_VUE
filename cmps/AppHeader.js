export default {
    template: `
        <header class="app full app-header">
            <div class="app-header-content">

                <RouterLink to="/" class="animate__animated animate__slideInLeft logo">Miss Books</RouterLink>
                <nav>
                    <RouterLink to="/" class="animate__animated animate__zoomIn">Home</RouterLink> |
                    <RouterLink to="/book" class="animate__animated animate__zoomIn">Books</RouterLink> |
                    <RouterLink to="/about" class="animate__animated animate__zoomIn">About</RouterLink>
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