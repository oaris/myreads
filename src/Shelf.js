import React  from 'react'
import Book from './Book'

function Shelf (props) {


  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">

          {props.books.map(book => (
              <Book
                key={book.id}
                book={book}
                changeOption={props.changeOption}
              />
            ))}


        </ol>
      </div>
      </div>







  )








}


export default Shelf
