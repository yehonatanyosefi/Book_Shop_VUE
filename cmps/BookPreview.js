export default {
    props: ['book'],
    template: `
        <article class="book-preview">
            <h4>{{ book.title }}</h4>
            <img :src="book.thumbnail">
        </article>
    `,
}