import React from 'react'
import { withRouter } from 'react-router'
import * as BooksAPI from "../BooksAPI";

class Search extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            searchResult: []
        }
    }

    async getSearchResults(e) {
        if (e.target.value) {
            let searchResult = await BooksAPI.search(e.target.value)
            if (searchResult.error) {
                searchResult = []
            }
            this.setState({
                searchResult
            })
        } else {
            this.setState({
                searchResult: []
            })
        }
    }



    renderSearchResults() {
        const { searchResult } = this.state;
        return searchResult.map((book) => this.props.renderBook(book, "SEARCH"))
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.props.history.push('/')}>Close</button>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" autoFocus={true} onChange={(e) => this.getSearchResults(e)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">{this.renderSearchResults()}</ol>
                </div>
            </div>
        )
    }
}

export default withRouter(Search)