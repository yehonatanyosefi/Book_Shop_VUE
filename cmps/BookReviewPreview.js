export default {
    props: ['book'],
    template: `
        <ul>
            <li class="clean-list">Reviews:</li>
            <li v-for="review, idx in book.reviews" :key="idx" class="clean-list">
                Name: {{review.name}}
                <span v-for="rate in parseInt(review.rate)">
                    <i class="fa-solid fa-star"></i>
                </span>
                {{review.date}}
            </li>
        </ul>
    `,
    data() {
        return {

        }
    },
    computed: {

    },
}