import React from 'react'

function Book(props){



    return(
      <li key={props.book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193,  backgroundImage: (props.book.imageLinks) ? `url(${props.book.imageLinks.smallThumbnail})` : null }}></div>
            <div className="book-shelf-changer">
              <select value={props.book.shelf} onChange={ (event) => props.changeOption(props.book, event.target.value)}>
                <option  value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{props.book.title}</div>
          <div className="book-authors">{props.book.authors}</div>
        </div>
      </li>



    )


}


export default Book
