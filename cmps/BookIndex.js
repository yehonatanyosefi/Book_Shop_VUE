import { bookService } from '../services/book.service.js'

import BookFilter from './BookFilter.js'
import BookList from './BookList.js'

import BookDetails from './BookDetails.js'
import BookEdit from './BookEdit.js'

export default {
    template: `
        <section class="book-index">
            <bookFilter @filter="setFilterBy"/>
            <bookList 
                v-if="books"
                :books="filteredBooks" 
                @remove="removeBook" 
                @show-details="showBookDetails" />
            <bookEdit @book-saved="onSaveBook"/>
            <bookDetails 
                v-if="selectedBook" 
                @hide-details="selectedBook = null"
                :book="selectedBook"/>
        </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: {},
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                })
        },
        showBookDetails(bookId) {
            this.selectedBook = this.books.find(book => book.id === bookId)
        },
        onSaveBook(newBook) {
            this.books.unshift(newBook)
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
        BookDetails,
        BookEdit,
    }
}