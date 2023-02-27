import LongTxt from '../cmps/LongTxt.js'
import BookReview from '../cmps/BookReview.js'
import BookReviewPreview from '../cmps/BookReviewPreview.js'
import { i18 } from '../services/i18n.service.js'
import { bookService } from '../services/book.service.js'
import { eventBusService } from "../services/event-bus.service.js"

export default {
    template: `
        <section v-if="book" class="book-details">
            <h2>{{ book.title }}</h2>
            <h3>{{ book.subtitle }}</h3>
            <h4 :class="priceClass">Price: {{ formattedPrice }}</h4>
            <h4 v-if="pageText">{{ pageText }}</h4>
            <h4 v-if="publishedText">{{ publishedText }}</h4>
            <LongTxt :txt="book.description" :length="length"/>
            <div class="book-img">
                <img v-if="book.listPrice.isOnSale" src="../assets/img/sale.png" class="on-sale"/>
                <img :src="book.thumbnail">
            </div>
            <BookReview :book="book" @update-book="updateBook"/>
            <BookReviewPreview :book="book" @remove-review="removeReview" />
            <RouterLink to="/book/" class="center">Close</RouterLink>
        </section>
    `,
    created() {
        const { bookId } = this.$route.params
        bookService.get(bookId)
            .then(book => this.book = book)
    },
    data() {
        return {
            length: 100,
            book: null,
        }
    },
    methods: {
        updateBook(updatedBook) {
            this.book = updatedBook
        },
        removeReview(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
                .then(book => {
                    this.book = book
                    eventBusService.emit('show-msg', { txt: 'Review removed', type: 'success' })
                })
                .catch(err => {
                    eventBusService.emit('show-msg', { txt: 'Review remove failed', type: 'error' })
                })
        }
    },
    computed: {
        pageText() {
            const { pageCount } = this.book
            if (pageCount > 500) return 'Serious Reading'
            if (pageCount > 200) return 'Decent Reading'
            if (pageCount < 100) return 'Light Reading'
            return ''
        },
        publishedText() {
            const { publishedDate: date } = this.book
            const currYear = new Date().getFullYear()
            if (currYear > date + 10) return 'Vintage'
            if (currYear <= date + 1) return 'New'
            return ''
        },
        priceClass() {
            const { currencyCode, amount } = this.book.listPrice
            const price = i18.currMultiplier(currencyCode, amount)
            return {
                'red': price > 150,
                'green': price < 20
            }
        },
        formattedPrice() {
            const { currencyCode, amount } = this.book.listPrice
            return i18.formatCurrency(currencyCode, amount)
        },
    },
    components: {
        LongTxt,
        BookReviewPreview,
        BookReview,
    },
}