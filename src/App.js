import React from 'react'
import './App.css'
import Home from "./pages/Home";
import Search from "./pages/Search";
import * as BooksAPI from "./BooksAPI";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    async componentDidMount() {
        await this.getListOfBooks()
    }

    async getListOfBooks() {
        const books = await BooksAPI.getAll();
        this.setState({
            books
        })
    }

    async addBook(book) {
        const newBook = await BooksAPI.get(book.id);
        return newBook
    }

    updateShelf = async (updatedBook, updatedList, pageName) => {
        let {books} = this.state;
        let isBookNotUpdated = true;
        books = books.map((book) => {
            if (book.id === updatedBook.id) {
                Object.keys(updatedList).forEach((shelfName) => {
                    if (updatedList[shelfName].includes(book.id)) {
                        book.shelf = shelfName;
                        isBookNotUpdated = false;
                    }
                });
            }
            return book;
        });

        if (isBookNotUpdated) {
            if (pageName === "HOME") {
                books = books.filter((item) => item.id !== updatedBook.id)
            } else {
                const newBook = await this.addBook(updatedBook)
                books.push(newBook);
            }
        }

        this.setState({
            books,
        });
    };

    async changeBookShelf(e, book, pageName) {
        const updatedList = await BooksAPI.update(book, e.target.value);
        this.updateShelf(book, updatedList, pageName);
    }

    getBookSelectedValue(currentBook) {
        const { books } = this.state;
        let bookShelf = 'none';
        books.forEach((book) => {
            if (currentBook.id === book.id) {
                bookShelf = book.shelf;
            }
        });
        return bookShelf;
    }

    renderBook = (book, pageName = "HOME") => {
        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : ""})`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(e) => this.changeBookShelf(e, book, pageName)} value={this.getBookSelectedValue(book)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading" disabled={book.shelf === "currentlyReading"}>Currently Reading</option>
                                <option value="wantToRead" disabled={book.shelf === "wantToRead"}>Want to Read</option>
                                <option value="read" disabled={book.shelf === "read"}>Read</option>
                                <option value="none" disabled={!book.shelf || book.shelf === ""}>None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors && book.authors.join(", ")}</div>
                </div>
            </li>
        )
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/search">
                        <Search renderBook={this.renderBook} />
                    </Route>
                    <Route path="/">
                        <Home books={this.state.books} renderBook={this.renderBook} />
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default BooksApp
