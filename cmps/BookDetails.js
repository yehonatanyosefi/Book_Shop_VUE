import LongTxt from './LongTxt.js'

export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <h2>{{ book.title }}</h2>
            <h3>{{ book.subtitle }}</h3>
            <h5>price: {{ book.listPrice.amount }} {{ book.listPrice.currencyCode}}</h5>
            <h5>{{ getPageText }}</h5>
            <h5>{{ getPublishedText }}</h5>
            <h5 v-if="checkOnSale">On Sale</h5>
            <LongTxt :book="book" :length="length"/>
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
        getPageText() {
            const pageCount = this.book.pageCount
            if (pageCount > 500) return 'Serious Reading'
            if (pageCount > 200) return 'Descent Reading'
            if (pageCount < 100) return 'Light Reading'
            return 'Read :)'
        },
        getPublishedText() {
            const date = this.book.publishedDate
            if (new Date().getFullYear() > date + 10) return 'Vintage'
            return 'New'
        },
        getPriceClass() {
            const price = this.book.listPrice.amount
            if (price > 150) return 'red'
            if (price < 20) return 'green'
            return ''
        },
        checkOnSale() {
            return this.book.listPrice.isOnSale
        }
    },
    components: {
        LongTxt,
    },
}