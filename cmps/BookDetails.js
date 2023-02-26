import LongTxt from './LongTxt.js'

export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <h2>{{ book.title }}</h2>
            <h3>{{ book.subtitle }}</h3>
            <h5 :class="priceClass">Price: {{ formattedPrice }}</h5>
            <h5>{{ getPageText }}</h5>
            <h5 v-if="publishedText">{{ publishedText }}</h5>
            <h5 v-if="book.listPrice.isOnSale">On Sale</h5>
            <LongTxt :txt="book.description" :length="length"/>
            <img :src="book.thumbnail" alt="">
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
            return 'Read :)'
        },
        publishedText() {
            const { publishedDate: date } = this.book
            const currYear = new Date().getFullYear()
            if (currYear > date + 10) return 'Vintage'
            if (currYear <= date + 1) return 'New'
            return ''
        },
        priceClass() {
            const price = this.book.listPrice.amount
            return {
                'red': price > 150,
                'green': price < 20
            }
        },
        formattedPrice() {
            const { currencyCode, amount } = this.book.listPrice
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currencyCode }).format(amount)
        },

    },
    components: {
        LongTxt,
    },
}