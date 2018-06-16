import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Search from './Search'
import Shelf from './Shelf'




class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    myBooks: [],
    wantToRead: [],
    read: [],
    currentlyReading: [],
    bookResult: [],

  }



// for both
  changeOption = (book, option) => {
        BooksAPI.update(book, option).then(res => {console.log(res)})
        console.log(book.id)
        console.log(option)




    }
    // for search querey
    checkShelf = (checkBook) =>{
       let shelf = this.state.myBooks.filter(book => book.id === checkBook.id)

		    return (shelf.length > 0) ? shelf[0].shelf : "none";
        // (book.hasOwnProperty(imageLinks)) ? `url(${book.imageLinks.smallThumbnail})` : "none";

    }


  render() {

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
        <Route  path='/search' render={() => (
          <Search
          changeOption={this.changeOption}
          checkShelf={this.checkShelf}
        />

                 )}/>









           <Route exact path='/' render={() => (

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf
                 title='Currently Reading'
                 books={this.state.currentlyReading}
                 changeOption={this.changeOption}
               />
               <Shelf
                 title='Want to Read'
                 books={this.state.wantToRead}
                 changeOption={this.changeOption}
               />
               <Shelf
                 title='Read'
                 books={this.state.read}
                 changeOption={this.changeOption}
               />
              </div>
            </div>
            <div className="open-search">
              <Link  to="/search">Add a book</Link>
            </div>
          </div>
        )}/>




      </div>
    )

}
}

export default BooksApp
