const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const Library = require('../objs/library');

const app = express();
const bookStore = new Library();

const port = 8080;
const hostname = 'localhost';
loadBooks();

const parseParam = (param) => {
    return param.replace(/&/g, ' ');
}

app.use(cors());
app.use(morgan());
app.use(helmet());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Library API v1.0.3')
})

app.get('/search/title/:title', (req, res) => {
    let { title } = req.params;
    title = parseParam(title);
    res.send(bookStore.findByTitle(title));
});

app.get('/search/author/:author', (req, res) => {
    let { author } = req.params;
    author = parseParam(author);
    res.send(bookStore.findByAuthor(author));
});

app.get('/search/year/:year', (req, res) => {
    let { year } = req.params
    res.send(bookStore.findByYear(year));
});

app.get('/search/isbn/:isbn', (req, res) => {
    let { isbn } = req.params;
    res.send(bookStore.findByIsbn(isbn));
});

app.get('/all', (req, res) => {
    res.send(bookStore.getBooks());
});

app.listen(port, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});


function loadBooks() {

    bookStore.add({
        title: '1Q84',
        author: 'Haruki Murakami',
        year: 2022,
        isbn: '1234'
    });

    bookStore.add({
        title: 'Kafka',
        author: 'Haruki Murakami',
        year: 1995,
        isbn: '5234'
    });

    bookStore.add({
        title: 'Good Habits',
        author: 'Charles Duhig',
        year: 2014,
        isbn: '5567'
    });

    bookStore.add({
        title: 'Harry Potter and the Philosophers Stone',
        author: 'J.K. Rowling',
        year: 1997,
        isbn: '8472'
    });
}