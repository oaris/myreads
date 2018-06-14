import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'




class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    myBooks: [],
    wantToRead: [],
    read: [],
    currentlyReading: [],
    bookResult: [],
    searchQuery: ''

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



  changeOption = (book, option) => {
        BooksAPI.update(book, option).then(res => {console.log(res)})
        console.log(book.id)
        console.log(option)




    }

    checkShelf = (checkBook) =>{
       let shelf = this.state.myBooks.filter(book => book.id === checkBook.id)

		    return (shelf.length > 0) ? shelf[0].shelf : "none";
        // (book.hasOwnProperty(imageLinks)) ? `url(${book.imageLinks.smallThumbnail})` : "none";

    }


  render() {
    const { searchQuery, bookResult, read, wantToRead, currentlyReading } = this.state

    BooksAPI.getAll().then((books) => {
    //  this.setState({ myBooks:books })
      this.setState ({
      read : books.filter((book) => book.shelf === "read"),
      wantToRead: books.filter((book) => book.shelf === "wantToRead"),
      currentlyReading: books.filter((book) => book.shelf === "currentlyReading"),
      myBooks : books
    })


    })

    // if(searchQuery){
    //   BooksAPI.search(searchQuery).then((books) => {
    //     this.setState({ bookResult:books })
    //   })else{
    //     this.setState({ bookResult:[] })
    //
    //   }
    //
    //
    //
    // }

    return (

      <div className="app">
        {this.state.showSearchPage ? (
        <Route  path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" onClick={() => this.setState({ showSearchPage: false }) } to="/">Close</Link>
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
              { searchQuery ? (
                  (! bookResult.error) ? (
                bookResult.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book.imageLinks) ? `url(${book.imageLinks.smallThumbnail})` : null }}></div>
                        <div className="book-shelf-changer">
                          <select value={this.checkShelf(book)} onChange={ (event) => this.changeOption(book, event.target.value)}>
                            <option  value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                )

              )):
              (
                <h1>Not exist</h1>
              )
            ):
            <h1>Welcome use search bar to search for books</h1>


            }
              </ol>
            </div>
          </div>        )}/>
        ):(









           <Route exact path='/' render={() => (

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                      { currentlyReading.map((book) => (
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                              <div className="book-shelf-changer">
                                <select value={book.shelf} onChange={ (event) => this.changeOption(book, event.target.value)}>
                                  <option  value="move" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                        ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                    { wantToRead.map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={ (event) => this.changeOption(book, event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                      ))}

                    </ol>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                      { read.map((book) => (
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                              <div className="book-shelf-changer">
                                <select value={book.shelf} onChange={ (event) => this.changeOption(book, event.target.value)}>
                                  <option  value="move" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                        ))}

                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link onClick={() => this.setState({ showSearchPage: true })} to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      )
    }


      </div>
    )

}
}

export default BooksApp
