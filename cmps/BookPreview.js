import { i18 } from '../services/i18n.service.js'

export default {
    props: ['book'],
    template: `
        <article class="book-preview">
            <h4>{{ book.title }}</h4>
            <h5 class="price">{{ formattedPrice }}</h5>
            <div class="book-img">
                <img v-if="book.listPrice.isOnSale" src="../assets/img/sale.png" class="on-sale"/>
                <img :src="book.thumbnail">
            </div>
        </article>
    `,
    computed: {
        formattedPrice() {
            const { currencyCode, amount } = this.book.listPrice
            return i18.formatCurrency(currencyCode, amount)
        },
    }
}