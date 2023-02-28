import HomePage from './pages/HomePage.js'
import AboutPage from './pages/AboutPage.js' //, { AboutTeam, AboutServices }
import BookIndex from './pages/BookIndex.js'
import BookDetails from './pages/BookDetails.js'
import BookEdit from './pages/BookEdit.js'
import BookAdd from './pages/BookAdd.js'

const { createRouter, createWebHashHistory } = VueRouter
const options = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/about',
            component: AboutPage,
            // children: [
            //     {
            //         path: 'team',
            //         component: AboutTeam
            //     },
            //     {
            //         path: 'services',
            //         component: AboutServices
            //     },
            // ]
        },
        {
            path: '/book',
            component: BookIndex
        },
        {
            path: '/book/:bookId',
            component: BookDetails,
            name: 'details',
            props: true
        },
        {
            path: '/book/edit/:bookId',
            component: BookEdit
        },
        {
            path: '/book/add/',
            component: BookAdd
        },
        // Last fallback if no route was matched:
        {
            path: '/:catchAll(.*)',
            component: BookIndex
        }
    ]
}
export const router = createRouter(options)

