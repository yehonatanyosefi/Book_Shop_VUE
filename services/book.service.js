'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import booksJSON from '../books.json' assert {type: 'json'}


const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(id = '', priceAmount = 150) {
    return {
        id: id,
        title: null,
        listPrice: {
            amount: priceAmount,
            currencyCode: 'NIS',
            isOnSale: false,
        },
    }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = booksJSON
        utilService.saveToStorage(BOOK_KEY, books)
    }
}