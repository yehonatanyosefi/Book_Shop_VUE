export default {
    props: ['book'],
    template: `
        <ul>
            <li class="clean-list">Reviews:</li>
            <li v-for="review in book.reviews" :key="review.id" class="clean-list">
                Review:  {{review.name}}
                <span v-for="rate in parseInt(review.rate)">
                    <i class="fa-solid fa-star"></i>
                </span>
                {{review.date}} <button @click="$emit('removeReview', review.id)">X</button>
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