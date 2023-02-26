export default {
     props: ['book', 'length'],
     template: `
        <p>{{ getDescriptionText }}<span v-if="isShowingMore">...</span>
        <button @click="expandToggle" v-if="canShowMore">{{ getMoreTxt }}</button></p>
    `,
     data() {
          return {
               isMore: false,
               isExpanded: false,
          }
     },
     methods: {
          toggleIsMore() {
               this.isMore = !this.isMore
          },
          expandToggle() {
               this.isExpanded = !this.isExpanded
          },
     },
     computed: {
          getDescriptionText() {
               if (this.book.description.length > this.length && !this.isExpanded) return this.book.description.substring(0, this.length)
               return this.book.description
          },
          getMoreTxt() {
               if (!this.isExpanded) return 'more...'
               return 'less'
          },
          canShowMore() {
               return this.book.description.length > this.length
          },
          isShowingMore() {
               return this.book.description.length > this.length && !this.isExpanded
          },
     },
}