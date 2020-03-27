import React from 'react'
import { withRouter } from "react-router";

class Home extends React.Component {
    renderBooksInShelf(type) {
        const { books } = this.props;
        return books.filter((book) => book.shelf === type).map((book) => {
            return this.props.renderBook(book)
        })
    }

    renderShelf(displayName, type) {
        const booksInSelf = this.renderBooksInShelf(type);

        if (booksInSelf.length) {
            return (
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{displayName}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {booksInSelf}
                        </ol>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.renderShelf('Currently Reading', 'currentlyReading')}
                        {this.renderShelf('Want to Read', 'wantToRead')}
                        {this.renderShelf('Read', 'read')}
                    </div>
                </div>
                <div className="open-search">
                    <button onClick={() => this.props.history.push('/search')}>Add a book</button>
                </div>
            </div>
        )
    }
}

export default withRouter(Home)