import React  from 'react'
import Book from './Book'

class Shelf extends React.Component {

render(){

  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">

          {this.props.books.map(book => (
              <Book
                key={book.id}
                book={book}
                changeOption={this.props.changeOption}
              />
            ))}


        </ol>
      </div>
      </div>







  )




}



}


export default Shelf
