import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'


class Search extends React.Component {

  state = {
    searchQuery: '',
    bookResult: []

  }

  updateQuery = (query) => {
    let newQuery = query.trim()
      this.setState({ searchQuery: newQuery})
      if(newQuery){
        BooksAPI.search(newQuery).then((books) => {
          this.setState({ bookResult:books })
        })}else
          this.setState({ bookResult:[] })
        }


        checkShelf = (checkBook) =>{
           let shelf = this.state.myBooks.filter(book => book.id === checkBook.id)

    		    return (shelf.length > 0) ? shelf[0].shelf : "none";
            // (book.hasOwnProperty(imageLinks)) ? `url(${book.imageLinks.smallThumbnail})` : "none";

        }


render(){
  return(

    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search"  to="/">Close</Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input
             type="text"
             placeholder="Search by title or author"
             onChange= {(event) => this.updateQuery(event.target.value)}/>

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        { this.state.searchQuery ? (
            (! this.state.bookResult.error) ? (
              this.state.bookResult.map(book => (
                book["shelf"]= this.props.checkShelf(book),
                  <Book
                    book={book}
                    changeOption={this.props.changeOption}


                  />
                ))):
        (
          <h1>Not exist</h1>
        )
      ):
      <h1>Welcome use search bar to search for books</h1>


      }
        </ol>
      </div>
    </div>


  )
}




}

export default Search
