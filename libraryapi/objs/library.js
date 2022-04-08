module.exports = class Library {
    constructor() {
        this.books = [];
    }

    findByTitle(query) {
        let found = this.books.filter((book) => {
            return book.title.toLowerCase().includes(query.toLowerCase());
        });

        return found;
    }

    findByAuthor(query) {
        let found = this.books.filter((book) => {
            return book.author.toLowerCase().includes(query.toLowerCase());
        });

        return found;
    }

    findByYear(query) {
        let found = this.books.filter((book) => {
            return book.year === parseInt(query);
        });

        return found;
    }

    findByIsbn(query) {
        let found = this.books.filter((book) => {
            return book.isbn.includes(query);
        })

        return found;
    }

    add(newBook) {
        this.books.push({
            title: newBook.title,
            author: newBook.author,
            year: newBook.year,
            isbn: newBook.isbn
        });
    }

    removeBook(isbn) {
        let removeIndex = this.books.findIndex(book => {
            return book.isbn === isbn;
        });

        if (removeIndex !== -1) { // If a match is found
            this.books = this.books.filter((book, index) => {
                return index != removeIndex;
            });
        }
    }

    getBooks() {
        return this.books;
    }
}