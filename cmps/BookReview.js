import { bookService } from '../services/book.service.js'
import { eventBusService } from "../services/event-bus.service.js"
import { utilService } from '../services/util.service.js'
//TODO: refactor stars

export default {
    props: ['book'],
    template: `
        <section v-if="book" class="book-details">
            <div>Add a review: </div>
            <form @submit.prevent="addReview">
                <label for="review-name">Name: </label>
                <input type="text" id="review-name" v-model="reviewName" placeHolder="Name" />
                <div class="star-reviews">
                    Stars: 
                    <input type="radio" id="rating-1" name="rating" value="1" hidden v-model="checkedStars" />
                    <label for="rating-1">
                        <i class="star star1 fa-star" :class="content1" @mouseover="isHover1 = true" @mouseleave="isHover1 = false"></i>
                    </label>
                    <input type="radio" id="rating-2" name="rating" value="2" hidden v-model="checkedStars" v-if="checkedStars" />
                    <label for="rating-2">
                        <i class="star star2 fa-star" :class="content2" @mouseover="isHover2 = true" @mouseleave="isHover2 = false"></i>
                    </label>
                    <input type="radio" id="rating-3" name="rating" value="3" checked="checked" hidden v-model="checkedStars" v-if="checkedStars" />
                    <label for="rating-3">
                        <i class="star star3 fa-star" :class="content3" @mouseover="isHover3 = true" @mouseleave="isHover3 = false"></i>
                    </label>
                    <input type="radio" id="rating-4" name="rating" value="4" hidden v-model="checkedStars" v-if="checkedStars" />
                    <label for="rating-4">
                        <i class="star star4 fa-star" :class="content4" @mouseover="isHover4 = true" @mouseleave="isHover4 = false"></i>
                    </label>
                    <input type="radio" id="rating-5" name="rating" value="5" hidden v-model="checkedStars" v-if="checkedStars" />
                    <label for="rating-5">
                        <i class="star star5 fa-star" :class="content5" @mouseover="isHover5 = true" @mouseleave="isHover5 = false"></i>
                    </label>
                </div>
                <div>Date Read: <input type="date" v-model="date"/></div>
                <button type="submit">Submit</button>
            </form>
        </section>
    `,
    created() {
        this.resetDate()
    },
    data() {
        return {
            reviewName: '',
            date: '',
            checkedStars: 3,
            isHover1: false,
            isHover2: false,
            isHover3: false,
            isHover4: false,
            isHover5: false,
            currHoverNum: 3,
        }
    },
    methods: {
        addReview() {
            const review = { name: this.reviewName || 'Anonymous', rate: this.checkedStars, date: this.date, id: utilService.makeId() }
            bookService.addReview(this.book.id, review)
                .then(updatedBook => {
                    eventBusService.emit('show-msg', { txt: 'Review Added!', type: 'success' })
                    this.resetVars()
                    this.$emit('updateBook', updatedBook)
                })
                .catch(err => {
                    eventBusService.emit('show-msg', { txt: 'Review failed', type: 'error' })
                })
        },
        resetVars() {
            this.reviewName = ''
            this.checkedStars = 3
            this.resetDate()
        },
        resetDate() {
            const currentDate = new Date()
            const year = currentDate.getFullYear()
            const month = String(currentDate.getMonth() + 1).padStart(2, '0')
            const day = String(currentDate.getDate()).padStart(2, '0')
            const formattedDate = `${year}-${month}-${day}`
            this.date = formattedDate
        },
        // currHover(num) {
        //     this.currHoverNum = num
        // },
    },
    computed: {
        content1() {
            return {
                'fa-solid': this.checkedStars >= 1 || this.isHover1,
                'fa-regular': true,
            }
        },
        content2() {
            return {
                'fa-solid': this.checkedStars >= 2 || this.isHover2,
                'fa-regular': true,
            }
        },
        content3() {
            return {
                'fa-solid': this.checkedStars >= 3 || this.isHover3,
                'fa-regular': true,
            }
        },
        content4() {
            return {
                'fa-solid': this.checkedStars >= 4 || this.isHover4,
                'fa-regular': true,
            }
        },
        content5() {
            return {
                'fa-solid': this.checkedStars >= 5 || this.isHover5,
                'fa-regular': true,
            }
        },
    },
    components: {
    },
}