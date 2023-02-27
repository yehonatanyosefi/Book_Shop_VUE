import { bookService } from '../services/book.service.js'
import { eventBusService } from '../services/event-bus.service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'


export default {
    template: `
        <section class="book-index">
            <RouterLink to="/book/edit">Add Book</RouterLink>
            <BookFilter @filter="setFilterBy"/>
            <BookList 
            v-if="books"
            :books="filteredBooks" 
            @remove="removeBook"  />
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: {},
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                    eventBusService.emit('show-msg', { txt: 'Book removed', type: 'success' })
                })
                .catch(err => {
                    eventBusService.emit('show-msg', { txt: 'Book remove failed', type: 'error' })
                })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        filteredBooks() {
            if (!this.filterBy.price) {
                this.filterBy.title = ''
                this.filterBy.price = 200
            }
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.books.filter(book => regex.test(book.title) && book.listPrice.amount <= this.filterBy.price)
        },
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        BookFilter,
        BookList,
    }
}