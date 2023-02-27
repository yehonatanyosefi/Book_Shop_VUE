import BookPreview from './BookPreview.js'

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id" class="book-card">
                    <RouterLink :to="'/book/'+book.id" class="book">
                        <bookPreview :book="book"/>
                    </RouterLink>
                    <!-- <RouterLink :to="'/book/review/'+book.id">Review</RouterLink> -->
                    <button @click="remove(book.id)" class="delete-btn">x</button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId)
        },
    },
    components: {
        BookPreview,
    }
}