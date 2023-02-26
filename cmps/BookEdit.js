import { bookService } from "../services/book.service.js"

export default {
    template: `
        <section class="book-edit">
            <form @submit.prevent="save">
                <h2>Add a book</h2>
                <input type="text" v-model="book.title" placeholder="Title">
                <input type="number" v-model.number="book.listPrice.amount">
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            book: bookService.getEmptyBook()
        }
    },
    methods: {
        save() {
            bookService.save(this.book)
                .then(savedBook => {
                    this.book = bookService.getEmptyBook()
                    this.$emit('book-saved', savedBook)
                })
        }
    }
}