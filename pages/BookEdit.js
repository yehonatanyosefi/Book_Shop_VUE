import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

export default {
    template: `
        <section class="book-edit">
            <form @submit.prevent="save">
                <h2>Edit book</h2>
                <input type="text" v-model="book.title" placeholder="Title">
                <input type="number" v-model.number="book.listPrice.amount">
                <button>Save <i class="fa-solid fa-floppy-disk"></i></button>
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
                    showSuccessMsg('Book saved')
                    this.$router.push('/book')
                })
                .catch(err => {
                    showErrorMsg('Book save failed')
                })
        }
    },
    created() {
        const { bookId } = this.$route.params
        if (bookId) {
            bookService.get(bookId)
                .then(book => this.book = book)
        }
    },
}