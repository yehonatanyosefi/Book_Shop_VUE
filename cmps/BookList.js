import BookPreview from './BookPreview.js'

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id" @click="showDetails(book.id)" class="book-card">
                    <bookPreview :book="book"/>
                    <button @click.stop="remove(book.id)" class="delete-btn">x</button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId)
        },
        showDetails(bookId) {
            this.$emit('show-details', bookId)
        },
    },
    components: {
        BookPreview,
    }
}