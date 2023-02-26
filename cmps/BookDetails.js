import LongTxt from './LongTxt.js'
import { i18 } from '../services/i18n.service.js'

export default {
    props: ['book'],
    template: `
        <section class="book-details">
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
            <button @click="closeDetails">Close</button>
        </section>
    `,
    data() {
        return {
            length: 100,
        }
    },
    methods: {
        closeDetails() {
            this.$emit('hide-details')
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
    },
}